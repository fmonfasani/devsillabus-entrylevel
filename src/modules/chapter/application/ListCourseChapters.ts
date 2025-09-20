import { ChapterRepository, ChapterSummary } from '../ports/ChapterRepository';

export class ListCourseChapters {
  constructor(private readonly repository: ChapterRepository) {}

  execute(courseId: number): Promise<ChapterSummary[]> {
    return this.repository.findByCourseId(courseId);
  }
}
