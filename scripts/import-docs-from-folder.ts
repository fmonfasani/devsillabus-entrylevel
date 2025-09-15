// scripts/import-docs-from-folder.ts
import fs from 'fs';
import path from 'path';
import { PrismaClient, ResourceType } from '@prisma/client';

const prisma = new PrismaClient();

// Config
const COURSE_SLUG = process.env.COURSE_SLUG ?? 'fullstack-entry';
const DOCS_DIR = process.env.DOCS_DIR ?? path.resolve(process.cwd(), 'docs');
const FS_COLLECTION = path.join(DOCS_DIR, 'collections', '_fullstack');
const H5P_PUBLIC_PREFIX = '/h5p';

const sleep = (ms:number)=> new Promise(r=>setTimeout(r, ms));
const firstH1 = (md:string) => (md.match(/^\s*#\s+(.+)$/m)?.[1]?.trim() ?? null);
function youtubeEmbeds(md: string): string[] {
  const urls = new Set<string>();
  const re1 = /https?:\/\/www\.youtube\.com\/embed\/[A-Za-z0-9_\-]+/g;
  const re2 = /https?:\/\/youtu\.be\/[A-Za-z0-9_\-]+/g;
  const re3 = /src="(https?:\/\/www\.youtube\.com\/embed\/[A-Za-z0-9_\-]+)"/g;
  for (const r of [re1, re2]) for (const m of md.match(r) ?? []) urls.add(m);
  let m; while ((m = re3.exec(md))) urls.add(m[1]);
  return [...urls];
}
const weekFromFilename = (name:string) => {
  const m = name.match(/^(\d{2})-/); return m ? parseInt(m[1],10) : null;
};

async function main() {
  const course = await prisma.course.findUnique({ where: { slug: COURSE_SLUG }, select: { id: true, name: true } });
  if (!course) throw new Error(`No existe curso con slug ${COURSE_SLUG}`);

  const files = fs.readdirSync(FS_COLLECTION).filter(f => f.endsWith('.md') && f !== 'index.md').sort();
  for (const file of files) {
    const week = weekFromFilename(file);
    if (week === null) { console.log(`Skip: ${file}`); continue; }

    const chapter = await prisma.chapter.findFirst({ where: { courseId: course.id, weekNumber: week }, select: { id: true } });
    if (!chapter) { console.log(`No hay capítulo week=${week} (crealo primero)`); continue; }

    const md = fs.readFileSync(path.join(FS_COLLECTION, file), 'utf8');
    const title = firstH1(md) ?? `Week ${week}`;

    const last = await prisma.chapterResource.findFirst({ where: { chapterId: chapter.id }, orderBy: { orderIndex: 'desc' }, select: { orderIndex: true } });
    await prisma.chapterResource.create({
      data: {
        chapterId: chapter.id,
        type: ResourceType.DOCUMENT,
        title,
        content: md,
        orderIndex: (last?.orderIndex ?? 0) + 1,
        isRequired: true,
      }
    });
    console.log(`+ DOCUMENT: week ${week} — ${title}`);

    for (const url of youtubeEmbeds(md)) {
      const last2 = await prisma.chapterResource.findFirst({ where: { chapterId: chapter.id }, orderBy: { orderIndex: 'desc' }, select: { orderIndex: true } });
      await prisma.chapterResource.create({
        data: {
          chapterId: chapter.id,
          type: ResourceType.VIDEO,
          title: `${title} — Video`,
          url,
          orderIndex: (last2?.orderIndex ?? 0) + 1,
          isRequired: false,
        }
      });
      console.log(`  + VIDEO: ${url}`); await sleep(30);
    }

    const h5pFolder = path.join(DOCS_DIR, 'h5p', `fs-${String(week).padStart(2,'0')}-quiz`);
    if (fs.existsSync(h5pFolder)) {
      const link = `${H5P_PUBLIC_PREFIX}/fs-${String(week).padStart(2,'0')}-quiz/`;
      const last3 = await prisma.chapterResource.findFirst({ where: { chapterId: chapter.id }, orderBy: { orderIndex: 'desc' }, select: { orderIndex: true } });
      await prisma.chapterResource.create({
        data: {
          chapterId: chapter.id,
          type: ResourceType.EXTERNAL_LINK,
          title: `${title} — Quiz (H5P)`,
          url: link,
          orderIndex: (last3?.orderIndex ?? 0) + 1,
          isRequired: false,
        }
      });
      console.log(`  + QUIZ link: ${link}`);
    }
  }
  console.log('Import terminado.');
}

main().catch(async (e) => { console.error(e); await prisma.$disconnect(); process.exit(1); })
       .finally(async () => { await prisma.$disconnect(); });
