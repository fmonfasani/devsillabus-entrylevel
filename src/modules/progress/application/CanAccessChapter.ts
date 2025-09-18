import { ProgressRepository } from '../ports/ProgressRepository';
import { ProgressStatus } from '../domain/Progress';

export class CanAccessChapter {
  constructor(private readonly repository: ProgressRepository) {}

  async execute(userId: number, chapterId: number) {
    const progress = await this.repository.findProgress(userId, chapterId);
    return progress ? progress.status !== ProgressStatus.LOCKED : false;
  }
}
