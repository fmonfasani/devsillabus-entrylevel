import { Course } from '../domain/Course';
import { CourseRepository, UpdateCourseData } from '../ports/CourseRepository';

export class UpdateCourse {
  constructor(private readonly repository: CourseRepository) {}

  async execute(courseId: number, data: UpdateCourseData): Promise<Course> {
    const sanitized: UpdateCourseData = {
      ...data,
      durationWeeks: data.durationWeeks ?? null,
      startDate: data.startDate ?? null,
      endDate: data.endDate ?? null,
    };

    const course = await this.repository.update(courseId, sanitized);
    return course;
  }
}
