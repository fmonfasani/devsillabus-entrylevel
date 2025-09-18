import prisma from '@/lib/prisma';
import {
  AssessmentInput,
  ChapterRepository,
  ChapterResourceInput,
  ChapterSummary,
  ChapterWithResources,
} from '@/modules/chapter/ports/ChapterRepository';

export class ChapterPrismaRepository implements ChapterRepository {
  async findByCourseId(courseId: number): Promise<ChapterSummary[]> {
    const chapters = await prisma.chapter.findMany({
      where: { courseId },
      orderBy: { weekNumber: 'asc' },
    });

    return chapters.map((chapter) => ({
      id: chapter.id,
      courseId: chapter.courseId,
      title: chapter.title,
      weekNumber: chapter.weekNumber,
      isPublished: chapter.isPublished,
      minScoreTheory: chapter.minScoreTheory,
      minScorePractice: chapter.minScorePractice,
      unlockDate: chapter.unlockDate,
    }));
  }

  async createRange(courseId: number, from: number, to: number): Promise<ChapterSummary[]> {
    const data = [] as Array<{ courseId: number; weekNumber: number; title: string; minScoreTheory: number; minScorePractice: number }>;

    for (let i = from; i <= to; i++) {
      data.push({
        courseId,
        weekNumber: i,
        title: `Week ${i}`,
        minScoreTheory: 0,
        minScorePractice: 0,
      });
    }

    if (data.length > 0) {
      await prisma.chapter.createMany({ data, skipDuplicates: true });
    }

    return this.findByCourseId(courseId);
  }

  async addResource(chapterId: number, input: ChapterResourceInput) {
    const last = await prisma.chapterResource.findFirst({
      where: { chapterId },
      orderBy: { orderIndex: 'desc' },
    });

    const orderIndex = last ? last.orderIndex + 1 : 1;

    return prisma.chapterResource.create({
      data: {
        ...input,
        chapterId,
        orderIndex,
        isRequired: input.isRequired ?? false,
        url: input.url ?? null,
        content: input.content ?? null,
        videoId: input.videoId ?? null,
        thumbnail: input.thumbnail ?? null,
        embedUrl: input.embedUrl ?? null,
      },
    });
  }

  addAssessment(chapterId: number, input: AssessmentInput) {
    return prisma.assessment.create({
      data: {
        chapterId,
        type: input.type,
        title: input.title,
        instructions: input.instructions,
        passingScore: input.passingScore ?? 70,
        maxAttempts: input.maxAttempts,
        timeLimitMinutes: input.timeLimitMinutes,
        questions: input.questions,
      },
    });
  }

  async findChapterForCourse(courseId: number, week: number): Promise<ChapterWithResources | null> {
    const chapter = await prisma.chapter.findFirst({
      where: { courseId, weekNumber: week },
      include: {
        resources: { orderBy: { orderIndex: 'asc' } },
        assessments: true,
      },
      orderBy: { weekNumber: 'asc' },
    });

    if (!chapter) return null;

    return {
      id: chapter.id,
      courseId: chapter.courseId,
      title: chapter.title,
      weekNumber: chapter.weekNumber,
      isPublished: chapter.isPublished,
      minScoreTheory: chapter.minScoreTheory,
      minScorePractice: chapter.minScorePractice,
      unlockDate: chapter.unlockDate,
      resources: chapter.resources,
      assessments: chapter.assessments,
      course: chapter.course
        ? {
            id: chapter.course.id,
            slug: (chapter.course as any).slug,
            name: (chapter.course as any).name,
          }
        : undefined,
    };
  }

  async findChapterWithAssessments(chapterId: number): Promise<ChapterWithResources | null> {
    const chapter = await prisma.chapter.findUnique({
      where: { id: chapterId },
      include: {
        course: { select: { id: true, slug: true, name: true } },
        resources: { orderBy: { orderIndex: 'asc' } },
        assessments: true,
      },
    });

    if (!chapter) return null;

    return {
      id: chapter.id,
      courseId: chapter.courseId,
      title: chapter.title,
      weekNumber: chapter.weekNumber,
      isPublished: chapter.isPublished,
      minScoreTheory: chapter.minScoreTheory,
      minScorePractice: chapter.minScorePractice,
      unlockDate: chapter.unlockDate,
      resources: chapter.resources,
      assessments: chapter.assessments,
    };
  }
}
