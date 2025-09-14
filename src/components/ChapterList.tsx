import React from 'react';
import Link from 'next/link';

interface Chapter {
  id: number;
  title: string;
  weekNumber: number;
  courseId: number;
}

interface ChapterListProps {
  chapters: Chapter[];
}

/**
 * Muestra la lista de capítulos de un curso.
 *
 * `courseId` solía recibirse como prop, pero ahora se obtiene de cada capítulo
 * para simplificar la API del componente.
 */
const ChapterList: React.FC<ChapterListProps> = ({ chapters }) => {
  const renderCourseDetail = (chapter: Chapter) => (
    <li key={chapter.id} className="rounded border p-3">
      <Link
        href={`/admin/courses/${chapter.courseId}/chapters/${chapter.id}`}
        className="block hover:underline"
      >
        <span className="font-medium">Semana {chapter.weekNumber}:</span> {chapter.title}
      </Link>
    </li>
  );

  if (!chapters.length) {
    return <p className="text-sm text-gray-600">No hay capítulos creados.</p>;
  }

  return <ul className="space-y-2">{chapters.map(renderCourseDetail)}</ul>;
};

export default ChapterList;
