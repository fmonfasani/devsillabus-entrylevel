// app/(admin)/admin/courses/page.tsx
import { listCourses } from '@/lib/courseService';
import Link from 'next/link';

export default async function AdminCoursesPage() {
  const courses = await listCourses();
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Cursos</h1>
      <ul className="space-y-2">
        {courses.map((c) => (
          <li key={c.id} className="border p-2 rounded">
            <Link href={`/admin/courses/${c.id}`} className="text-blue-600 underline">
              {c.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
