import { EnrollmentRepository, EnrollmentWithCourse } from '../ports/EnrollmentRepository';

export class ListUserEnrollments {
  constructor(private readonly repository: EnrollmentRepository) {}

  execute(userId: number): Promise<EnrollmentWithCourse[]> {
    return this.repository.listByUser(userId);
  }
}
