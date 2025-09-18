import { ProgressStatus } from '../domain/Progress';
import { ProgressRepository, ProgressUpdate } from '../ports/ProgressRepository';
import { UnlockNextChapter } from './UnlockNextChapter';

export interface UpdateChapterScores {
  theoryScore?: number;
  practiceScore?: number;
}

export class UpdateChapterStatus {
  constructor(
    private readonly repository: ProgressRepository,
    private readonly unlockNextChapter: UnlockNextChapter,
  ) {}

  async execute(
    userId: number,
    chapterId: number,
    status: ProgressStatus,
    scores?: UpdateChapterScores,
  ) {
    const update: ProgressUpdate = {
      status,
      lastAccessed: new Date(),
    };

    if (status === ProgressStatus.IN_PROGRESS) {
      update.startedAt = new Date();
    }

    if (status === ProgressStatus.COMPLETED) {
      update.completedAt = new Date();
    }

    if (scores) {
      if (scores.theoryScore !== undefined) {
        update.theoryScore = scores.theoryScore;
      }
      if (scores.practiceScore !== undefined) {
        update.practiceScore = scores.practiceScore;
      }
    }

    const progress = await this.repository.upsertProgress(userId, chapterId, update);

    if (status === ProgressStatus.COMPLETED) {
      await this.unlockNextChapter.execute(userId, chapterId);
    }

    return progress;
  }
}
