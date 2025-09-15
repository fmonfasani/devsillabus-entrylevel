'use client';
import React from 'react';

export type CourseCardProps = {
  id: number;
  title?: string;                // desde dashboard
  name?: string;                 // compat
  slug: string;
  description?: string | null;
  chaptersCount?: number;        // desde dashboard
  chapters?: number;             // compat
  completedCount?: number;       // desde dashboard
  enrollments?: number;          // opcional
  completionRate?: number;       // si no viene, se calcula
  onEdit?: (course: NormalizedCourse) => void;
  onSelect?: (course: NormalizedCourse) => void;
};

export type NormalizedCourse = {
  id: number;
  name: string;
  slug: string;
  chapters: number;
  completed: number;
  enrollments: number;
  completionRate: number; // 0–100
  description?: string | null;
};

function normalize(p: CourseCardProps): NormalizedCourse {
  const chapters = p.chapters ?? p.chaptersCount ?? 0;
  const completed = p.completedCount ?? 0;
  const computedRate =
    typeof p.completionRate === 'number'
      ? p.completionRate
      : chapters > 0
      ? Math.round((completed / chapters) * 100)
      : 0;

  return {
    id: p.id,
    name: p.name ?? p.title ?? 'Untitled course',
    slug: p.slug,
    chapters,
    completed,
    enrollments: p.enrollments ?? 0,
    completionRate: computedRate,
    description: p.description,
  };
}

const CourseCard: React.FC<CourseCardProps> = (props) => {
  // blindaje mínimo por si algo viene mal
  if (!props || typeof props.id !== 'number') {
    return (
      <div className="border rounded-lg p-4 bg-white shadow-sm">
        <p className="text-sm text-red-600">CourseCard: props inválidos</p>
      </div>
    );
  }

  const course = normalize(props);

  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">{course.name}</h3>
          <p className="text-sm text-gray-500">{course.slug}</p>
          {course.description ? (
            <p className="mt-1 text-sm text-gray-600 line-clamp-2">{course.description}</p>
          ) : null}
          <div className="mt-2 text-sm text-gray-600">
            <p>Capítulos: {course.chapters}</p>
            <p>Completados: {course.completed}</p>
            <p>Completado: {course.completionRate}%</p>
            {course.enrollments ? <p>Estudiantes: {course.enrollments}</p> : null}
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => props.onEdit?.(course)}
            className="px-2 py-1 text-sm border rounded hover:bg-gray-100"
          >
            Editar
          </button>
          <button
            onClick={() => props.onSelect?.(course)}
            className="px-2 py-1 text-sm border rounded hover:bg-gray-100"
          >
            Capítulos
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
