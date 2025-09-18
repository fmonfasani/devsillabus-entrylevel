import { ProgressRepository } from '../ports/ProgressRepository';
import { UpdateChapterStatus } from './UpdateChapterStatus';
import { ProgressStatus } from '../domain/Progress';

export class ProcessAssessmentResult {
  constructor(
    private readonly repository: ProgressRepository,
    private readonly updateChapterStatus: UpdateChapterStatus,
  ) {}

  async execute(
    userId: number,
    assessmentId: number,
    score: number,
    isTheoryAssessment = true,
  ) {
    const assessment = await this.repository.findAssessmentById(assessmentId);
    if (!assessment) {
      throw new Error('Assessment not found');
    }

    const currentProgress = await this.repository.findProgress(userId, assessment.chapterId);
    if (!currentProgress) {
      throw new Error('Chapter progress not found');
    }

    const progressData = currentProgress.toJSON();
    const update = {
      status: currentProgress.status,
      lastAccessed: new Date(),
      theoryScore: progressData.theoryScore ?? null,
      practiceScore: progressData.practiceScore ?? null,
    };

    if (isTheoryAssessment) {
      update.theoryScore = score;
    } else {
      update.practiceScore = score;
    }

    const updated = await this.repository.upsertProgress(
      userId,
      assessment.chapterId,
      update,
    );

    const theoryScore = isTheoryAssessment ? score : update.theoryScore ?? 0;
    const practiceScore = !isTheoryAssessment ? score : update.practiceScore ?? 0;

    const meetsTheory = theoryScore >= assessment.chapter.minScoreTheory;
    const meetsPractice = practiceScore >= assessment.chapter.minScorePractice;

    if (meetsTheory && meetsPractice) {
      await this.updateChapterStatus.execute(
        userId,
        assessment.chapterId,
        ProgressStatus.COMPLETED,
      );
    }

    return updated;
  }
}
