// src/components/CourseDashboard.tsx
import ChapterList from "./ChapterList";
import { Course, Chapter } from "@prisma/client";

export interface CourseWithChapters extends Course {
  chapters: Chapter[];
}

export default function CourseDashboard({ course }: { course: CourseWithChapters }) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">{course.name}</h2>
      {course.description && <p>{course.description}</p>}
      <ChapterList course={course} />
    </div>
  );
}
