import { CourseDetail, CourseRepository } from '../ports/CourseRepository';

export class GetCourseDetail {
  constructor(private readonly repository: CourseRepository) {}

  execute(slug: string): Promise<CourseDetail | null> {
    return this.repository.findBySlugWithChapters(slug);
  }
}
