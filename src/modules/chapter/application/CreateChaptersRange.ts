import { ChapterRepository, ChapterSummary } from '../ports/ChapterRepository';

export class CreateChaptersRange {
  constructor(private readonly repository: ChapterRepository) {}

  execute(courseId: number, from: number, to: number): Promise<ChapterSummary[]> {
    if (from > to) {
      throw new Error('Invalid range: from cannot be greater than to');
    }
    return this.repository.createRange(courseId, from, to);
  }
}
