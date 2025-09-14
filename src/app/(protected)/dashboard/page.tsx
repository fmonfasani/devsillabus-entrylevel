import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import CourseCard from "@/components/CourseCard";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.email) redirect("/login");

  const me = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true, name: true, role: true },
  });
  if (!me) redirect("/login");

  // Mis cursos + progreso (para cualquier rol que esté inscrito)
  const myEnrollments = await prisma.enrollment.findMany({
    where: { userId: me.id },
    include: {
      course: {
        include: {
          chapters: {
            select: {
              id: true,
              progress: { where: { userId: me.id }, select: { status: true } },
            },
          },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const myCourses = myEnrollments.map((en) => {
    const chaptersCount = en.course.chapters.length;
    const completedCount = en.course.chapters.reduce(
      (acc, ch) => acc + (ch.progress.some((p) => p.status === "COMPLETED") ? 1 : 0),
      0
    );
    return {
      id: en.course.id,
      title: en.course.name,
      description: en.course.description,
      slug: en.course.slug,
      chaptersCount,
      completedCount,
    };
  });

  // Si es ADMIN, además listamos todos los cursos (con cantidades generales)
  let allCourses: {
    id: number;
    title: string;
    description?: string | null;
    slug: string;
    chaptersCount: number;
    completedCount: number; // para admin mostramos 0 (o podrías calcular por alumno específico)
  }[] = [];

  if (me.role === "ADMIN") {
    const courses = await prisma.course.findMany({
      include: { _count: { select: { chapters: true } } },
      orderBy: { createdAt: "desc" },
    });

    allCourses = courses.map((c) => ({
      id: c.id,
      title: c.name,
      description: c.description,
      slug: c.slug,
      chaptersCount: c._count.chapters,
      completedCount: 0,
    }));
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-600">Hola {me.name ?? "Alumno"} 👋</p>
        </div>
        <Link
          href="/api/auth/signout"
          className="rounded-lg border px-3 py-1.5 hover:bg-gray-50"
        >
          Logout
        </Link>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Tus cursos</h2>

        {myCourses.length === 0 ? (
          <p className="text-gray-600">
            No estás inscripto a ningún curso todavía.
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {myCourses.map((c) => (
              <CourseCard key={c.id} {...c} />
            ))}
          </div>
        )}
      </section>

      {me.role === "ADMIN" && (
        <section className="mt-10 space-y-4">
          <h2 className="text-xl font-semibold">Cursos (admin)</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {allCourses.map((c) => (
              <CourseCard key={c.id} {...c} />
            ))}
          </div>
          <div className="mt-4">
            <Link
              href="/admin"
              className="text-sm text-blue-600 underline hover:text-blue-700"
            >
              Ir al panel de administración →
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
