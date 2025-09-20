import { CourseRepository, CourseSummary } from '../ports/CourseRepository';

export class ListCourses {
  constructor(private readonly repository: CourseRepository) {}

  execute(): Promise<CourseSummary[]> {
    return this.repository.findSummaries();
  }
}
