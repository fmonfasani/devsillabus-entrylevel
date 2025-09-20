import { ProgressRepository } from '../ports/ProgressRepository';
import { EvaluateChapterUnlock } from './EvaluateChapterUnlock';

export class UnlockNextChapter {
  constructor(
    private readonly repository: ProgressRepository,
    private readonly evaluateChapterUnlock: EvaluateChapterUnlock,
  ) {}

  async execute(userId: number, currentChapterId: number) {
    const chapter = await this.repository.findChapterWithCourse(currentChapterId);
    if (!chapter) return;

    const nextChapter = chapter.course.chapters.find(
      (c) => c.weekNumber === chapter.weekNumber + 1,
    );
    if (!nextChapter) return;

    await this.evaluateChapterUnlock.execute(userId, nextChapter.id);
  }
}
