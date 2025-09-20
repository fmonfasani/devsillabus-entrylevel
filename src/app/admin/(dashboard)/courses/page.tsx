// app/admin/(dashboard)/courses/page.tsx

'use client';

import { useEffect, useState } from 'react';
import CourseCardAdmin, { CourseSummary } from '@/modules/admin/ui/CourseCardAdmin';
import CreateCourseModal from '@/modules/admin/ui/CreateCourseModal';
import { ToastProvider } from '@/modules/admin/ui/Toast';
import { useToast } from '@/modules/admin/ui/Toast';
import EmptyState from '@/components/EmptyState';

export default function CoursesPage() {
  return (
    <ToastProvider>
      <CoursesContent />
    </ToastProvider>
  );
}

function CoursesContent() {
  const { addToast } = useToast();
  const [courses, setCourses] = useState<CourseSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [forbidden, setForbidden] = useState(false);

  const loadCourses = async () => {
    setLoading(true);
    const res = await fetch('/api/courses');
    if (res.status === 403) {
      setForbidden(true);
      setLoading(false);
      return;
    }
    if (res.ok) {
      const data = await res.json();
      setCourses(
        data.map((c: any) => ({
          id: c.id,
          name: c.name,
          slug: c.slug,
          type: c.type,
          level: c.level,
          chaptersCount: c.chaptersCount ?? (c.chapters ? c.chapters.length : 0),
        }))
      );
    }
    setLoading(false);
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const handleCreated = (course: CourseSummary) => {
    setCourses((prev) => [...prev, { ...course, chaptersCount: 0 }]);
    addToast('Curso creado');
  };

  if (forbidden) return <p className="p-6">Solo ADMIN</p>;

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Cursos</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Nuevo curso
        </button>
      </div>
      {loading ? (
        <p>Cargando...</p>
      ) : courses.length === 0 ? (
        <EmptyState message="Sin cursos" />
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {courses.map((c) => (
            <CourseCardAdmin key={c.id} course={c} />
          ))}
        </div>
      )}
      <CreateCourseModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onCreated={handleCreated}
      />

    </div>
  );
}
