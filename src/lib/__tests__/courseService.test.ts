// src/lib/__tests__/courseService.test.ts
import { test } from 'node:test';
import assert from 'node:assert/strict';

import { ListCourses } from '@/modules/course/application/ListCourses';
import { Course } from '@/modules/course/domain/Course';
import {
  AdminCourseDetail,
  CourseDetail,
  CourseRepository,
  CourseSummary,
  UpdateCourseData,
} from '@/modules/course/ports/CourseRepository';
import { ChapterProps } from '@/modules/chapter/domain/Chapter';

class FakeCourseRepository implements CourseRepository {
  constructor(private summaries: CourseSummary[]) {}

  findSummaries(): Promise<CourseSummary[]> {
    return Promise.resolve(this.summaries);
  }

  findBySlugWithChapters(): Promise<CourseDetail | null> {
    return Promise.resolve(null);
  }

  findChaptersByCourseId(): Promise<ChapterProps[]> {
    return Promise.resolve([]);
  }

  save(course: Course): Promise<Course> {
    return Promise.resolve(course);
  }

  findAdminDetailById(): Promise<AdminCourseDetail | null> {
    return Promise.resolve(null);
  }

  update(courseId: number, data: UpdateCourseData): Promise<Course> {
    return Promise.resolve(
      new Course({ id: courseId, name: 'Updated', slug: 'updated', ...data }),
    );
  }
}

test('ListCourses returns repository summaries', async () => {
  const repository = new FakeCourseRepository([
    { id: 1, name: 'A', slug: 'a', description: null, durationWeeks: null },
    { id: 2, name: 'B', slug: 'b', description: null, durationWeeks: 12 },
  ]);
  const listCourses = new ListCourses(repository);

  const courses = await listCourses.execute();

  assert.equal(courses.length, 2);
  assert.equal(courses[0].name, 'A');
  assert.equal(courses[1].durationWeeks, 12);
});
