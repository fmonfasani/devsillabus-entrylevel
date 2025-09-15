// app/(admin)/admin/page.tsx
import CreateCourseModal from '@/components/CreateCourseModal';
import { listCourses } from '@/lib/courseService';
import { getCourseWithChapters, addChapterResource, addAssessment } from '@/lib/adminService';
import { ResourceType, AssessmentType } from '@prisma/client';

export default async function AdminPage() {
  const basic = await listCourses();
  const courses = await Promise.all(basic.map((c) => getCourseWithChapters(c.id)));

  async function createResource(formData: FormData) {
    'use server';
    const chapterId = Number(formData.get('chapterId'));
    const type = formData.get('type') as ResourceType;
    const title = formData.get('title') as string;
    const url = (formData.get('url') as string) || undefined;
    const content = (formData.get('content') as string) || undefined;
    const isRequired = formData.get('isRequired') === 'on';
    await addChapterResource(chapterId, { type, title, url, content, isRequired });
  }

  async function createAssessment(formData: FormData) {
    'use server';
    const chapterId = Number(formData.get('chapterId'));
    const type = formData.get('type') as AssessmentType;
    const title = formData.get('title') as string;
    const instructions = (formData.get('instructions') as string) || undefined;
    const passingScore = Number(formData.get('passingScore') || 70);
    const maxAttemptsRaw = formData.get('maxAttempts') as string | null;
    const timeLimitRaw = formData.get('timeLimitMinutes') as string | null;
    const maxAttempts = maxAttemptsRaw ? Number(maxAttemptsRaw) : undefined;
    const timeLimitMinutes = timeLimitRaw ? Number(timeLimitRaw) : undefined;
    await addAssessment(chapterId, {
      type,
      title,
      instructions,
      passingScore,
      maxAttempts,
      timeLimitMinutes,
    });
  }

  return (
    <div className="p-6 space-y-8">
      <section>
        <h1 className="text-2xl font-bold mb-2">Panel Admin</h1>
        <CreateCourseModal />
      </section>

      <section id="resource" className="space-y-2">
        <h2 className="text-lg font-semibold">Agregar recurso a capítulo</h2>
        <form action={createResource} className="space-y-2">
          <select name="chapterId" className="w-full border p-1">
            {courses.flatMap((c) =>
              c?.chapters.map((ch) => (
                <option key={ch.id} value={ch.id}>
                  {c?.name} - Semana {ch.weekNumber}
                </option>
              ))
            )}
          </select>
          <select name="type" className="w-full border p-1">
            {Object.values(ResourceType).map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <input name="title" placeholder="Título" className="w-full border p-1" />
          <input name="url" placeholder="URL" className="w-full border p-1" />
          <textarea name="content" placeholder="Contenido" className="w-full border p-1" />
          <label className="flex items-center space-x-2 text-sm">
            <input type="checkbox" name="isRequired" />
            <span>Requerido</span>
          </label>
          <button type="submit" className="px-2 py-1 bg-blue-600 text-white rounded">
            Guardar
          </button>
        </form>
      </section>

      <section id="assessment" className="space-y-2">
        <h2 className="text-lg font-semibold">Agregar evaluación</h2>
        <form action={createAssessment} className="space-y-2">
          <select name="chapterId" className="w-full border p-1">
            {courses.flatMap((c) =>
              c?.chapters.map((ch) => (
                <option key={ch.id} value={ch.id}>
                  {c?.name} - Semana {ch.weekNumber}
                </option>
              ))
            )}
          </select>
          <select name="type" className="w-full border p-1">
            {Object.values(AssessmentType).map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <input name="title" placeholder="Título" className="w-full border p-1" />
          <textarea name="instructions" placeholder="Instrucciones" className="w-full border p-1" />
          <input
            name="passingScore"
            type="number"
            defaultValue={70}
            className="w-full border p-1"
          />
          <input
            name="maxAttempts"
            type="number"
            placeholder="Intentos máximos"
            className="w-full border p-1"
          />
          <input
            name="timeLimitMinutes"
            type="number"
            placeholder="Tiempo (min)"
            className="w-full border p-1"
          />
          <textarea
            name="questions"
            placeholder="Preguntas JSON (opcional)"
            className="w-full border p-1"
          />
          <button type="submit" className="px-2 py-1 bg-blue-600 text-white rounded">
            Guardar
          </button>
        </form>
      </section>
    </div>
  );
}
