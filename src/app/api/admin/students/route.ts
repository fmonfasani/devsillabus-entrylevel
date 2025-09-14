
// src/app/api/admin/students/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import prisma from '@/lib/prisma';



export async function GET(request: NextRequest) {
  const session = await auth();
  
  if (!session?.user || (session.user as any).role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const courseId = searchParams.get('courseId');

    const where: any = { role: 'STUDENT' };
    
    const students = await db.user.findMany({
      where,
      include: {
        enrollments: {
          where: courseId ? { courseId: parseInt(courseId) } : undefined,
          include: {
            course: {
              select: { id: true, name: true, slug: true }
            }
          }
        },
        chapterProgress: {
          include: {
            chapter: {
              select: { id: true, title: true, courseId: true }
            }
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    const studentsWithStats = students.map((student: any) => {
      const totalProgress = student.chapterProgress.length;
      const completedProgress = student.chapterProgress.filter((p: any) => p.status === 'COMPLETED').length;
      const progressPercentage = totalProgress > 0 ? Math.round((completedProgress / totalProgress) * 100) : 0;
      
      return {
        ...student,
        progressPercentage,
        totalChapters: totalProgress,
        completedChapters: completedProgress,
        lastAccess: student.chapterProgress.length > 0 
          ? student.chapterProgress.sort((a: any, b: any) =>
              new Date(b.lastAccessed || b.startedAt || '').getTime() -
              new Date(a.lastAccessed || a.startedAt || '').getTime()
            )[0]?.lastAccessed || student.chapterProgress[0]?.startedAt
          : null
      };
    });

    return NextResponse.json(studentsWithStats);
  } catch (error) {
    console.error('Error fetching students:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

