'use client';

import { useEffect, useState } from 'react';
import ChapterList from '@/components/ChapterList';

interface Chapter {
  id: number;
  title: string;
  weekNumber: number;
  courseId: number;
}

interface Course {
  id: number;
  name: string;
  chapters: Chapter[];
}

/**
 * Dashboard de cursos que muestra cada curso junto a la lista de capítulos.
 *
 * Antes se pasaba `courseId` de forma explícita a `ChapterList`, pero ahora el
 * componente obtiene el identificador desde cada capítulo.
 */
const CourseDashboard: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch('/api/admin/courses');
        const data = await res.json();

        const coursesWithChapters = await Promise.all(
          data.map(async (course: any) => {
            const resChapters = await fetch(`/api/admin/courses/${course.id}/chapters`);
            const chapters = resChapters.ok ? await resChapters.json() : [];
            return { ...course, chapters } as Course;
          })
        );
        setCourses(coursesWithChapters);
      } catch (error) {
        console.error('Error loading courses', error);
      }
    };
    fetchCourses();
  }, []);

  if (!courses.length) {
    return <p className="text-sm text-gray-600">No hay cursos registrados.</p>;
  }

  const renderCourseDetail = (course: Course) => (
    <div key={course.id} className="mb-8">
      <h2 className="mb-2 text-xl font-semibold">{course.name}</h2>
      <ChapterList chapters={course.chapters} />
    </div>
  );

  return <div>{courses.map(renderCourseDetail)}</div>;
};

export default CourseDashboard;
