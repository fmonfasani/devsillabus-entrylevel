import { PrismaClient, ProgressStatus } from "@prisma/client";
import {
  ChapterContext,
  ChapterProgressWithChapter,
  CourseProgressReadModel,
  EnrollmentSnapshot,
  RecentActivitySnapshot,
} from "@/modules/progress/ports";
import { ChapterSnapshot } from "@/modules/progress/domain/ProgressAggregate";

export class PrismaCourseProgressReadModel implements CourseProgressReadModel {
  constructor(private readonly prisma: PrismaClient) {}

  async getCourseChapters(courseId: number): Promise<ChapterSnapshot[]> {
    const chapters = await this.prisma.chapter.findMany({
      where: { courseId },
      orderBy: { weekNumber: "asc" },
      select: {
        id: true,
        courseId: true,
        weekNumber: true,
        minScoreTheory: true,
        minScorePractice: true,
        unlockDate: true,
      },
    });

    return chapters;
  }

  async getChapterContext(chapterId: number): Promise<ChapterContext | null> {
    const record = await this.prisma.chapter.findUnique({
      where: { id: chapterId },
      include: {
        course: {
          include: {
            chapters: {
              orderBy: { weekNumber: "asc" },
              select: {
                id: true,
                courseId: true,
                weekNumber: true,
                minScoreTheory: true,
                minScorePractice: true,
                unlockDate: true,
              },
            },
          },
        },
      },
    });

    if (!record) {
      return null;
    }

    const sorted = record.course.chapters;
    const index = sorted.findIndex((chapter) => chapter.id === chapterId);

    if (index === -1) {
      return null;
    }

    const context: ChapterContext = {
      chapter: sorted[index],
      previousChapter: index > 0 ? sorted[index - 1] : null,
      nextChapter: index < sorted.length - 1 ? sorted[index + 1] : null,
    };

    return context;
  }

  async getUserCourseProgress(
    userId: number,
    courseId: number
  ): Promise<ChapterProgressWithChapter[]> {
    const progress = await this.prisma.chapterProgress.findMany({
      where: {
        userId,
        chapter: { courseId },
      },
      include: {
        chapter: {
          include: {
            resources: {
              orderBy: { orderIndex: "asc" },
              select: {
                id: true,
                title: true,
                type: true,
                url: true,
                content: true,
                orderIndex: true,
              },
            },
            assessments: {
              select: {
                id: true,
                title: true,
                type: true,
                passingScore: true,
              },
            },
          },
        },
      },
      orderBy: {
        chapter: { weekNumber: "asc" },
      },
    });

    return progress.map((item) => ({
      id: item.id,
      userId: item.userId,
      chapterId: item.chapterId,
      status: item.status,
      theoryScore: item.theoryScore,
      practiceScore: item.practiceScore,
      startedAt: item.startedAt,
      completedAt: item.completedAt,
      lastAccessed: item.lastAccessed,
      chapter: {
        id: item.chapter.id,
        title: item.chapter.title,
        weekNumber: item.chapter.weekNumber,
        description: item.chapter.description,
        minScoreTheory: item.chapter.minScoreTheory,
        minScorePractice: item.chapter.minScorePractice,
        resources: item.chapter.resources.map((resource) => ({
          id: resource.id,
          title: resource.title,
          type: resource.type,
          url: resource.url,
          content: resource.content,
          orderIndex: resource.orderIndex,
        })),
        assessments: item.chapter.assessments.map((assessment) => ({
          id: assessment.id,
          title: assessment.title,
          type: assessment.type,
          passingScore: assessment.passingScore,
        })),
      },
    }));
  }

  async getActiveEnrollments(courseId: number): Promise<EnrollmentSnapshot[]> {
    const enrollments = await this.prisma.enrollment.findMany({
      where: { courseId },
      select: { userId: true },
    });

    return enrollments;
  }

  countChapters(courseId: number): Promise<number> {
    return this.prisma.chapter.count({ where: { courseId } });
  }

  async getRecentActivity(
    since: Date,
    limit: number
  ): Promise<RecentActivitySnapshot[]> {
    const activity = await this.prisma.chapterProgress.findMany({
      where: {
        lastAccessed: { gte: since },
      },
      include: {
        user: {
          select: { name: true, email: true },
        },
        chapter: {
          select: {
            title: true,
            course: { select: { name: true } },
          },
        },
      },
      orderBy: { lastAccessed: "desc" },
      take: limit,
    });

    return activity.map((item) => ({
      user: item.user,
      chapter: item.chapter,
      lastAccessed: item.lastAccessed,
      status: item.status,
    }));
  }

  countStudents(): Promise<number> {
    return this.prisma.user.count({ where: { role: "STUDENT" } });
  }

  countActiveCourses(): Promise<number> {
    return this.prisma.course.count({ where: { isActive: true } });
  }

  countActiveEnrollments(): Promise<number> {
    return this.prisma.enrollment.count();
  }

  async countCompletedEnrollments(): Promise<number> {
    const enrollments = await this.prisma.enrollment.findMany({
      select: { userId: true, courseId: true },
    });

    let completed = 0;

    for (const enrollment of enrollments) {
      const totalChapters = await this.prisma.chapter.count({
        where: { courseId: enrollment.courseId },
      });

      if (totalChapters === 0) {
        continue;
      }

      const completedChapters = await this.prisma.chapterProgress.count({
        where: {
          userId: enrollment.userId,
          status: ProgressStatus.COMPLETED,
          chapter: { courseId: enrollment.courseId },
        },
      });

      if (completedChapters === totalChapters) {
        completed += 1;
      }
    }

    return completed;
  }
}
