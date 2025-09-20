
// app/api/admin/chapters/[id]/assessments/route.ts
import { NextResponse } from 'next/server';
import { auth } from '@/auth';

import { assessmentCreateSchema } from '@/schemas/admin';
import { makeAddAssessment } from '@/modules/chapter/factories';

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth();

  const role = (session?.user as any)?.role;
  if (role !== 'ADMIN') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  const json = await req.json();
  const parsed = assessmentCreateSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ errors: parsed.error.flatten().fieldErrors }, { status: 400 });
  }
  const chapterId = Number(params.id);
  const addAssessmentUseCase = makeAddAssessment();
  const assessment = await addAssessmentUseCase.execute(chapterId, parsed.data);
  return NextResponse.json(assessment, { status: 201 });
}
