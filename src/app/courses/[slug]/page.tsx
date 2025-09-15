// app/courses/[slug]/page.tsx
import CourseDashboard from '@/components/CourseDashboard';
import { auth } from '@/auth';
import { getCourseBySlugWithChapters, userHasAccessToCourse } from '@/lib/courseService';

export default async function CoursePage({ params }: { params: { slug: string } }) {
  const course = await getCourseBySlugWithChapters(params.slug);
  if (!course) return <div className="p-6">Curso no encontrado</div>;
  const session = await auth();
  const userId = session?.user?.id ? Number(session.user.id) : null;
  const hasAccess = userId ? await userHasAccessToCourse(userId, course.id) : false;
  if (!hasAccess) {
    return <div className="p-6">Acceso no autorizado. Inscríbete para ver el contenido.</div>;
  }
  return (
    <div className="p-6">
      <CourseDashboard course={course} />
    </div>
  );
}
