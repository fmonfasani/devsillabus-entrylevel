// app/(admin)/admin/courses/[id]/chapters/page.tsx
import { getCourseWithChapters } from '@/lib/adminService';
import Link from 'next/link';
import CreateChapterModal from '@/components/CreateChapterModal';

export default async function AdminCourseChapters({ params }: { params: { id: string } }) {
  const course = await getCourseWithChapters(Number(params.id));
  if (!course) return <div className="p-6">Curso no encontrado</div>;
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">{course.name} - Capítulos</h1>
      <CreateChapterModal courseId={course.id} nextWeekNumber={course.chapters.length} />
      <ul className="space-y-2">
        {course.chapters.map((ch) => (
          <li key={ch.id} className="border p-2 rounded flex justify-between items-center">
            <span>
              Semana {ch.weekNumber}: {ch.title}
            </span>
            <span className="space-x-2 text-sm">
              <Link href={`/admin?courseId=${course.id}&chapterId=${ch.id}#resource`} className="text-blue-600">
                +Resource
              </Link>
              <Link href={`/admin?courseId=${course.id}&chapterId=${ch.id}#assessment`} className="text-green-600">
                +Assessment
              </Link>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
