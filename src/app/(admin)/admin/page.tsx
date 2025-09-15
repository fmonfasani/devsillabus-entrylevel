// app/(admin)/admin/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CourseLevel, CourseType } from '@prisma/client';
import ChapterSelect from '@/components/ChapterSelect';
import ResourceForm from '@/components/ResourceForm';
import AssessmentForm from '@/components/AssessmentForm';
import { ToastProvider, useToast } from '@/components/Toast';

interface Course {
  id: number;
  name: string;
}

export default function AdminPage() {
  return (
    <ToastProvider>
      <AdminContent />
    </ToastProvider>
  );
}

function AdminContent() {
  const { addToast } = useToast();
  const [courses, setCourses] = useState<Course[]>([]);
  const [forbidden, setForbidden] = useState(false);

  useEffect(() => {
    fetch('/api/courses').then(async (res) => {
      if (res.status === 403) {
        setForbidden(true);
        return;
      }
      if (res.ok) {
        const data: Course[] = await res.json();
        setCourses(data);
      }
    });
  }, []);

  // Create course form state
  const [courseForm, setCourseForm] = useState({
    name: '',
    slug: '',
    description: '',
    type: CourseType.FULLSTACK as CourseType,
    level: CourseLevel.ENTRY_LEVEL as CourseLevel,
    initWeeks: false,
  });

  const handleCourseSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/admin/courses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(courseForm),
    });
    if (res.status === 201) {
      const data = await res.json();
      addToast('Curso creado');
      setCourses((prev) => [...prev, data]);
      setCourseForm({
        name: '',
        slug: '',
        description: '',
        type: CourseType.FULLSTACK,
        level: CourseLevel.ENTRY_LEVEL,
        initWeeks: false,
      });
    } else {
      addToast('Error al crear curso', 'error');
    }
  };

  // Resource form selectors
  const [resourceCourse, setResourceCourse] = useState<number | ''>('');
  const [resourceChapter, setResourceChapter] = useState<number | null>(null);

  // Assessment form selectors
  const [assCourse, setAssCourse] = useState<number | ''>('');
  const [assChapter, setAssChapter] = useState<number | null>(null);

  if (forbidden) return <p className="p-6">Solo ADMIN</p>;

  return (
    <div className="p-6 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Admin</h1>
        <Link href="/admin/courses" className="text-blue-600 underline">
          Ir a cursos
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Crear curso */}
        <div className="border rounded p-4 space-y-2">
          <h2 className="font-semibold">Crear curso</h2>
          <form onSubmit={handleCourseSubmit} className="space-y-2">
            <div>
              <label className="block text-sm mb-1" htmlFor="c-name">
                Nombre
              </label>
              <input
                id="c-name"
                className="w-full border rounded p-2"
                value={courseForm.name}
                onChange={(e) =>
                  setCourseForm({ ...courseForm, name: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })
                }
                required
              />
            </div>
            <div>
              <label className="block text-sm mb-1" htmlFor="c-slug">
                Slug
              </label>
              <input
                id="c-slug"
                className="w-full border rounded p-2"
                value={courseForm.slug}
                onChange={(e) => setCourseForm({ ...courseForm, slug: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm mb-1" htmlFor="c-description">
                Descripción
              </label>
              <textarea
                id="c-description"
                className="w-full border rounded p-2"
                rows={3}
                value={courseForm.description}
                onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-1 gap-2">
              <select
                className="border rounded p-2"
                value={courseForm.type}
                onChange={(e) => setCourseForm({ ...courseForm, type: e.target.value as CourseType })}
              >
                {Object.values(CourseType).map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              <select
                className="border rounded p-2"
                value={courseForm.level}
                onChange={(e) => setCourseForm({ ...courseForm, level: e.target.value as CourseLevel })}
              >
                {Object.values(CourseLevel).map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <input
                id="c-initweeks"
                type="checkbox"
                checked={courseForm.initWeeks}
                onChange={(e) => setCourseForm({ ...courseForm, initWeeks: e.target.checked })}
              />
              <label htmlFor="c-initweeks" className="text-sm">
                Inicializar semanas
              </label>
            </div>
            <button type="submit" className="bg-blue-600 text-white px-3 py-2 rounded">
              Crear
            </button>
          </form>
        </div>

        {/* Agregar recurso */}
        <div className="border rounded p-4 space-y-2">
          <h2 className="font-semibold">Agregar recurso a capítulo</h2>
          <div className="space-y-2">
            <select
              className="w-full border rounded p-2"
              value={resourceCourse}
              onChange={(e) => {
                setResourceCourse(e.target.value ? Number(e.target.value) : '');
                setResourceChapter(null);
              }}
            >
              <option value="">Selecciona curso</option>
              {courses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            {resourceCourse && (
              <ChapterSelect
                courseId={resourceCourse}
                value={resourceChapter ?? undefined}
                onChange={(id) => setResourceChapter(id)}
              />
            )}
            {resourceChapter && <ResourceForm chapterId={resourceChapter} />}
          </div>
        </div>

        {/* Agregar evaluación */}
        <div className="border rounded p-4 space-y-2">
          <h2 className="font-semibold">Agregar evaluación</h2>
          <div className="space-y-2">
            <select
              className="w-full border rounded p-2"
              value={assCourse}
              onChange={(e) => {
                setAssCourse(e.target.value ? Number(e.target.value) : '');
                setAssChapter(null);
              }}
            >
              <option value="">Selecciona curso</option>
              {courses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            {assCourse && (
              <ChapterSelect
                courseId={assCourse}
                value={assChapter ?? undefined}
                onChange={(id) => setAssChapter(id)}
              />
            )}
            {assChapter && <AssessmentForm chapterId={assChapter} />}
          </div>
        </div>
      </div>
    </div>
  );
}
