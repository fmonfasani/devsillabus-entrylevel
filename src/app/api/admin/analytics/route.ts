// src/app/api/admin/analytics/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import prisma from '@/lib/prisma';



export async function GET(request: NextRequest) {
  const session = await auth();
  
  if (!session?.user || (session.user as any).role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const [
      totalStudents,
      totalCourses,
      activeEnrollments,
      completedCourses,
      averageProgress
    ] = await Promise.all([
      db.user.count({ where: { role: 'STUDENT' } }),
      db.course.count({ where: { isActive: true } }),
      db.enrollment.count({ where: { isActive: true } }),
      db.enrollment.count({ where: { completedAt: { not: null } } }),
      db.chapterProgress.aggregate({
        _avg: {
          theoryScore: true,
          practiceScore: true
        }
      })
    ]);

    const completionRate = activeEnrollments > 0
      ? Math.round((completedCourses / activeEnrollments) * 100)
      : 0;

    const analytics = {
      totalStudents,
      totalCourses,
      activeEnrollments,
      completedCourses,
      completionRate,
      averageTheoryScore: Math.round(averageProgress._avg.theoryScore || 0),
      averagePracticeScore: Math.round(averageProgress._avg.practiceScore || 0)
    };

    return NextResponse.json(analytics);
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}