// app/courses/[slug]/page.tsx
import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

export default async function CoursePage({ params: { slug } }: { params: { slug: string } }) {
  const session = await auth();
  if (!session?.user?.email) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true, role: true },
  });

  const course = await prisma.course.findUnique({
    where: { slug },
    include: { chapters: { orderBy: { weekNumber: "asc" } } },
  });
  if (!course) return notFound();

  const enrolled = await prisma.enrollment.findUnique({
    where: { userId_courseId: { userId: user!.id, courseId: course.id } },
  });
  if (user?.role !== "ADMIN" && !enrolled) redirect("/dashboard");

  return (
    <div className="mx-auto max-w-5xl px-6 py-8">
      <h1 className="text-2xl font-bold">{course.name}</h1>
      <p className="text-gray-600">Programa de {course.durationWeeks ?? 11} semanas</p>

      <div className="mt-6 space-y-2">
        {course.chapters.map((ch) => {
          const disabled = !ch.isPublished && user?.role !== "ADMIN";
          return (
            <Link
              key={ch.id}
              href={disabled ? "#" : `/courses/${course.slug}/chapters/${ch.weekNumber}`}
              className={`block rounded border px-3 py-2 ${disabled ? "pointer-events-none opacity-50" : "hover:bg-gray-50"}`}
            >
              <span>Semana {ch.weekNumber}: {ch.title}</span>
              {!ch.isPublished && user?.role === "ADMIN" && (
                <em className="ml-2 text-xs text-orange-500">(no publicada)</em>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
