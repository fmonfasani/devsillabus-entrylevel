// app/(admin)/admin/courses/[id]/page.tsx
import { getCourseWithChapters } from '@/lib/adminService';
import Link from 'next/link';

export default async function AdminCourseDetail({ params }: { params: { id: string } }) {
  const course = await getCourseWithChapters(Number(params.id));
  if (!course) return <div className="p-6">Curso no encontrado</div>;
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">{course.name}</h1>
      {course.description && <p>{course.description}</p>}
      <Link href={`/admin/courses/${course.id}/chapters`} className="text-blue-600 underline">
        Chapters
      </Link>
    </div>
  );
}
