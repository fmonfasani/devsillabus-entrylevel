// src/components/ChapterList.tsx
import { Course, Chapter } from "@prisma/client";

interface CourseWithChapters extends Course {
  chapters: Chapter[];
}

export default function ChapterList({ course }: { course: CourseWithChapters }) {
  if (!course.chapters.length) {
    return <p className="text-sm text-gray-600">No chapters yet.</p>;
  }
  return (
    <ul className="space-y-2">
      {course.chapters.map((ch) => (
        <li key={ch.id} className="border rounded p-2">
          Semana {ch.weekNumber}: {ch.title}
        </li>
      ))}
    </ul>
  );
}
