import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";

export default async function CoursePage({ params }: { params: { slug: string } }) {
  const session = await auth();
  if (!session?.user?.email) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true, role: true },
  });
  if (!user) redirect("/login");

  // Permitir ver si está inscrito o si es admin
  const course = await prisma.course.findUnique({
    where: { slug: params.slug },
    include: {
      chapters: {
        orderBy: { weekNumber: "asc" },
        include: {
          progress: { where: { userId: user.id } },
        },
      },
      enrollments: { where: { userId: user.id } },
    },
  });
  if (!course) notFound();

  const allowed = user.role === "ADMIN" || course.enrollments.length > 0;
  if (!allowed) redirect("/dashboard");

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <h1 className="text-3xl font-bold">{course.name}</h1>
      {course.description && <p className="mt-2 text-gray-700">{course.description}</p>}

      <h2 className="mt-6 text-xl font-semibold">Contenido</h2>
      <ol className="mt-2 space-y-3">
        {course.chapters.map((ch) => {
          const status = ch.progress[0]?.status ?? "AVAILABLE";
          return (
            <li key={ch.id} className="rounded-lg border p-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-500">Semana {ch.weekNumber}</div>
                  <div className="font-medium">{ch.title}</div>
                </div>
                <span className="text-xs rounded bg-gray-100 px-2 py-1">{status}</span>
              </div>
              {ch.description && <p className="mt-1 text-sm text-gray-600">{ch.description}</p>}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
