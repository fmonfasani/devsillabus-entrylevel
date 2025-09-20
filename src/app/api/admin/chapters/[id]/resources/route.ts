
// app/api/admin/chapters/[id]/resources/route.ts
import { NextResponse } from 'next/server';
import { auth } from '@/auth';

import { resourceCreateSchema } from '@/schemas/admin';
import { z } from 'zod';
import { makeAddChapterResource } from '@/modules/chapter/factories';
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
  const schema = resourceCreateSchema.extend({
    videoId: z.string().optional(),
    thumbnail: z.string().url().optional(),
    embedUrl: z.string().url().optional(),
    isYouTube: z.boolean().optional(),
  });
  const parsed = schema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ errors: parsed.error.flatten().fieldErrors }, { status: 400 });
  }
  const chapterId = Number(params.id);
  const addChapterResourceUseCase = makeAddChapterResource();
  const resource = await addChapterResourceUseCase.execute(chapterId, parsed.data);
  return NextResponse.json(resource, { status: 201 });

}
