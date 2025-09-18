// app/api/courses/route.ts
import { NextResponse } from 'next/server';

import { makeListCourses } from '@/modules/course/factories';

export async function GET() {
  const listCourses = makeListCourses();
  const courses = await listCourses.execute();
  return NextResponse.json(courses);
}
