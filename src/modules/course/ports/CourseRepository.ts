import { Course } from '../domain/Course';
import { Chapter } from '../../chapter/domain/Chapter';

export interface CourseSummary {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  durationWeeks: number | null;
}

export interface CourseChapterDetail {
  id: number;
  weekNumber: number;
  title: string;
  isPublished: boolean;
  minScoreTheory: number;
  minScorePractice: number;
  resources?: any[];
  assessments?: any[];
  progress?: any[];
}

export interface CourseDetail {
  course: Course;
  chapters: CourseChapterDetail[];
}

export interface AdminCourseDetail extends CourseDetail {
  enrollments: Array<{
    user: { id: number; name: string | null; email: string | null };
    status: string;
  }>;
}

export interface UpdateCourseData {
  name?: string;
  description?: string | null;
  type?: string | null;
  level?: string | null;
  durationWeeks?: number | null;
  startDate?: Date | null;
  endDate?: Date | null;
}

export interface CourseRepository {
  findSummaries(): Promise<CourseSummary[]>;
  findBySlugWithChapters(slug: string): Promise<CourseDetail | null>;
  findChaptersByCourseId(courseId: number): Promise<Chapter[]>;
  save(course: Course): Promise<Course>;
  findAdminDetailById(courseId: number): Promise<AdminCourseDetail | null>;
  update(courseId: number, data: UpdateCourseData): Promise<Course>;
}
