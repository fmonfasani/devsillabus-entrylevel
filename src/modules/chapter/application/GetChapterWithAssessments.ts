import { ChapterRepository, ChapterWithResources } from '../ports/ChapterRepository';

export class GetChapterWithAssessments {
  constructor(private readonly repository: ChapterRepository) {}

  execute(chapterId: number): Promise<ChapterWithResources | null> {
    return this.repository.findChapterWithAssessments(chapterId);
  }
}
