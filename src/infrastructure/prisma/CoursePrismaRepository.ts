import prisma from '@/lib/prisma';
import { Course, CourseProps } from '@/modules/course/domain/Course';
import {
  AdminCourseDetail,
  CourseChapterDetail,
  CourseDetail,
  CourseRepository,
  CourseSummary,
  UpdateCourseData,
} from '@/modules/course/ports/CourseRepository';
import { ChapterProps } from '@/modules/chapter/domain/Chapter';

export class CoursePrismaRepository implements CourseRepository {
  async findSummaries(): Promise<CourseSummary[]> {
    const courses = await prisma.course.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        durationWeeks: true,
      },
      orderBy: { id: 'asc' },
    });

    return courses.map((course) => ({
      ...course,
      description: course.description ?? null,
      durationWeeks: course.durationWeeks ?? null,
    }));
  }

  async findBySlugWithChapters(slug: string): Promise<CourseDetail | null> {
    const result = await prisma.course.findUnique({
      where: { slug },
      include: {
        chapters: {
          orderBy: { weekNumber: 'asc' },
          include: {
            resources: { orderBy: { orderIndex: 'asc' } },
            assessments: true,
          },
        },
      },
    });

    if (!result) return null;

    const course = new Course({
      id: result.id,
      name: result.name,
      slug: result.slug,
      description: result.description,
      type: result.type,
      level: result.level,
      durationWeeks: result.durationWeeks,
      startDate: result.startDate ?? undefined,
      endDate: result.endDate ?? undefined,
    });

    const chapters: CourseChapterDetail[] = result.chapters.map((chapter) => ({
      id: chapter.id,
      weekNumber: chapter.weekNumber,
      title: chapter.title,
      isPublished: chapter.isPublished,
      minScoreTheory: chapter.minScoreTheory,
      minScorePractice: chapter.minScorePractice,
      resources: chapter.resources,
      assessments: chapter.assessments,
      progress: (chapter as any).progress,
    }));

    return { course, chapters };
  }

  async findChaptersByCourseId(courseId: number): Promise<ChapterProps[]> {
    const chapters = await prisma.chapter.findMany({
      where: { courseId },
      orderBy: { weekNumber: 'asc' },
    });

    return chapters.map((chapter) => ({
      id: chapter.id,
      courseId: chapter.courseId,
      title: chapter.title,
      weekNumber: chapter.weekNumber,
      isPublished: chapter.isPublished,
      minScoreTheory: chapter.minScoreTheory,
      minScorePractice: chapter.minScorePractice,
      unlockDate: chapter.unlockDate,
    }));
  }

  async save(course: Course): Promise<Course> {
    const data = course.toJSON();
    const { id, ...rest } = data as CourseProps;
    const created = await prisma.course.create({ data: rest });
    return new Course({
      id: created.id,
      name: created.name,
      slug: created.slug,
      description: created.description,
      type: created.type,
      level: created.level,
      durationWeeks: created.durationWeeks,
      startDate: created.startDate ?? undefined,
      endDate: created.endDate ?? undefined,
    });
  }

  async findAdminDetailById(courseId: number): Promise<AdminCourseDetail | null> {
    const course = await prisma.course.findUnique({
      where: { id: courseId },
      include: {
        chapters: {
          orderBy: { weekNumber: 'asc' },
          include: {
            resources: { orderBy: { orderIndex: 'asc' } },
            assessments: true,
            progress: {
              select: {
                status: true,
                theoryScore: true,
                practiceScore: true,
                user: {
                  select: { id: true, name: true, email: true },
                },
              },
            },
          },
        },
        enrollments: {
          where: { isActive: true },
          include: {
            user: { select: { id: true, name: true, email: true } },
          },
        },
      },
    });

    if (!course) return null;

    const courseEntity = new Course({
      id: course.id,
      name: course.name,
      slug: course.slug,
      description: course.description,
      type: course.type,
      level: course.level,
      durationWeeks: course.durationWeeks,
      startDate: course.startDate ?? undefined,
      endDate: course.endDate ?? undefined,
    });

    const chapters: CourseChapterDetail[] = course.chapters.map((chapter) => ({
      id: chapter.id,
      weekNumber: chapter.weekNumber,
      title: chapter.title,
      isPublished: chapter.isPublished,
      minScoreTheory: chapter.minScoreTheory,
      minScorePractice: chapter.minScorePractice,
      resources: chapter.resources,
      assessments: chapter.assessments,
      progress: chapter.progress,
    }));

    return {
      course: courseEntity,
      chapters,
      enrollments: course.enrollments.map((enrollment) => ({
        user: enrollment.user,
        status: enrollment.isActive ? 'ACTIVE' : 'INACTIVE',
      })),
    };
  }

  async update(courseId: number, data: UpdateCourseData): Promise<Course> {
    const updated = await prisma.course.update({
      where: { id: courseId },
      data,
    });

    return new Course({
      id: updated.id,
      name: updated.name,
      slug: updated.slug,
      description: updated.description,
      type: updated.type,
      level: updated.level,
      durationWeeks: updated.durationWeeks,
      startDate: updated.startDate ?? undefined,
      endDate: updated.endDate ?? undefined,
    });
  }
}
