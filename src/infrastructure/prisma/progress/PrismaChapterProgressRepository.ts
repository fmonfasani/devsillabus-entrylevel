import { Prisma, PrismaClient, ProgressStatus } from "@prisma/client";
import {
  ChapterProgressRepository,
  ChapterProgressSnapshot,
} from "@/modules/progress/ports";

export class PrismaChapterProgressRepository
  implements ChapterProgressRepository
{
  constructor(private readonly prisma: PrismaClient) {}

  async createMany(progress: ChapterProgressSnapshot[]): Promise<void> {
    if (progress.length === 0) {
      return;
    }

    await this.prisma.chapterProgress.createMany({
      data: progress.map((item) => ({
        userId: item.userId,
        chapterId: item.chapterId,
        status: item.status,
        theoryScore: item.theoryScore ?? null,
        practiceScore: item.practiceScore ?? null,
        startedAt: item.startedAt ?? null,
        completedAt: item.completedAt ?? null,
        lastAccessed: item.lastAccessed ?? null,
      })),
      skipDuplicates: true,
    });
  }

  async upsert(progress: ChapterProgressSnapshot): Promise<ChapterProgressSnapshot> {
    const { userId, chapterId } = progress;

    const createData: Prisma.ChapterProgressUncheckedCreateInput = {
      userId,
      chapterId,
      status: progress.status,
      theoryScore: progress.theoryScore ?? null,
      practiceScore: progress.practiceScore ?? null,
      startedAt: progress.startedAt ?? null,
      completedAt: progress.completedAt ?? null,
      lastAccessed: progress.lastAccessed ?? null,
    };

    const updateData: Prisma.ChapterProgressUncheckedUpdateInput = {
      status: progress.status,
      theoryScore: progress.theoryScore ?? null,
      practiceScore: progress.practiceScore ?? null,
      startedAt: progress.startedAt ?? null,
      completedAt: progress.completedAt ?? null,
      lastAccessed: progress.lastAccessed ?? null,
    };

    const record = await this.prisma.chapterProgress.upsert({
      where: { userId_chapterId: { userId, chapterId } },
      update: updateData,
      create: createData,
    });

    return {
      userId: record.userId,
      chapterId: record.chapterId,
      status: record.status,
      theoryScore: record.theoryScore,
      practiceScore: record.practiceScore,
      startedAt: record.startedAt,
      completedAt: record.completedAt,
      lastAccessed: record.lastAccessed,
    };
  }

  async findByUserAndChapter(
    userId: number,
    chapterId: number
  ): Promise<ChapterProgressSnapshot | null> {
    const record = await this.prisma.chapterProgress.findUnique({
      where: { userId_chapterId: { userId, chapterId } },
    });

    if (!record) {
      return null;
    }

    return {
      userId: record.userId,
      chapterId: record.chapterId,
      status: record.status,
      theoryScore: record.theoryScore,
      practiceScore: record.practiceScore,
      startedAt: record.startedAt,
      completedAt: record.completedAt,
      lastAccessed: record.lastAccessed,
    };
  }

  countCompletedChapters(userId: number, courseId: number): Promise<number> {
    return this.prisma.chapterProgress.count({
      where: {
        userId,
        status: ProgressStatus.COMPLETED,
        chapter: { courseId },
      },
    });
  }
}
