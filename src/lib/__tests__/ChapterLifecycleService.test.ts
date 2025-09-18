import assert from "node:assert/strict";
import { describe, it, beforeEach } from "node:test";
import { ProgressStatus } from "@prisma/client";
import { ChapterLifecycleService } from "@/modules/progress/application/ChapterLifecycleService";
import type { ChapterProgressWithChapter, RecentActivitySnapshot } from "@/modules/progress/ports";
import {
  AssessmentRepository,
  AssessmentSnapshot,
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
    const existing = this.store.get(key);

    const record: ChapterProgressSnapshot = {
      userId: progress.userId,
      chapterId: progress.chapterId,
      status: progress.status,
      theoryScore: progress.theoryScore ?? existing?.theoryScore ?? null,
      practiceScore: progress.practiceScore ?? existing?.practiceScore ?? null,
      startedAt: progress.startedAt ?? existing?.startedAt ?? null,
      completedAt: progress.completedAt ?? existing?.completedAt ?? null,
      lastAccessed: progress.lastAccessed ?? existing?.lastAccessed ?? null,
    };

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
    private readonly enrollmentsByCourse: Map<number, EnrollmentSnapshot[]> = new Map()
  ) {}

  async getCourseChapters(courseId: number): Promise<ChapterSnapshot[]> {
    return this.cloneChapters(this.chaptersByCourse.get(courseId) ?? []);
  }

  async getChapterContext(chapterId: number): Promise<ChapterContext | null> {
    for (const chapters of this.chaptersByCourse.values()) {
      const index = chapters.findIndex((chapter) => chapter.id === chapterId);
      if (index === -1) {
        continue;
      }

      const chapter = chapters[index];
      const previousChapter = index > 0 ? chapters[index - 1] : null;
      const nextChapter = index < chapters.length - 1 ? chapters[index + 1] : null;

      return {
        chapter: { ...chapter },
        previousChapter: previousChapter ? { ...previousChapter } : null,
        nextChapter: nextChapter ? { ...nextChapter } : null,
      };
    }

    return null;
  }

  getUserCourseProgress(): Promise<ChapterProgressWithChapter[]> {
    return Promise.resolve([]);
  }

  getActiveEnrollments(courseId: number): Promise<EnrollmentSnapshot[]> {
    return Promise.resolve(this.enrollmentsByCourse.get(courseId) ?? []);
  }

  countChapters(courseId: number): Promise<number> {
    return Promise.resolve((this.chaptersByCourse.get(courseId) ?? []).length);
  }

  getRecentActivity(): Promise<RecentActivitySnapshot[]> {
    return Promise.resolve([]);
  }

  countStudents(): Promise<number> {
    return Promise.resolve(0);
  }

  countActiveCourses(): Promise<number> {
    return Promise.resolve(0);
  }

  countActiveEnrollments(): Promise<number> {
    return Promise.resolve(0);
  }

  countCompletedEnrollments(): Promise<number> {
    return Promise.resolve(0);
  }

  private cloneChapters(chapters: ChapterSnapshot[]) {
    return chapters.map((chapter) => ({ ...chapter }));
  }
}

class InMemoryAssessmentRepository implements AssessmentRepository {
  constructor(private readonly assessments = new Map<number, AssessmentSnapshot>()) {}

  async findByIdWithChapter(assessmentId: number) {
    return this.assessments.get(assessmentId) ?? null;
  }
}

describe("ChapterLifecycleService", () => {
  const courseId = 1;
  const userId = 99;
  const chapters: ChapterSnapshot[] = [
    {
      id: 1,
      courseId,
      weekNumber: 1,
      minScoreTheory: 60,
      minScorePractice: 60,
      unlockDate: null,
    },
    {
      id: 2,
      courseId,
      weekNumber: 2,
      minScoreTheory: 60,
      minScorePractice: 60,
      unlockDate: null,
    },
  ];

  let repository: InMemoryChapterProgressRepository;
  let readModel: InMemoryCourseProgressReadModel;
  let assessmentRepository: InMemoryAssessmentRepository;
  let service: ChapterLifecycleService;

  beforeEach(() => {
    repository = new InMemoryChapterProgressRepository(
      new Map(chapters.map((chapter) => [chapter.id, chapter.courseId]))
    );
    readModel = new InMemoryCourseProgressReadModel(
      new Map([[courseId, chapters]])
    );
    assessmentRepository = new InMemoryAssessmentRepository(
      new Map([
        [
          1,
          {
            id: 1,
            chapterId: chapters[0].id,
            type: "QUIZ",
            title: "Quiz 1",
            passingScore: 60,
            chapter: {
              id: chapters[0].id,
              courseId: chapters[0].courseId,
              weekNumber: chapters[0].weekNumber,
              minScoreTheory: chapters[0].minScoreTheory,
              minScorePractice: chapters[0].minScorePractice,
            },
          },
        ],
      ])
    );
    service = new ChapterLifecycleService(repository, assessmentRepository, readModel);
  });

  it("enrolls a user making the first chapter available", async () => {
    await service.enrollUserInCourse(userId, courseId);

    const firstChapter = await repository.findByUserAndChapter(userId, chapters[0].id);
    const secondChapter = await repository.findByUserAndChapter(userId, chapters[1].id);

    assert.equal(firstChapter?.status, ProgressStatus.AVAILABLE);
    assert.equal(secondChapter?.status, ProgressStatus.LOCKED);
  });

  it("updates chapter status and unlocks the next chapter when completed", async () => {
    await service.enrollUserInCourse(userId, courseId);

    await service.updateChapterStatus(
      userId,
      chapters[0].id,
      ProgressStatus.COMPLETED
    );

    const nextChapter = await repository.findByUserAndChapter(userId, chapters[1].id);
    assert.equal(nextChapter?.status, ProgressStatus.AVAILABLE);
  });

  it("processes assessment scores and marks the chapter as completed", async () => {
    await service.enrollUserInCourse(userId, courseId);

    await service.updateChapterStatus(
      userId,
      chapters[0].id,
      ProgressStatus.IN_PROGRESS
    );

    const result = await service.processAssessmentResult(userId, 1, 70, true);

    assert.equal(result.status, ProgressStatus.COMPLETED);

    const nextChapter = await repository.findByUserAndChapter(userId, chapters[1].id);
    assert.equal(nextChapter?.status, ProgressStatus.AVAILABLE);
  });
});
