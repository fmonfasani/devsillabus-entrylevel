import { ProgressRepository } from '../ports/ProgressRepository';

export class GetDashboardStats {
  constructor(private readonly repository: ProgressRepository) {}

  async execute() {
    const [
      totalUsers,
      totalCourses,
      totalEnrollments,
      completedEnrollments,
      recentActivity,
    ] = await Promise.all([
      this.repository.countStudents(),
      this.repository.countActiveCourses(),
      this.repository.countActiveEnrollments(),
      this.repository.countCompletedEnrollments(),
      this.repository.listRecentActivity(),
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
}
