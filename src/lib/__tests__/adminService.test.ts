// src/lib/__tests__/adminService.test.ts
import { test } from 'node:test';
import assert from 'node:assert/strict';

import { CreateCourse } from '@/modules/course/application/CreateCourse';
import { Course } from '@/modules/course/domain/Course';
import {
  AdminCourseDetail,
  CourseDetail,
  CourseRepository,
  CourseSummary,
  UpdateCourseData,
} from '@/modules/course/ports/CourseRepository';
import { ChapterProps } from '@/modules/chapter/domain/Chapter';

class RecordingCourseRepository implements CourseRepository {
  public saved: Course | null = null;

  findSummaries(): Promise<CourseSummary[]> {
    return Promise.resolve([]);
  }

  findBySlugWithChapters(): Promise<CourseDetail | null> {
    return Promise.resolve(null);
  }

  findChaptersByCourseId(): Promise<ChapterProps[]> {
    return Promise.resolve([]);
  }

  async save(course: Course): Promise<Course> {
    this.saved = course;
    return course;
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

test('CreateCourse validates and persists course', async () => {
  const repository = new RecordingCourseRepository();
  const createCourse = new CreateCourse(repository);

  const course = await createCourse.execute({
    name: 'Node Basics',
    slug: 'node-basics',
  });

  assert.ok(repository.saved);
  assert.equal(course.slug, 'node-basics');
});
