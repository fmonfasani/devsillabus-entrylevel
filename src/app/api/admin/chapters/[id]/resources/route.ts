import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { ResourceType } from "@prisma/client";

async function requireAdmin() {
  const s = await auth();
  if (!s?.user?.email) return null;
  const me = await prisma.user.findUnique({ where: { email: s.user.email }, select: { role: true } });
  return me?.role === "ADMIN";
}

export async function POST(req: Request, { params }: { params: { id: string } }) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const chapterId = Number(params.id);
  const { type, title, url, content, isRequired = false } = await req.json();
  if (!chapterId || !type || !title) {
    return NextResponse.json({ error: "chapterId, type, title requeridos" }, { status: 400 });
  }

  // calcular siguiente orderIndex (único por capítulo)
  const last = await prisma.chapterResource.findFirst({
    where: { chapterId },
    orderBy: { orderIndex: "desc" },
    select: { orderIndex: true },
  });
  const orderIndex = (last?.orderIndex ?? 0) + 1;

  const res = await prisma.chapterResource.create({
    data: {
      chapterId,
      type: type as ResourceType,
      title,
      url: url ?? null,
      content: content ?? null,
      orderIndex,
      isRequired,
    },
  });

  return NextResponse.json(res, { status: 201 });
}
