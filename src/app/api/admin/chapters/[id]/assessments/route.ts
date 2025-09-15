
// app/api/admin/chapters/[id]/assessments/route.ts
import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import prisma from '@/lib/prisma';

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  if (!session?.user || (session.user as any).role !== 'ADMIN') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  const chapterId = Number(params.id);
  if (isNaN(chapterId)) {
    return NextResponse.json({ error: 'Invalid chapter id' }, { status: 400 });
  }
  try {
    const {
      type,
      title,
      instructions,
      passingScore = 70,
      maxAttempts,
      timeLimitMinutes,
      questions,
    } = await req.json();
    if (!type || !title) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }
    const data: any = {
      chapterId,
      type,

      title,
      instructions,
      passingScore,
      maxAttempts,
      timeLimitMinutes,

    };
    const hasQuestions = (prisma as any).assessment?.fields?.questions !== undefined;
    if (hasQuestions && questions !== undefined) {
      data.questions = questions;
    }
    const assessment = await prisma.assessment.create({ data });
    return NextResponse.json(assessment, { status: 201 });
  } catch (error) {
    console.error('Error creating assessment', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }

}
