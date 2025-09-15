// app/api/courses/[id]/chapters/route.ts
import { NextResponse } from 'next/server';

import { listChaptersByCourseId } from '@/lib/courseService';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const courseId = Number(params.id);
  const chapters = await listChaptersByCourseId(courseId);
  return NextResponse.json(chapters);

}
