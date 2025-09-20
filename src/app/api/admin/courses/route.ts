// app/api/admin/courses/route.ts
import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { courseCreateSchema } from '@/schemas/admin';
import { makeCreateCourse } from '@/modules/course/factories';
import { makeCreateChaptersRange } from '@/modules/chapter/factories';

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
  const createCourseUseCase = makeCreateCourse();
  const createChaptersRangeUseCase = makeCreateChaptersRange();

  const course = await createCourseUseCase.execute(data);
  if (initWeeks) {
    await createChaptersRangeUseCase.execute(course.id!, 0, 10);
  }
  return NextResponse.json(course.toJSON(), { status: 201 });
}

