// src/modules/admin/ui/CourseCardAdmin.tsx
import Link from 'next/link';
import { CourseLevel, CourseType } from '@prisma/client';

export interface CourseSummary {
  id: number;
  name: string;
  slug: string;
  type: CourseType;
  level: CourseLevel;
  chaptersCount: number;
}

export default function CourseCardAdmin({ course }: { course: CourseSummary }) {
  return (
    <div className="border rounded p-4 flex justify-between items-start">
      <div>
        <h3 className="font-semibold text-lg">{course.name}</h3>
        <p className="text-sm text-gray-500">{course.slug}</p>
        <p className="text-sm capitalize">
          {course.type.toLowerCase()} · {course.level.toLowerCase()}
        </p>
        <p className="text-sm">Capítulos: {course.chaptersCount}</p>
      </div>
      <Link
        href={`/admin/courses/${course.id}`}
        className="text-blue-600 hover:underline self-center"
        aria-label={`Ver curso ${course.name}`}
      >
        Ver
      </Link>
    </div>
  );
}
