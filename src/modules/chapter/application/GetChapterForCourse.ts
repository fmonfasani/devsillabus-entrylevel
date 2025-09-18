import { ChapterRepository, ChapterWithResources } from '../ports/ChapterRepository';

export class GetChapterForCourse {
  constructor(private readonly repository: ChapterRepository) {}

  execute(courseId: number, week: number): Promise<ChapterWithResources | null> {
    return this.repository.findChapterForCourse(courseId, week);
  }
}
