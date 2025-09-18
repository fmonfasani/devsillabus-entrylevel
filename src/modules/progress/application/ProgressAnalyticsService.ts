import { ProgressStatus } from "@prisma/client";
import {
  ChapterProgressRepository,
  CourseProgressReadModel,
} from "../ports";

export class ProgressAnalyticsService {
  constructor(
    private readonly chapterProgressRepository: ChapterProgressRepository,
    private readonly courseProgressReadModel: CourseProgressReadModel
  ) {}

  getUserCourseProgress(userId: number, courseId: number) {
    return this.courseProgressReadModel.getUserCourseProgress(userId, courseId);
  }

  async getCourseProgressStats(courseId: number) {
    const [totalChapters, enrollments] = await Promise.all([
      this.courseProgressReadModel.countChapters(courseId),
      this.courseProgressReadModel.getActiveEnrollments(courseId),
    ]);

    if (enrollments.length === 0 || totalChapters === 0) {
      return {
        totalStudents: enrollments.length,
        averageProgress: 0,
        completionRate: 0,
      };
    }

    const progressStats = await Promise.all(
      enrollments.map(async ({ userId }) => {
        const completedChapters = await this.chapterProgressRepository.countCompletedChapters(
          userId,
          courseId
        );

        return {
          userId,
          progress: (completedChapters / totalChapters) * 100,
          completed: completedChapters === totalChapters,
        };
      })
    );

    const averageProgress =
      progressStats.reduce((sum, stat) => sum + stat.progress, 0) /
      progressStats.length;

    const completionRate =
      (progressStats.filter((stat) => stat.completed).length / progressStats.length) *
      100;

    return {
      totalStudents: enrollments.length,
      averageProgress: Math.round(averageProgress),
      completionRate: Math.round(completionRate),
    };
  }

  async getDashboardStats() {
    const [
      totalUsers,
      totalCourses,
      totalEnrollments,
      completedEnrollments,
      recentActivity,
    ] = await Promise.all([
      this.courseProgressReadModel.countStudents(),
      this.courseProgressReadModel.countActiveCourses(),
      this.courseProgressReadModel.countActiveEnrollments(),
      this.courseProgressReadModel.countCompletedEnrollments(),
      this.courseProgressReadModel.getRecentActivity(
        new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        10
      ),
    ]);

    const completionRate =
      totalEnrollments > 0
        ? Math.round((completedEnrollments / totalEnrollments) * 100)
        : 0;

    return {
      totalUsers,
      totalCourses,
      totalEnrollments,
      completedEnrollments,
      completionRate,
      recentActivity,
    };
  }

  async canAccessChapter(userId: number, chapterId: number) {
    const progress = await this.chapterProgressRepository.findByUserAndChapter(
      userId,
      chapterId
    );

    if (!progress) {
      return false;
    }

    return progress.status !== ProgressStatus.LOCKED;
  }
}
