import { auth } from "@/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import SignOutButton from "@/components/SignOutButton";

export const dynamic = "force-dynamic"; // evita cacheo en dev

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.email) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { email: session.user.email! },
    include: { enrollments: true },
  });
  if (!user) redirect("/login");

  // Traemos enrollments con cursos+capítulos
  const enrollments = await prisma.enrollment.findMany({
    where: { userId: user.id },
    include: {
      course: {
        include: { chapters: { orderBy: { weekNumber: "asc" } } },
      },
    },
  });

  // Progreso por capítulos del usuario (de todos los cursos en los que está)
  const courseIds = enrollments.map((e) => e.courseId);
  const progresses = await prisma.chapterProgress.findMany({
    where: { userId: user.id, chapter: { courseId: { in: courseIds } } },
    include: { chapter: true },
  });

  return (
    <div style={{ padding: 24, maxWidth: 900, margin: "0 auto" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h1 style={{ fontSize: 28, fontWeight: 700 }}>Dashboard</h1>
        <SignOutButton />
      </header>

      <section style={{ marginBottom: 24 }}>
        <p style={{ opacity: 0.8 }}>
          Hola <strong>{user.name ?? user.email}</strong> 👋
        </p>
        <p style={{ opacity: 0.8 }}>
          Estás inscripto en <strong>{enrollments.length}</strong> curso(s).
        </p>
      </section>

      <div style={{ display: "grid", gap: 16 }}>
        {enrollments.map((enr) => {
          const total = enr.course.chapters.length;
          const completed = progresses.filter(
            (p) => p.chapter.courseId === enr.courseId && p.status === "COMPLETED"
          ).length;

          const nextChapter = enr.course.chapters.find((ch) =>
            progresses.some(
              (p) =>
                p.chapterId === ch.id &&
                (p.status === "AVAILABLE" || p.status === "IN_PROGRESS")
            )
          );

          return (
            <div
              key={enr.id}
              style={{
                border: "1px solid #e5e7eb",
                borderRadius: 12,
                padding: 16,
              }}
            >
              <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>
                {enr.course.name}
              </h2>
              <p style={{ marginBottom: 12, opacity: 0.85 }}>
                {enr.course.description ?? "Sin descripción"}
              </p>

              <div style={{ marginBottom: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14 }}>
                  <span>Progreso</span>
                  <span>
                    {completed}/{total} capítulos
                  </span>
                </div>
                <div style={{ height: 10, background: "#f3f4f6", borderRadius: 999, overflow: "hidden" }}>
                  <div
                    style={{
                      width: total ? `${(completed / total) * 100}%` : "0%",
                      height: "100%",
                      background: "#2563eb",
                    }}
                  />
                </div>
              </div>

              <div style={{ fontSize: 14, opacity: 0.9 }}>
                {nextChapter ? (
                  <>
                    Siguiente capítulo: <strong>Semana {nextChapter.weekNumber}</strong> — {nextChapter.title}
                  </>
                ) : total > 0 ? (
                  <strong>¡Curso completado o bloqueado por ahora!</strong>
                ) : (
                  <em>Este curso aún no tiene capítulos.</em>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
