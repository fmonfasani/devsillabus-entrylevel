import { AdminCourseDetail, CourseRepository } from '../ports/CourseRepository';

export class GetAdminCourseDetail {
  constructor(private readonly repository: CourseRepository) {}

  execute(courseId: number): Promise<AdminCourseDetail | null> {
    return this.repository.findAdminDetailById(courseId);
  }
}
