import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect, notFound } from "next/navigation";
import QuizRunner from "./runner";

export default async function QuizPage({ params:{ chapterId } }: { params:{ chapterId:string } }) {
  const session = await auth();
  if (!session?.user?.email) redirect("/login");

  const chapter = await prisma.chapter.findUnique({
    where: { id: Number(chapterId) },
    include: {
      course: { select: { id:true, slug:true, name:true } },
      assessments: true
    }
  });
  if (!chapter) return notFound();

  const quiz = chapter.assessments.find(a => a.type === "QUIZ");
  if (!quiz) return notFound();

  return (
    <div className="mx-auto max-w-3xl px-6 py-8">
      <h1 className="text-2xl font-bold">{chapter.course.name} · Quiz semana {chapter.weekNumber}</h1>
      <p className="text-gray-600">{quiz.title}</p>
      <QuizRunner quiz={quiz} chapterId={chapter.id} />
    </div>
  );
}
