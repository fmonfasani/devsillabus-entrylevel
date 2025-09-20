import assert from "node:assert/strict";
import { describe, it, beforeEach } from "node:test";
import { ProgressStatus } from "@prisma/client";
import { ProgressAnalyticsService } from "@/modules/progress/application/ProgressAnalyticsService";
import type {
  ChapterProgressWithChapter,
  RecentActivitySnapshot,
} from "@/modules/progress/ports";
import {
  ChapterContext,
  ChapterProgressRepository,
  CourseProgressReadModel,
  EnrollmentSnapshot,
} from "@/modules/progress/ports";
import { ChapterProgressSnapshot, ChapterSnapshot } from "@/modules/progress/domain/ProgressAggregate";

class InMemoryChapterProgressRepository implements ChapterProgressRepository {
  private store = new Map<string, ChapterProgressSnapshot>();

  constructor(private readonly chapterCourseMap: Map<number, number>) {}

  async createMany(progress: ChapterProgressSnapshot[]): Promise<void> {
    for (const item of progress) {
      this.store.set(this.key(item.userId, item.chapterId), { ...item });
    }
  }

  async upsert(progress: ChapterProgressSnapshot): Promise<ChapterProgressSnapshot> {
    const key = this.key(progress.userId, progress.chapterId);
    const record: ChapterProgressSnapshot = { ...progress };
    this.store.set(key, record);
    return { ...record };
  }

  async findByUserAndChapter(
    userId: number,
    chapterId: number
  ): Promise<ChapterProgressSnapshot | null> {
    const record = this.store.get(this.key(userId, chapterId));
    return record ? { ...record } : null;
  }

  async countCompletedChapters(userId: number, courseId: number): Promise<number> {
    let count = 0;
    for (const record of this.store.values()) {
      const courseForChapter = this.chapterCourseMap.get(record.chapterId);
      if (
        record.userId === userId &&
        courseForChapter === courseId &&
        record.status === ProgressStatus.COMPLETED
      ) {
        count += 1;
      }
    }
    return count;
  }

  private key(userId: number, chapterId: number) {
    return `${userId}-${chapterId}`;
  }
}

class InMemoryCourseProgressReadModel implements CourseProgressReadModel {
  constructor(
    private readonly chaptersByCourse: Map<number, ChapterSnapshot[]>,
    private readonly enrollmentsByCourse: Map<number, EnrollmentSnapshot[]> = new Map(),
    private readonly progressView: ChapterProgressWithChapter[] = [],
    private readonly activity: RecentActivitySnapshot[] = [],
    private readonly counters: {
      students?: number;
      courses?: number;
      activeEnrollments?: number;
      completedEnrollments?: number;
    } = {}
  ) {}

  async getCourseChapters(courseId: number): Promise<ChapterSnapshot[]> {
    return Promise.resolve(this.cloneChapters(this.chaptersByCourse.get(courseId) ?? []));
  }

  async getChapterContext(chapterId: number): Promise<ChapterContext | null> {
    for (const chapters of this.chaptersByCourse.values()) {
      const index = chapters.findIndex((chapter) => chapter.id === chapterId);
      if (index === -1) continue;
      return {
        chapter: { ...chapters[index] },
        previousChapter: index > 0 ? { ...chapters[index - 1] } : null,
        nextChapter: index < chapters.length - 1 ? { ...chapters[index + 1] } : null,
      };
    }
    return null;
  }

  getUserCourseProgress(userId: number, _courseId: number) {
    return Promise.resolve(this.progressView.filter((item) => item.userId === userId));
  }

  getActiveEnrollments(courseId: number): Promise<EnrollmentSnapshot[]> {
    return Promise.resolve(this.enrollmentsByCourse.get(courseId) ?? []);
  }

  countChapters(courseId: number): Promise<number> {
    return Promise.resolve((this.chaptersByCourse.get(courseId) ?? []).length);
  }

  getRecentActivity(_since: Date, limit: number): Promise<RecentActivitySnapshot[]> {
    return Promise.resolve(this.activity.slice(0, limit));
  }

  countStudents(): Promise<number> {
    return Promise.resolve(this.counters.students ?? 0);
  }

  countActiveCourses(): Promise<number> {
    return Promise.resolve(this.counters.courses ?? 0);
  }

  countActiveEnrollments(): Promise<number> {
    return Promise.resolve(this.counters.activeEnrollments ?? 0);
  }

  countCompletedEnrollments(): Promise<number> {
    return Promise.resolve(this.counters.completedEnrollments ?? 0);
  }

  private cloneChapters(chapters: ChapterSnapshot[]) {
    return chapters.map((chapter) => ({ ...chapter }));
  }
}

describe("ProgressAnalyticsService", () => {
  const courseId = 1;
  const chapters: ChapterSnapshot[] = [
    { id: 1, courseId, weekNumber: 1, minScoreTheory: 60, minScorePractice: 60, unlockDate: null },
    { id: 2, courseId, weekNumber: 2, minScoreTheory: 60, minScorePractice: 60, unlockDate: null },
  ];

  let repository: InMemoryChapterProgressRepository;
  let readModel: InMemoryCourseProgressReadModel;
  let service: ProgressAnalyticsService;

  beforeEach(() => {
    repository = new InMemoryChapterProgressRepository(
      new Map(chapters.map((chapter) => [chapter.id, chapter.courseId]))
    );

    readModel = new InMemoryCourseProgressReadModel(
      new Map([[courseId, chapters]]),
      new Map([[courseId, [{ userId: 1 }, { userId: 2 }]]]),
      [],
      [
        {
          user: { name: "User", email: "user@example.com" },
          chapter: { title: "Chapter", course: { name: "Course" } },
          lastAccessed: new Date(),
          status: ProgressStatus.AVAILABLE,
        },
      ],
      { students: 5, courses: 2, activeEnrollments: 2, completedEnrollments: 1 }
    );

    service = new ProgressAnalyticsService(repository, readModel);
  });

  it("calculates course progress statistics", async () => {
    await repository.createMany([
      { userId: 1, chapterId: 1, status: ProgressStatus.COMPLETED },
      { userId: 1, chapterId: 2, status: ProgressStatus.COMPLETED },
      { userId: 2, chapterId: 1, status: ProgressStatus.COMPLETED },
      { userId: 2, chapterId: 2, status: ProgressStatus.IN_PROGRESS },
    ]);

    const stats = await service.getCourseProgressStats(courseId);

    assert.deepEqual(stats, {
      totalStudents: 2,
      averageProgress: 75,
      completionRate: 50,
    });
  });

  it("returns dashboard statistics", async () => {
    const dashboard = await service.getDashboardStats();

    assert.equal(dashboard.totalUsers, 5);
    assert.equal(dashboard.totalCourses, 2);
    assert.equal(dashboard.totalEnrollments, 2);
    assert.equal(dashboard.completedEnrollments, 1);
    assert.equal(dashboard.completionRate, 50);
    assert.equal(dashboard.recentActivity.length, 1);
  });

  it("checks chapter access", async () => {
    await repository.createMany([
      { userId: 1, chapterId: 1, status: ProgressStatus.AVAILABLE },
    ]);

    assert.equal(await service.canAccessChapter(1, 1), true);
    assert.equal(await service.canAccessChapter(1, 2), false);
  });
});
