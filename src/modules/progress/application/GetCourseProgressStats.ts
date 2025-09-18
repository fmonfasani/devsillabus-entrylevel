import { ProgressRepository } from '../ports/ProgressRepository';

export class GetCourseProgressStats {
  constructor(private readonly repository: ProgressRepository) {}

  async execute(courseId: number) {
    const [totalChapters, enrollments] = await Promise.all([
      this.repository.countChapters(courseId),
      this.repository.listActiveEnrollments(courseId),
    ]);

    if (enrollments.length === 0) {
      return {
        totalStudents: 0,
        averageProgress: 0,
        completionRate: 0,
      };
    }

    const progressStats = await Promise.all(
      enrollments.map(async (enrollment) => {
        const completed = await this.repository.countCompletedChapters(
          enrollment.userId,
          courseId,
        );

        return {
          completedChapters: completed,
        };
      }),
    );

    const averageProgress =
      progressStats.reduce((sum, stat) => sum + stat.completedChapters, 0) /
      (totalChapters > 0 ? totalChapters * progressStats.length : 1);

    const completionRate =
      totalChapters === 0
        ? 0
        : (progressStats.filter((stat) => stat.completedChapters === totalChapters).length /
            progressStats.length) * 100;

    return {
      totalStudents: enrollments.length,
      averageProgress: Math.round(averageProgress * 100),
      completionRate: Math.round(completionRate),
    };
  }
}
