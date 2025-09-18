import { ChapterProps } from '../domain/Chapter';

export interface ChapterResourceInput {
  type: string;
  title: string;
  url?: string | null;
  content?: string | null;
  isRequired?: boolean;
  videoId?: string | null;
  thumbnail?: string | null;
  embedUrl?: string | null;
  isYouTube?: boolean;
}

export interface AssessmentInput {
  type: string;
  title: string;
  instructions?: string | null;
  passingScore?: number | null;
  maxAttempts?: number | null;
  timeLimitMinutes?: number | null;
  questions?: any[];
}

export type ChapterSummary = ChapterProps;

export type ChapterWithResources = ChapterProps & {
  resources: any[];
  assessments: any[];
  course?: {
    id: number;
    slug?: string;
    name?: string;
  };
};

export interface ChapterRepository {
  findByCourseId(courseId: number): Promise<ChapterSummary[]>;
  createRange(courseId: number, from: number, to: number): Promise<ChapterSummary[]>;
  addResource(chapterId: number, input: ChapterResourceInput): Promise<any>;
  addAssessment(chapterId: number, input: AssessmentInput): Promise<any>;
  findChapterForCourse(courseId: number, week: number): Promise<ChapterWithResources | null>;
  findChapterWithAssessments(chapterId: number): Promise<ChapterWithResources | null>;
}
