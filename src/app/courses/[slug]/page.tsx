// app/courses/[slug]/page.tsx
import { auth } from "@/auth";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { makeFindUserByEmail, makeGetEnrollment } from "@/modules/enrollment/factories";
import { makeGetCourseDetail } from "@/modules/course/factories";

export default async function CoursePage({ params: { slug } }: { params: { slug: string } }) {
  const session = await auth();
  if (!session?.user?.email) redirect("/login");

  const findUserByEmail = makeFindUserByEmail();
  const getCourseDetail = makeGetCourseDetail();
  const getEnrollment = makeGetEnrollment();

  const user = await findUserByEmail.execute(session.user.email);
  if (!user) redirect("/login");

  const detail = await getCourseDetail.execute(slug);
  if (!detail) return notFound();

  const enrollment = await getEnrollment.execute(user.id, detail.course.id!);
  if (user.role !== "ADMIN" && !enrollment) redirect("/dashboard");

  const course = {
    ...detail.course.toJSON(),
    chapters: detail.chapters,
  };

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
