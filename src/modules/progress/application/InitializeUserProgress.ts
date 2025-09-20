import { ProgressStatus } from '../domain/Progress';
import { ProgressRepository } from '../ports/ProgressRepository';

export class InitializeUserProgress {
  constructor(private readonly repository: ProgressRepository) {}

  async execute(userId: number, courseId: number) {
    const chapters = await this.repository.listChaptersByCourse(courseId);
    if (chapters.length === 0) return;

    const records = chapters.map((chapter, index) => ({
      userId,
      chapterId: chapter.id,
      status: index === 0 ? ProgressStatus.AVAILABLE : ProgressStatus.LOCKED,
    }));

    await this.repository.createManyProgress(records);
  }
}
