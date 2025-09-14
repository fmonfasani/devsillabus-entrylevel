// src/app/api/admin/courses/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import prisma from '@/lib/prisma';

const db = prisma as any;

export async function GET(request: NextRequest) {
  const session = await auth();
  
  if (!session?.user || (session.user as any).role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const level = searchParams.get('level');
    const search = searchParams.get('search');

    const where: any = {};
    if (type && type !== 'ALL') where.type = type;
    if (level && level !== 'ALL') where.level = level;
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { slug: { contains: search, mode: 'insensitive' } }
      ];
    }

    const courses = await db.course.findMany({
      where,
      include: {
        chapters: {
          select: { id: true }
        },
        enrollments: {
          where: { isActive: true },
          select: { id: true }
        },
        _count: {
          select: {
            chapters: true,
            enrollments: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    const coursesWithStats = await Promise.all(
      courses.map(async (course: any) => {
        // Calcular tasa de completación
        const totalEnrollments = course.enrollments.length;
        let completionRate = 0;
        
        if (totalEnrollments > 0) {
          const completedEnrollments = await db.enrollment.count({
            where: {
              courseId: course.id,
              isActive: true,
              completedAt: { not: null }
            }
          });
          completionRate = Math.round((completedEnrollments / totalEnrollments) * 100);
        }

        return {
          ...course,
          enrollments: totalEnrollments,
          completionRate,
          chapters: course._count.chapters
        };
      })
    );

    return NextResponse.json(coursesWithStats);
  } catch (error) {
    console.error('Error fetching courses:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const session = await auth();
  
  if (!session?.user || (session.user as any).role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await request.json();
    const { name, slug, description, type, level, durationWeeks, startDate, endDate } = data;

    const course = await db.course.create({
      data: {
        name,
        slug,
        description,
        type,
        level,
        durationWeeks: parseInt(durationWeeks),
        startDate: startDate ? new Date(startDate) : null,
        endDate: endDate ? new Date(endDate) : null
      }
    });

    return NextResponse.json(course, { status: 201 });
  } catch (error) {
    console.error('Error creating course:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

