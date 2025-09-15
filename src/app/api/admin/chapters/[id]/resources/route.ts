// app/api/admin/chapters/[id]/resources/route.ts
import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { addChapterResource } from '@/lib/adminService';
import { resourceCreateSchema } from '@/schemas/admin';

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
  const parsed = resourceCreateSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ errors: parsed.error.flatten().fieldErrors }, { status: 400 });
  }
  const chapterId = Number(params.id);
  const resource = await addChapterResource(chapterId, parsed.data);
  return NextResponse.json(resource, { status: 201 });
}
