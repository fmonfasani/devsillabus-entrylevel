// app/api/admin/chapters/[id]/resources/route.ts
import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import prisma from '@/lib/prisma';

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  if (!session?.user || (session.user as any).role !== 'ADMIN') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  const chapterId = Number(params.id);
  if (isNaN(chapterId)) {
    return NextResponse.json({ error: 'Invalid chapter id' }, { status: 400 });
  }
  try {
    const { type, title, url, content, isRequired } = await req.json();
    if (!type || !title) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }
    const last = await prisma.chapterResource.findFirst({
      where: { chapterId },
      orderBy: { orderIndex: 'desc' },
    });
    const orderIndex = last ? last.orderIndex + 1 : 1;
    const resource = await prisma.chapterResource.create({
      data: {
        chapterId,
        type,
        title,
        url,
        content,
        isRequired: Boolean(isRequired),
        orderIndex,
      },
    });
    return NextResponse.json(resource, { status: 201 });
  } catch (error) {
    console.error('Error creating resource', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
