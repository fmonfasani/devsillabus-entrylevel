import { EnrollmentPrismaRepository } from '@/infrastructure/prisma/EnrollmentPrismaRepository';
import { EnrollStudent } from './application/EnrollStudent';
import { FindUserByEmail } from './application/FindUserByEmail';
import { GetEnrollment } from './application/GetEnrollment';
import { GetUserRole } from './application/GetUserRole';
import { ListUserEnrollments } from './application/ListUserEnrollments';

const repository = new EnrollmentPrismaRepository();

export function makeListUserEnrollments() {
  return new ListUserEnrollments(repository);
}

export function makeGetEnrollment() {
  return new GetEnrollment(repository);
}

export function makeEnrollStudent() {
  return new EnrollStudent(repository);
}

export function makeFindUserByEmail() {
  return new FindUserByEmail(repository);
}

export function makeGetUserRole() {
  return new GetUserRole(repository);
}

export function makeEnrollmentRepository() {
  return repository;
}
