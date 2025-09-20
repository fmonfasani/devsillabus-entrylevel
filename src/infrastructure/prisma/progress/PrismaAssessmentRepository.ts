import { PrismaClient } from "@prisma/client";
import { AssessmentRepository, AssessmentSnapshot } from "@/modules/progress/ports";

export class PrismaAssessmentRepository implements AssessmentRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findByIdWithChapter(assessmentId: number): Promise<AssessmentSnapshot | null> {
    const record = await this.prisma.assessment.findUnique({
      where: { id: assessmentId },
      include: {
        chapter: {
          select: {
            id: true,
            courseId: true,
            weekNumber: true,
            minScoreTheory: true,
            minScorePractice: true,
          },
        },
      },
    });

    if (!record) {
      return null;
    }

    return {
      id: record.id,
      chapterId: record.chapterId,
      type: record.type,
      title: record.title,
      passingScore: record.passingScore,
      chapter: record.chapter,
    };
  }
}
