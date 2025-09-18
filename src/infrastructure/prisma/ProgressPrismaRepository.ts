import prisma from '@/lib/prisma';
import { ProgressRecord, ProgressStatus } from '@/modules/progress/domain/Progress';
import {
  AssessmentDetail,
  CourseChapter,
  ProgressRepository,
  ProgressUpdate,
} from '@/modules/progress/ports/ProgressRepository';

export class ProgressPrismaRepository implements ProgressRepository {
  async listChaptersByCourse(courseId: number) {
    return prisma.chapter.findMany({
      where: { courseId },
      select: { id: true, weekNumber: true },
      orderBy: { weekNumber: 'asc' },
    });
  }

  async createManyProgress(records: Array<{ userId: number; chapterId: number; status: ProgressStatus }>) {
    if (records.length === 0) return;

    await prisma.chapterProgress.createMany({ data: records, skipDuplicates: true });
  }

  async findChapterWithCourse(chapterId: number): Promise<CourseChapter | null> {
    const chapter = await prisma.chapter.findUnique({
      where: { id: chapterId },
      include: {
        course: {
          include: {
            chapters: {
              select: {
                id: true,
                weekNumber: true,
                minScoreTheory: true,
                minScorePractice: true,
              },
              orderBy: { weekNumber: 'asc' },
            },
          },
        },
      },
    });

    if (!chapter) return null;

    return {
      id: chapter.id,
      weekNumber: chapter.weekNumber,
      minScoreTheory: chapter.minScoreTheory,
      minScorePractice: chapter.minScorePractice,
      unlockDate: chapter.unlockDate,
      courseId: chapter.courseId,
      course: {
        id: chapter.course.id,
        chapters: chapter.course.chapters,
      },
    };
  }

  async findProgress(userId: number, chapterId: number): Promise<ProgressRecord | null> {
    const progress = await prisma.chapterProgress.findUnique({
      where: { userId_chapterId: { userId, chapterId } },
    });

    if (!progress) return null;

    return new ProgressRecord({
      userId: progress.userId,
      chapterId: progress.chapterId,
      status: progress.status as ProgressStatus,
      theoryScore: progress.theoryScore ?? undefined,
      practiceScore: progress.practiceScore ?? undefined,
      startedAt: progress.startedAt ?? undefined,
      completedAt: progress.completedAt ?? undefined,
    });
  }

  async upsertProgress(
    userId: number,
    chapterId: number,
    update: ProgressUpdate,
  ): Promise<ProgressRecord> {
    const progress = await prisma.chapterProgress.upsert({
      where: { userId_chapterId: { userId, chapterId } },
      update: update as any,
      create: {
        userId,
        chapterId,
        ...update,
      },
    });

    return new ProgressRecord({
      userId: progress.userId,
      chapterId: progress.chapterId,
      status: progress.status as ProgressStatus,
      theoryScore: progress.theoryScore ?? undefined,
      practiceScore: progress.practiceScore ?? undefined,
      startedAt: progress.startedAt ?? undefined,
      completedAt: progress.completedAt ?? undefined,
    });
  }

  listProgressByUserAndCourse(userId: number, courseId: number) {
    return prisma.chapterProgress.findMany({
      where: {
        userId,
        chapter: { courseId },
      },
      include: {
        chapter: {
          include: {
            resources: { orderBy: { orderIndex: 'asc' } },
            assessments: true,
          },
        },
      },
      orderBy: {
        chapter: { weekNumber: 'asc' },
      },
    });
  }

  countChapters(courseId: number): Promise<number> {
    return prisma.chapter.count({ where: { courseId } });
  }

  listActiveEnrollments(courseId: number) {
    return prisma.enrollment.findMany({
      where: { courseId, isActive: true },
      select: { userId: true },
    });
  }

  countCompletedChapters(userId: number, courseId: number) {
    return prisma.chapterProgress.count({
      where: {
        userId,
        status: ProgressStatus.COMPLETED,
        chapter: { courseId },
      },
    });
  }

  listRecentActivity() {
    return prisma.chapterProgress.findMany({
      where: {
        lastAccessed: {
          gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        },
      },
      include: {
        user: { select: { name: true, email: true } },
        chapter: { select: { title: true, course: { select: { name: true } } } },
      },
      orderBy: { lastAccessed: 'desc' },
      take: 10,
    });
  }

  countStudents() {
    return prisma.user.count({ where: { role: 'STUDENT' } });
  }

  countActiveCourses() {
    return prisma.course.count({ where: { isActive: true } });
  }

  countActiveEnrollments() {
    return prisma.enrollment.count({ where: { isActive: true } });
  }

  countCompletedEnrollments() {
    return prisma.enrollment.count({ where: { isActive: true, completedAt: { not: null } } });
  }

  async findAssessmentById(assessmentId: number): Promise<AssessmentDetail | null> {
    const assessment = await prisma.assessment.findUnique({
      where: { id: assessmentId },
      include: {
        chapter: {
          select: {
            id: true,
            minScoreTheory: true,
            minScorePractice: true,
          },
        },
      },
    });

    if (!assessment) return null;

    return {
      id: assessment.id,
      chapterId: assessment.chapterId,
      type: assessment.type,
      title: assessment.title,
      chapter: assessment.chapter,
    };
  }
}
