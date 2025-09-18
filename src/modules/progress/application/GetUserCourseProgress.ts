import { ProgressRepository } from '../ports/ProgressRepository';

export class GetUserCourseProgress {
  constructor(private readonly repository: ProgressRepository) {}

  execute(userId: number, courseId: number) {
    return this.repository.listProgressByUserAndCourse(userId, courseId);
  }
}
