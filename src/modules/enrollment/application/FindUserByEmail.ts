import { EnrollmentRepository, UserSummary } from '../ports/EnrollmentRepository';

export class FindUserByEmail {
  constructor(private readonly repository: EnrollmentRepository) {}

  execute(email: string): Promise<UserSummary | null> {
    return this.repository.findUserByEmail(email);
  }
}
