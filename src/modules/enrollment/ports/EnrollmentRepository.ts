import { Enrollment, EnrollmentProps } from '../domain/Enrollment';

export interface EnrollmentWithCourse extends EnrollmentProps {
  course: {
    id: number;
    name: string;
    slug: string;
    description: string | null;
  };
}

export interface UserSummary {
  id: number;
  role: string;
  email: string;
}

export interface EnrollmentRepository {
  findByUserAndCourse(userId: number, courseId: number): Promise<Enrollment | null>;
  create(enrollment: Enrollment): Promise<Enrollment>;
  listByUser(userId: number): Promise<EnrollmentWithCourse[]>;
  findUserByEmail(email: string): Promise<UserSummary | null>;
  findUserRole(userId: number): Promise<string | null>;
}
