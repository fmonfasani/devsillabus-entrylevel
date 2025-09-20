import { ProgressRecord, ProgressStatus } from '../domain/Progress';

export interface ProgressUpdate {
  status: ProgressStatus;
  theoryScore?: number | null;
  practiceScore?: number | null;
  startedAt?: Date | null;
  completedAt?: Date | null;
  lastAccessed?: Date | null;
}

export interface CourseChapter {
  id: number;
  weekNumber: number;
  minScoreTheory: number;
  minScorePractice: number;
  unlockDate: Date | null;
  courseId: number;
  course: {
    id: number;
    chapters: Array<{
      id: number;
      weekNumber: number;
      minScoreTheory: number;
      minScorePractice: number;
    }>;
  };
}

export interface AssessmentDetail {
  id: number;
  chapterId: number;
  type: string;
  title: string;
  chapter: {
    id: number;
    minScoreTheory: number;
    minScorePractice: number;
  };
}

export interface ProgressRepository {
  listChaptersByCourse(courseId: number): Promise<Array<{ id: number; weekNumber: number }>>;
  createManyProgress(records: Array<{ userId: number; chapterId: number; status: ProgressStatus }>): Promise<void>;
  findChapterWithCourse(chapterId: number): Promise<CourseChapter | null>;
  findProgress(userId: number, chapterId: number): Promise<ProgressRecord | null>;
  upsertProgress(userId: number, chapterId: number, update: ProgressUpdate): Promise<ProgressRecord>;
  listProgressByUserAndCourse(userId: number, courseId: number): Promise<any[]>;
  countChapters(courseId: number): Promise<number>;
  listActiveEnrollments(courseId: number): Promise<Array<{ userId: number }>>;
  countCompletedChapters(userId: number, courseId: number): Promise<number>;
  listRecentActivity(): Promise<any[]>;
  countStudents(): Promise<number>;
  countActiveCourses(): Promise<number>;
  countActiveEnrollments(): Promise<number>;
  countCompletedEnrollments(): Promise<number>;
  findAssessmentById(assessmentId: number): Promise<AssessmentDetail | null>;
}
