import { Enrollment } from '../domain/Enrollment';
import { EnrollmentRepository } from '../ports/EnrollmentRepository';

export class EnrollStudent {
  constructor(private readonly repository: EnrollmentRepository) {}

  async execute(userId: number, courseId: number) {
    const existing = await this.repository.findByUserAndCourse(userId, courseId);
    if (existing) {
      return existing;
    }
    const enrollment = new Enrollment({ userId, courseId });
    return this.repository.create(enrollment);
  }
}
