import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { AssessmentType } from "@prisma/client";

async function requireAdmin() {
  const s = await auth();
  if (!s?.user?.email) return null;
  const me = await prisma.user.findUnique({ where: { email: s.user.email }, select: { role: true } });
  return me?.role === "ADMIN";
}

export async function POST(req: Request, { params }: { params: { id: string } }) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const chapterId = Number(params.id);
  const body = await req.json();
  const {
    type,                // "QUIZ" | "LAB"
    title,
    instructions = null,
    passingScore = 70,
    maxAttempts = null,
    timeLimitMinutes = null,
    questions = null     // Json opcional si agregaste el campo
  } = body;

  if (!chapterId || !type || !title) {
    return NextResponse.json({ error: "chapterId, type, title requeridos" }, { status: 400 });
  }

  const a = await prisma.assessment.create({
    data: {
      chapterId,
      type: type as AssessmentType,
      title,
      instructions,
      passingScore,
      maxAttempts,
      timeLimitMinutes,
      ...(questions ? { questions } : {}),
    },
  });

  return NextResponse.json(a, { status: 201 });
}
