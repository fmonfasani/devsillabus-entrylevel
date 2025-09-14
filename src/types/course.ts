export interface Chapter {
  id: string;
  name: string;
  progress: number;
}

export interface Course {
  id: string;
  name: string;
  level: string;
  progress: number;
  chapters: Chapter[];
}
