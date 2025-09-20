import { ChapterPrismaRepository } from '@/infrastructure/prisma/ChapterPrismaRepository';
import { AddAssessment } from './application/AddAssessment';
import { AddChapterResource } from './application/AddChapterResource';
import { CreateChaptersRange } from './application/CreateChaptersRange';
import { GetChapterForCourse } from './application/GetChapterForCourse';
import { GetChapterWithAssessments } from './application/GetChapterWithAssessments';
import { ListCourseChapters } from './application/ListCourseChapters';

const repository = new ChapterPrismaRepository();

export function makeListCourseChapters() {
  return new ListCourseChapters(repository);
}

export function makeCreateChaptersRange() {
  return new CreateChaptersRange(repository);
}

export function makeAddChapterResource() {
  return new AddChapterResource(repository);
}

export function makeAddAssessment() {
  return new AddAssessment(repository);
}

export function makeGetChapterForCourse() {
  return new GetChapterForCourse(repository);
}

export function makeGetChapterWithAssessments() {
  return new GetChapterWithAssessments(repository);
}

export function makeChapterRepository() {
  return repository;
}
