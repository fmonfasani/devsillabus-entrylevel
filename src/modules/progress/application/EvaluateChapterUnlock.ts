import { ProgressStatus } from '../domain/Progress';
import { ProgressRepository } from '../ports/ProgressRepository';

export class EvaluateChapterUnlock {
  constructor(private readonly repository: ProgressRepository) {}

  async execute(userId: number, chapterId: number) {
    const chapter = await this.repository.findChapterWithCourse(chapterId);
    if (!chapter) return false;

    if (chapter.weekNumber === 1) {
      await this.repository.upsertProgress(userId, chapterId, {
        status: ProgressStatus.AVAILABLE,
        lastAccessed: new Date(),
      });
      return true;
    }

    if (chapter.unlockDate && new Date() < chapter.unlockDate) {
      return false;
    }

    const previousChapter = chapter.course.chapters.find(
      (c) => c.weekNumber === chapter.weekNumber - 1,
    );
    if (!previousChapter) return false;

    const previousProgress = await this.repository.findProgress(userId, previousChapter.id);
    if (!previousProgress || previousProgress.status !== ProgressStatus.COMPLETED) {
      return false;
    }

    const meetsTheory =
      !previousProgress.toJSON().theoryScore ||
      (previousProgress.toJSON().theoryScore ?? 0) >= previousChapter.minScoreTheory;
    const meetsPractice =
      !previousProgress.toJSON().practiceScore ||
      (previousProgress.toJSON().practiceScore ?? 0) >= previousChapter.minScorePractice;

    if (!meetsTheory || !meetsPractice) {
      return false;
    }

    await this.repository.upsertProgress(userId, chapterId, {
      status: ProgressStatus.AVAILABLE,
      lastAccessed: new Date(),
    });

    return true;
  }
}
