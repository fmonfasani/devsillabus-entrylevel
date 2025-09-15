// lib/courseService.ts
import prisma from "@/lib/prisma";
import { Course, Chapter, Enrollment } from "@prisma/client";

export function listCourses() {
  return prisma.course.findMany({
    select: { id: true, name: true, slug: true, description: true },
    orderBy: { id: "asc" },
  });
}

export function getCourseBySlugWithChapters(slug: string) {
  return prisma.course.findUnique({
    where: { slug },
    include: {
      chapters: { orderBy: { weekNumber: "asc" }, include: { resources: true, assessments: true } },
    },
  });
}

export function listChaptersByCourseId(courseId: number) {
  return prisma.chapter.findMany({
    where: { courseId },
    orderBy: { weekNumber: "asc" },
  });
}

export async function userHasAccessToCourse(userId: number, courseId: number) {
  const user = await prisma.user.findUnique({ where: { id: userId }, select: { role: true } });
  if (user?.role === "ADMIN") return true;
  const enrollment = await prisma.enrollment.findUnique({
    where: { userId_courseId: { userId, courseId } },
  });
  return !!enrollment;
}

export function listMyEnrollments(userId: number) {
  return prisma.enrollment.findMany({
    where: { userId },
    include: { course: true },
  });
}

export function enroll(userId: number, courseId: number) {
  return prisma.enrollment.create({ data: { userId, courseId } });
}
