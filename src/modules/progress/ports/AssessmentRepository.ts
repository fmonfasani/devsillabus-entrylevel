import { AssessmentType } from "@prisma/client";

export interface AssessmentSnapshot {
  id: number;
  chapterId: number;
  type: AssessmentType;
  title: string;
  passingScore: number;
  chapter: {
    id: number;
    courseId: number;
    weekNumber: number;
    minScoreTheory: number;
    minScorePractice: number;
  };
}

export interface AssessmentRepository {
  findByIdWithChapter(assessmentId: number): Promise<AssessmentSnapshot | null>;
}
