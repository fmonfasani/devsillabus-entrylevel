import { ProgressStatus } from "@prisma/client";
import { ChapterProgressSnapshot } from "../domain/ProgressAggregate";

export interface ChapterProgressRepository {
  createMany(progress: ChapterProgressSnapshot[]): Promise<void>;
  upsert(progress: ChapterProgressSnapshot): Promise<ChapterProgressSnapshot>;
  findByUserAndChapter(
    userId: number,
    chapterId: number
  ): Promise<ChapterProgressSnapshot | null>;
  countCompletedChapters(userId: number, courseId: number): Promise<number>;
}

export interface ChapterProgressWithChapter {
  id: number;
  userId: number;
  chapterId: number;
  status: ProgressStatus;
  theoryScore: number | null;
  practiceScore: number | null;
  startedAt: Date | null;
  completedAt: Date | null;
  lastAccessed: Date | null;
  chapter: {
    id: number;
    title: string;
    weekNumber: number;
    description: string | null;
    minScoreTheory: number;
    minScorePractice: number;
    resources: Array<{
      id: number;
      title: string;
      type: string;
      url: string | null;
      content: string | null;
      orderIndex: number;
    }>;
    assessments: Array<{
      id: number;
      title: string;
      type: string;
      passingScore: number;
    }>;
  };
}
