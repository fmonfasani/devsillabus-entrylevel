// src/app/api/admin/courses/[id]/chapters/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import prisma from '@/lib/prisma';

const db = prisma as any;

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
    
    const chapters = await db.chapter.findMany({
      where: { courseId },
      orderBy: { weekNumber: 'asc' },
      include: {
        resources: {
          orderBy: { orderIndex: 'asc' }
        },
        assessments: true,
        progress: {
          include: {
            user: {
              select: { id: true, name: true, email: true }
            }
          }
        }
      }
    });

    return NextResponse.json(chapters);
  } catch (error) {
    console.error('Error fetching chapters:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(
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
    
    const chapter = await db.chapter.create({
      data: {
        ...data,
        courseId,
        weekNumber: parseInt(data.weekNumber),
        minScoreTheory: data.minScoreTheory ? parseInt(data.minScoreTheory) : 80,
        minScorePractice: data.minScorePractice ? parseInt(data.minScorePractice) : 80,
        unlockDate: data.unlockDate ? new Date(data.unlockDate) : null
      }
    });

    return NextResponse.json(chapter, { status: 201 });
  } catch (error) {
    console.error('Error creating chapter:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
