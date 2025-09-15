// lib/adminService.ts
import prisma from "@/lib/prisma";
import { CourseType, CourseLevel, ResourceType, AssessmentType } from "@prisma/client";

type CourseDto = {
  name: string;
  slug: string;
  description?: string;
  type: CourseType;
  level: CourseLevel;
};

type ResourceDto = {
  type: ResourceType;
  title: string;
  url?: string;
  content?: string;
  isRequired?: boolean;
};

type AssessmentDto = {
  type: AssessmentType;
  title: string;
  instructions?: string;
  passingScore?: number;
  maxAttempts?: number;
  timeLimitMinutes?: number;
  questions?: any[];
};

export function createCourse(dto: CourseDto) {
  return prisma.course.create({ data: dto });
}

export async function createChaptersRange(courseId: number, from = 0, to = 10) {
  const data = [] as any[];
  for (let i = from; i <= to; i++) {
    data.push({
      courseId,
      weekNumber: i,
      title: `Week ${i}`,
      minScoreTheory: 0,
      minScorePractice: 0,
    });
  }
  await prisma.chapter.createMany({ data });
  return prisma.chapter.findMany({ where: { courseId }, orderBy: { weekNumber: "asc" } });
}

export async function addChapterResource(chapterId: number, dto: ResourceDto) {
  const last = await prisma.chapterResource.findFirst({
    where: { chapterId },
    orderBy: { orderIndex: "desc" },
  });
  const orderIndex = last ? last.orderIndex + 1 : 1;
  return prisma.chapterResource.create({ data: { ...dto, chapterId, orderIndex, isRequired: dto.isRequired ?? false } });
}

export function addAssessment(chapterId: number, dto: AssessmentDto) {
  return prisma.assessment.create({
    data: {
      chapterId,
      type: dto.type,
      title: dto.title,
      instructions: dto.instructions,
      maxAttempts: dto.maxAttempts,
      timeLimitMinutes: dto.timeLimitMinutes,
      passingScore: dto.passingScore ?? 70,
    },
  });
}

export function getCourseWithChapters(courseId: number) {
  return prisma.course.findUnique({
    where: { id: courseId },
    include: {
      chapters: { include: { resources: true, assessments: true }, orderBy: { weekNumber: "asc" } },
    },
  });
}
