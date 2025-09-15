// app/(student)/dashboard/page.tsx
import { auth } from '@/auth';
import { listMyEnrollments } from '@/lib/courseService';
import Link from 'next/link';

export default async function StudentDashboard() {
  const session = await auth();
  if (!session?.user?.id) return <div className="p-6">No autenticado</div>;
  const enrollments = await listMyEnrollments(Number(session.user.id));
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Mis Cursos</h1>
      <ul className="space-y-2">
        {enrollments.map((e) => (
          <li key={e.id} className="border p-2 rounded">
            <Link href={`/courses/${e.course.slug}`} className="text-blue-600 underline">
              {e.course.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
