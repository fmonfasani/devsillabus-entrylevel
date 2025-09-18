import { Course, CourseProps } from '../domain/Course';
import { CourseRepository } from '../ports/CourseRepository';

export type CreateCourseInput = Omit<CourseProps, 'id'>;

export class CreateCourse {
  constructor(private readonly repository: CourseRepository) {}

  async execute(input: CreateCourseInput): Promise<Course> {
    const course = new Course(input);
    return this.repository.save(course);
  }
}
