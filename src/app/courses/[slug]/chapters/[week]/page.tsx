// app/courses/[slug]/chapters/[week]/page.tsx
import { auth } from "@/auth";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { makeFindUserByEmail, makeGetEnrollment } from "@/modules/enrollment/factories";
import { makeGetCourseDetail } from "@/modules/course/factories";
import { makeGetChapterForCourse } from "@/modules/chapter/factories";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";

// permitir iframes de YouTube
const markdownSchema: any = {
  ...defaultSchema,
  tagNames: [ ...((defaultSchema as any).tagNames ?? []), "iframe" ],
  attributes: {
    ...((defaultSchema as any).attributes ?? {}),
    iframe: ["src","width","height","allow","allowfullscreen","frameborder"],
  },
};

// limpia front-matter + sintaxis Jekyll
function normalizeMarkdown(md: string) {
  let out = md;

  // 1) front-matter --- ... ---
  out = out.replace(/^---[\r\n]+[\s\S]*?---\r?\n?/,"");

  // 2) líneas sueltas de metadatos (por si vinieron sin ---)
  out = out.replace(/^(?:\s*(?:redirect_from|layout|title|parent|nav_order):.*\r?\n)+/m, "");

  // 3) elimina bloques <details>...</details> (toc)
  out = out.replace(/<details[\s\S]*?<\/details>/gi, "");

  // 4) quita atributos Jekyll inline: {: .no_toc } / {: .text-delta } / {:toc}
  out = out.replace(/\s*\{:\s*[^}]+\}/g, "");

  return out.trim();
}

export default async function ChapterPage({
  params: { slug, week },
}: { params: { slug: string; week: string } }) {
  const w = Number(week);
  const session = await auth();
  if (!session?.user?.email) redirect("/login");

  const findUserByEmail = makeFindUserByEmail();
  const getCourseDetail = makeGetCourseDetail();
  const getEnrollment = makeGetEnrollment();
  const getChapterForCourse = makeGetChapterForCourse();

  const user = await findUserByEmail.execute(session.user.email);
  if (!user) redirect("/login");

  const detail = await getCourseDetail.execute(slug);
  if (!detail) return notFound();

  const enrollment = await getEnrollment.execute(user.id, detail.course.id!);
  if (user.role !== "ADMIN" && !enrollment) redirect("/dashboard");

  const chapter = await getChapterForCourse.execute(detail.course.id!, w);
  if (!chapter) return notFound();
  if (!chapter.isPublished && user.role !== "ADMIN") redirect(`/courses/${slug}`);

  const course = {
    ...detail.course.toJSON(),
  };

  return (
    <div className="mx-auto max-w-5xl px-6 py-8">
      <h1 className="text-2xl font-bold">
        {course.name} · Week {chapter.weekNumber}
      </h1>
      <p className="text-gray-600">{chapter.title}</p>

      {/* Recursos */}
      <section className="mt-6">
        <h2 className="mb-2 text-lg font-semibold">Recursos</h2>
        <div className="space-y-3">
          {chapter.resources.length === 0 && (
            <p className="text-gray-500">Sin recursos.</p>
          )}

          {chapter.resources.map((r) => (
            <div key={r.id} className="rounded border p-3">
              <div className="text-sm text-gray-500">{r.type}</div>
              <div className="font-medium">{r.title}</div>

              {r.type === "VIDEO" && r.url && (
                <div className="relative mt-2 overflow-hidden rounded" style={{ paddingBottom: "56.25%" }}>
                  <iframe
                    src={r.url}
                    title={r.title}
                    className="absolute left-0 top-0 h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )}

              {r.type === "DOCUMENT" && r.content && (
                <div className="prose mt-2 max-w-none">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw, [rehypeSanitize, markdownSchema]]}
                  >
                    {normalizeMarkdown(r.content)}
                  </ReactMarkdown>
                </div>
              )}

              {r.type !== "VIDEO" && !r.content && r.url && (
                <a className="text-blue-600 underline" href={r.url} target="_blank" rel="noreferrer">
                  Abrir recurso
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Evaluaciones */}
      <section className="mt-8">
        <h2 className="mb-2 text-lg font-semibold">Evaluaciones</h2>
        <div className="space-y-3">
          {chapter.assessments.length === 0 && (
            <p className="text-gray-500">Sin evaluaciones.</p>
          )}
          {chapter.assessments.map((a) => (
            <div key={a.id} className="rounded border p-3">
              <div className="text-sm text-gray-500">{a.type}</div>
              <div className="font-medium">{a.title}</div>
              {a.instructions && (
                <p className="mt-1 text-sm text-gray-700">{a.instructions}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      <div className="mt-8">
        <Link href={`/courses/${course.slug}`} className="text-sm text-blue-600 underline">
          ← Volver al curso
        </Link>
      </div>
    </div>
  );
}
