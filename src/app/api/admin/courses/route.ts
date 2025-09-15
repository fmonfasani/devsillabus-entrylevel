// app/api/admin/courses/route.ts
import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { createCourse, createChaptersRange } from '@/lib/adminService';
import { courseCreateSchema } from '@/schemas/admin';

export async function POST(req: Request) {
  const session = await auth();

  const role = (session?.user as any)?.role;
  if (role !== 'ADMIN') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  const json = await req.json();
  const parsed = courseCreateSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ errors: parsed.error.flatten().fieldErrors }, { status: 400 });
  }
  const { initWeeks, ...data } = parsed.data;
  const course = await createCourse(data);
  if (initWeeks) {
    await createChaptersRange(course.id);

  }
  return NextResponse.json(course, { status: 201 });
}

