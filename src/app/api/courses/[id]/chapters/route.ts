// app/api/courses/[id]/chapters/route.ts
import { NextResponse } from 'next/server';

import { makeListCourseChapters } from '@/modules/chapter/factories';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const courseId = Number(params.id);
  const listCourseChapters = makeListCourseChapters();
  const chapters = await listCourseChapters.execute(courseId);
  return NextResponse.json(chapters);
}
