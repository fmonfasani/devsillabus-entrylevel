// app/admin/page.tsx
'use client';

import { useEffect, useState, FormEvent } from 'react';
import { CourseType, CourseLevel, ResourceType, AssessmentType } from '@prisma/client';

type Course = { id: number; name: string; slug: string };
type Chapter = { id: number; weekNumber: number; title: string };

async function fetchJSON<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, init);
  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || res.statusText);
  }
  return res.json();
}

export default function AdminPage() {
  const [session, setSession] = useState<any>(null);
  const [courses, setCourses] = useState<Course[]>([]);

  const [courseResource, setCourseResource] = useState<number | ''>('');
  const [chaptersResource, setChaptersResource] = useState<Chapter[]>([]);
  const [chapterResource, setChapterResource] = useState<number | ''>('');

  const [courseAssessment, setCourseAssessment] = useState<number | ''>('');
  const [chaptersAssessment, setChaptersAssessment] = useState<Chapter[]>([]);
  const [chapterAssessment, setChapterAssessment] = useState<number | ''>('');

  const HAS_QUESTIONS_FIELD = false;

  useEffect(() => {
    fetchJSON('/api/auth/session').then(setSession).catch(() => {});
    fetchCourses();
  }, []);

  async function fetchCourses() {
    try {
      const data = await fetchJSON<Course[]>('/api/courses');
      setCourses(data);
    } catch (e) {
      console.error(e);
    }
  }

  async function handleCreateCourse(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const body = {
      name: formData.get('name'),
      slug: formData.get('slug'),
      description: formData.get('description') || undefined,
      type: formData.get('type'),
      level: formData.get('level'),
      initWeeks: formData.get('initWeeks') === 'on',
    };
    try {
      await fetchJSON('/api/admin/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      alert('Curso creado');
      form.reset();
      fetchCourses();
    } catch (err: any) {
      alert('Error: ' + err.message);
    }
  }

  useEffect(() => {
    if (courseResource) {
      fetchJSON<Chapter[]>(`/api/courses/${courseResource}/chapters`)
        .then(setChaptersResource)
        .catch(() => setChaptersResource([]));
    } else {
      setChaptersResource([]);
    }
  }, [courseResource]);

  async function handleAddResource(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!chapterResource) {
      alert('Selecciona un capítulo');
      return;
    }
    const form = e.currentTarget;
    const formData = new FormData(form);
    const body = {
      type: formData.get('type'),
      title: formData.get('title'),
      url: formData.get('url') || undefined,
      content: formData.get('content') || undefined,
      isRequired: formData.get('isRequired') === 'on',
    };
    try {
      await fetchJSON(`/api/admin/chapters/${chapterResource}/resources`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      alert('Recurso agregado');
      form.reset();
    } catch (err: any) {
      alert('Error: ' + err.message);
    }
  }

  useEffect(() => {
    if (courseAssessment) {
      fetchJSON<Chapter[]>(`/api/courses/${courseAssessment}/chapters`)
        .then(setChaptersAssessment)
        .catch(() => setChaptersAssessment([]));
    } else {
      setChaptersAssessment([]);
    }
  }, [courseAssessment]);

  async function handleAddAssessment(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!chapterAssessment) {
      alert('Selecciona un capítulo');
      return;
    }
    const form = e.currentTarget;
    const formData = new FormData(form);
    const body: any = {
      type: formData.get('type'),
      title: formData.get('title'),
      instructions: formData.get('instructions') || undefined,
      passingScore: formData.get('passingScore')
        ? Number(formData.get('passingScore'))
        : 70,
      maxAttempts: formData.get('maxAttempts')
        ? Number(formData.get('maxAttempts'))
        : undefined,
      timeLimitMinutes: formData.get('timeLimitMinutes')
        ? Number(formData.get('timeLimitMinutes'))
        : undefined,
    };
    if (HAS_QUESTIONS_FIELD) {
      const q = formData.get('questions');
      if (q) {
        try {
          body.questions = JSON.parse(q as string);
        } catch {
          body.questions = q;
        }
      }
    }
    try {
      await fetchJSON(`/api/admin/chapters/${chapterAssessment}/assessments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      alert('Evaluación agregada');
      form.reset();
    } catch (err: any) {
      alert('Error: ' + err.message);
    }
  }

  return (
    <div className="p-4 space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Admin</h1>
        {session?.user && (
          <p className="text-sm text-gray-600">
            Hola {session.user.name} ({(session.user as any).role})
          </p>
        )}
      </div>

      <section className="border rounded p-4">
        <h2 className="font-semibold mb-2">Crear curso</h2>
        <form onSubmit={handleCreateCourse} className="space-y-2">
          <div>
            <label className="block text-sm">Nombre</label>
            <input name="name" required className="border rounded w-full p-1" />
          </div>
          <div>
            <label className="block text-sm">Slug</label>
            <input name="slug" required className="border rounded w-full p-1" />
          </div>
          <div>
            <label className="block text-sm">Descripción</label>
            <textarea name="description" className="border rounded w-full p-1" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm">Tipo</label>
              <select name="type" required className="border rounded w-full p-1">
                <option value="">Seleccionar</option>
                {Object.values(CourseType).map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm">Nivel</label>
              <select name="level" required className="border rounded w-full p-1">
                <option value="">Seleccionar</option>
                {Object.values(CourseLevel).map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" name="initWeeks" id="initWeeks" className="rounded" />
            <label htmlFor="initWeeks" className="text-sm">
              Crear semanas 0..10
            </label>
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-3 py-1 rounded"
          >
            Crear
          </button>
        </form>
      </section>

      <section className="border rounded p-4">
        <h2 className="font-semibold mb-2">Agregar recurso a capítulo</h2>
        <form onSubmit={handleAddResource} className="space-y-2">
          <div>
            <label className="block text-sm">Curso</label>
            <select
              value={courseResource}
              onChange={(e) =>
                setCourseResource(e.target.value ? Number(e.target.value) : '')
              }
              className="border rounded w-full p-1"
              required
            >
              <option value="">Seleccionar curso</option>
              {courses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          {chaptersResource.length > 0 && (
            <div>
              <label className="block text-sm">Capítulo</label>
              <select
                value={chapterResource}
                onChange={(e) =>
                  setChapterResource(e.target.value ? Number(e.target.value) : '')
                }
                className="border rounded w-full p-1"
                required
              >
                <option value="">Seleccionar semana</option>
                {chaptersResource.map((ch) => (
                  <option key={ch.id} value={ch.id}>
                    Semana {ch.weekNumber}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div>
            <label className="block text-sm">Tipo</label>
            <select name="type" required className="border rounded w-full p-1">
              <option value="">Seleccionar</option>
              {Object.values(ResourceType).map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm">Título</label>
            <input name="title" required className="border rounded w-full p-1" />
          </div>
          <div>
            <label className="block text-sm">URL</label>
            <input name="url" className="border rounded w-full p-1" />
          </div>
          <div>
            <label className="block text-sm">Contenido</label>
            <textarea name="content" className="border rounded w-full p-1" />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isRequired"
              id="isRequired"
              className="rounded"
            />
            <label htmlFor="isRequired" className="text-sm">
              Requerido
            </label>
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-3 py-1 rounded"
          >
            Agregar recurso
          </button>
        </form>
      </section>

      <section className="border rounded p-4">
        <h2 className="font-semibold mb-2">Agregar evaluación</h2>
        <form onSubmit={handleAddAssessment} className="space-y-2">
          <div>
            <label className="block text-sm">Curso</label>
            <select
              value={courseAssessment}
              onChange={(e) =>
                setCourseAssessment(e.target.value ? Number(e.target.value) : '')
              }
              className="border rounded w-full p-1"
              required
            >
              <option value="">Seleccionar curso</option>
              {courses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          {chaptersAssessment.length > 0 && (
            <div>
              <label className="block text-sm">Capítulo</label>
              <select
                value={chapterAssessment}
                onChange={(e) =>
                  setChapterAssessment(e.target.value ? Number(e.target.value) : '')
                }
                className="border rounded w-full p-1"
                required
              >
                <option value="">Seleccionar semana</option>
                {chaptersAssessment.map((ch) => (
                  <option key={ch.id} value={ch.id}>
                    Semana {ch.weekNumber}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div>
            <label className="block text-sm">Tipo</label>
            <select name="type" required className="border rounded w-full p-1">
              <option value="">Seleccionar</option>
              {Object.values(AssessmentType).map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm">Título</label>
            <input name="title" required className="border rounded w-full p-1" />
          </div>
          <div>
            <label className="block text-sm">Instrucciones</label>
            <textarea name="instructions" className="border rounded w-full p-1" />
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-sm">Nota mínima</label>
              <input
                type="number"
                name="passingScore"
                defaultValue={70}
                className="border rounded w-full p-1"
              />
            </div>
            <div>
              <label className="block text-sm">Intentos máx.</label>
              <input type="number" name="maxAttempts" className="border rounded w-full p-1" />
            </div>
            <div>
              <label className="block text-sm">Tiempo (min)</label>
              <input
                type="number"
                name="timeLimitMinutes"
                className="border rounded w-full p-1"
              />
            </div>
          </div>
          {HAS_QUESTIONS_FIELD && (
            <div>
              <label className="block text-sm">Preguntas (JSON)</label>
              <textarea
                name="questions"
                className="border rounded w-full p-1"
                placeholder='[{"question":"...","options":["a"],"answer":0}]'
              />
            </div>
          )}
          <button
            type="submit"
            className="bg-blue-600 text-white px-3 py-1 rounded"
          >
            Agregar evaluación
          </button>
        </form>
      </section>
    </div>
  );
}
