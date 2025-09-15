// app/api/courses/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const courses = await prisma.course.findMany({
      select: { id: true, name: true, slug: true },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(courses);
  } catch (error) {
    console.error('Error fetching courses', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
