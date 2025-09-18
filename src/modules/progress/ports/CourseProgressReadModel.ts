import { ProgressStatus } from "@prisma/client";
import { ChapterSnapshot } from "../domain/ProgressAggregate";
import { ChapterProgressWithChapter } from "./ChapterProgressRepository";

export interface ChapterContext {
  chapter: ChapterSnapshot;
  previousChapter?: ChapterSnapshot | null;
  nextChapter?: ChapterSnapshot | null;
}

export interface EnrollmentSnapshot {
  userId: number;
}

export interface RecentActivitySnapshot {
  user: {
    name: string | null;
    email: string;
  };
  chapter: {
    title: string;
    course: { name: string };
  };
  lastAccessed: Date | null;
  status: ProgressStatus;
}

export interface CourseProgressReadModel {
  getCourseChapters(courseId: number): Promise<ChapterSnapshot[]>;
  getChapterContext(chapterId: number): Promise<ChapterContext | null>;
  getUserCourseProgress(
    userId: number,
    courseId: number
  ): Promise<ChapterProgressWithChapter[]>;
  getActiveEnrollments(courseId: number): Promise<EnrollmentSnapshot[]>;
  countChapters(courseId: number): Promise<number>;
  getRecentActivity(since: Date, limit: number): Promise<RecentActivitySnapshot[]>;
  countStudents(): Promise<number>;
  countActiveCourses(): Promise<number>;
  countActiveEnrollments(): Promise<number>;
  countCompletedEnrollments(): Promise<number>;
}
