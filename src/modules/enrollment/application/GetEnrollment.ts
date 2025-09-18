import { EnrollmentRepository } from '../ports/EnrollmentRepository';

export class GetEnrollment {
  constructor(private readonly repository: EnrollmentRepository) {}

  execute(userId: number, courseId: number) {
    return this.repository.findByUserAndCourse(userId, courseId);
  }
}
