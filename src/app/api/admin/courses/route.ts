// app/api/admin/courses/route.ts
import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user || (session.user as any).role !== 'ADMIN') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  try {
    const { name, slug, description, type, level, initWeeks } = await req.json();
    if (!name || !slug || !type || !level) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }
    const course = await prisma.course.create({
      data: { name, slug, description, type, level },
    });
    if (initWeeks) {
      const chapters = Array.from({ length: 11 }).map((_, i) => ({
        courseId: course.id,
        weekNumber: i,
        title: `Week ${i}`,
        minScoreTheory: 0,
        minScorePractice: 0,
        isPublished: i === 0,
      }));
      await prisma.chapter.createMany({ data: chapters });
    }
    return NextResponse.json(course, { status: 201 });
  } catch (error) {
    console.error('Error creating course', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
