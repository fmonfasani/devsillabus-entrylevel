import prisma from '@/lib/prisma';
import { Enrollment } from '@/modules/enrollment/domain/Enrollment';
import {
  EnrollmentRepository,
  EnrollmentWithCourse,
  UserSummary,
} from '@/modules/enrollment/ports/EnrollmentRepository';

export class EnrollmentPrismaRepository implements EnrollmentRepository {
  async findByUserAndCourse(userId: number, courseId: number): Promise<Enrollment | null> {
    const enrollment = await prisma.enrollment.findUnique({
      where: { userId_courseId: { userId, courseId } },
    });

    if (!enrollment) return null;

    return new Enrollment({
      id: enrollment.id,
      userId: enrollment.userId,
      courseId: enrollment.courseId,
      isActive: enrollment.isActive,
      completedAt: enrollment.completedAt ?? undefined,
    });
  }

  async create(enrollment: Enrollment): Promise<Enrollment> {
    const data = enrollment.toJSON();
    const created = await prisma.enrollment.create({ data });
    return new Enrollment({
      id: created.id,
      userId: created.userId,
      courseId: created.courseId,
      isActive: created.isActive,
      completedAt: created.completedAt ?? undefined,
    });
  }

  async listByUser(userId: number): Promise<EnrollmentWithCourse[]> {
    const enrollments = await prisma.enrollment.findMany({
      where: { userId },
      include: {
        course: {
          select: { id: true, name: true, slug: true, description: true },
        },
      },
    });

    return enrollments.map((enrollment) => ({
      id: enrollment.id,
      userId: enrollment.userId,
      courseId: enrollment.courseId,
      isActive: enrollment.isActive,
      completedAt: enrollment.completedAt,
      course: {
        id: enrollment.course.id,
        name: enrollment.course.name,
        slug: enrollment.course.slug,
        description: enrollment.course.description,
      },
    }));
  }

  async findUserByEmail(email: string): Promise<UserSummary | null> {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true, role: true, email: true },
    });

    if (!user) return null;

    return { id: user.id, role: user.role, email: user.email }; // email not null per select
  }

  async findUserRole(userId: number): Promise<string | null> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true },
    });

    return user?.role ?? null;
  }
}
