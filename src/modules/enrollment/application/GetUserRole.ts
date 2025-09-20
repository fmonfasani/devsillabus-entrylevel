import { EnrollmentRepository } from '../ports/EnrollmentRepository';

export class GetUserRole {
  constructor(private readonly repository: EnrollmentRepository) {}

  execute(userId: number): Promise<string | null> {
    return this.repository.findUserRole(userId);
  }
}
