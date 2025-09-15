// app/(admin)/admin/courses/[id]/page.tsx

import Link from 'next/link';
import prisma from '@/lib/prisma';

interface PageProps {
  params: { id: string };
}

export default async function CourseDetailPage({ params }: PageProps) {
  const courseId = Number(params.id);
  const course = await prisma.course.findUnique({
    where: { id: courseId },
    include: { chapters: { include: { resources: true, assessments: true } } },
  });

  if (!course) {
    return <div className="p-6">Curso no encontrado</div>;
  }

  const chaptersCount = course.chapters.length;
  const resourcesCount = course.chapters.reduce(
    (acc, ch) => acc + ch.resources.length,
    0
  );
  const assessmentsCount = course.chapters.reduce(
    (acc, ch) => acc + ch.assessments.length,
    0
  );

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">{course.name}</h1>
      <p>{course.description}</p>
      <Link
        href={`/admin/courses/${course.id}/chapters`}
        className="inline-block bg-blue-600 text-white px-4 py-2 rounded"
      >
        Administrar capítulos
      </Link>
      <div className="border rounded p-4 max-w-sm">
        <p>Capítulos: {chaptersCount}</p>
        <p>Recursos: {resourcesCount}</p>
        <p>Evaluaciones: {assessmentsCount}</p>
      </div>

    </div>
  );
}
