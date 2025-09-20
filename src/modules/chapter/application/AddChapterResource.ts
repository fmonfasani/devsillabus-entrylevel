import { ChapterRepository, ChapterResourceInput } from '../ports/ChapterRepository';

export class AddChapterResource {
  constructor(private readonly repository: ChapterRepository) {}

  execute(chapterId: number, input: ChapterResourceInput) {
    return this.repository.addResource(chapterId, input);
  }
}
