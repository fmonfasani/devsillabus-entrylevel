// app/api/courses/[id]/chapters/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const courseId = Number(params.id);
  if (isNaN(courseId)) {
    return NextResponse.json({ error: 'Invalid course id' }, { status: 400 });
  }
  try {
    const chapters = await prisma.chapter.findMany({
      where: { courseId },
      orderBy: { weekNumber: 'asc' },
      select: { id: true, weekNumber: true, title: true },
    });
    return NextResponse.json(chapters);
  } catch (error) {
    console.error('Error fetching chapters', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
