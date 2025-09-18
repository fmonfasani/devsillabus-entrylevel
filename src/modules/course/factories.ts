import { CoursePrismaRepository } from '@/infrastructure/prisma/CoursePrismaRepository';
import { CreateCourse } from './application/CreateCourse';
import { GetAdminCourseDetail } from './application/GetAdminCourseDetail';
import { GetCourseDetail } from './application/GetCourseDetail';
import { ListCourses } from './application/ListCourses';
import { UpdateCourse } from './application/UpdateCourse';

const repository = new CoursePrismaRepository();

export function makeListCourses() {
  return new ListCourses(repository);
}

export function makeGetCourseDetail() {
  return new GetCourseDetail(repository);
}

export function makeCreateCourse() {
  return new CreateCourse(repository);
}

export function makeGetAdminCourseDetail() {
  return new GetAdminCourseDetail(repository);
}

export function makeUpdateCourse() {
  return new UpdateCourse(repository);
}

export function makeCourseRepository() {
  return repository;
}
