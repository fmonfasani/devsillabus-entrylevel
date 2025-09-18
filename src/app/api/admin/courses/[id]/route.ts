// src/app/api/admin/courses/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { makeGetAdminCourseDetail, makeUpdateCourse } from '@/modules/course/factories';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  
  if (!session?.user || (session.user as any).role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const courseId = parseInt(params.id);

    const getCourseDetail = makeGetAdminCourseDetail();
    const detail = await getCourseDetail.execute(courseId);

    if (!detail) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }

    return NextResponse.json({
      course: detail.course.toJSON(),
      chapters: detail.chapters,
      enrollments: detail.enrollments,
    });
  } catch (error) {
    console.error('Error fetching course:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  
  if (!session?.user || (session.user as any).role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const courseId = parseInt(params.id);
    const data = await request.json();
    
    const updateCourse = makeUpdateCourse();
    const payload = {
      ...data,
      durationWeeks: data.durationWeeks ? Number(data.durationWeeks) : null,
      startDate: data.startDate ? new Date(data.startDate) : null,
      endDate: data.endDate ? new Date(data.endDate) : null,
    };

    const course = await updateCourse.execute(courseId, payload);

    return NextResponse.json(course.toJSON());
  } catch (error) {
    console.error('Error updating course:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

