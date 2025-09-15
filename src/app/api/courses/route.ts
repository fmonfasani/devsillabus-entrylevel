// app/api/courses/route.ts
import { NextResponse } from 'next/server';

import { listCourses } from '@/lib/courseService';

export async function GET() {
  const courses = await listCourses();
  return NextResponse.json(courses);

}
