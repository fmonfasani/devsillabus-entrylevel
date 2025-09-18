import { ProgressStatus } from "@prisma/client";
import {
  ProgressAggregate,
  ChapterProgressSnapshot,
  PreviousChapterContext,
  ScoreUpdate,
} from "../domain/ProgressAggregate";
import {
  AssessmentRepository,
  ChapterProgressRepository,
  CourseProgressReadModel,
  ChapterContext,
} from "../ports";

export class ChapterLifecycleService {
  constructor(
    private readonly chapterProgressRepository: ChapterProgressRepository,
    private readonly assessmentRepository: AssessmentRepository,
    private readonly courseProgressReadModel: CourseProgressReadModel
  ) {}

  async enrollUserInCourse(userId: number, courseId: number): Promise<void> {
    const chapters = await this.courseProgressReadModel.getCourseChapters(courseId);

    if (chapters.length === 0) {
      return;
    }

    const records = chapters.map((chapter) =>
      new ProgressAggregate(chapter, null).createInitialRecord(userId)
    );

    await this.chapterProgressRepository.createMany(records);
  }

  async evaluateChapterUnlock(userId: number, chapterId: number): Promise<boolean> {
    const context = await this.courseProgressReadModel.getChapterContext(chapterId);
    if (!context) {
      return false;
    }

    const currentProgress = await this.chapterProgressRepository.findByUserAndChapter(
      userId,
      chapterId
    );
    const previousProgress = await this.resolvePreviousProgress(userId, context);

    const aggregate = new ProgressAggregate(
      context.chapter,
      currentProgress,
      previousProgress
    );

    if (!aggregate.canUnlock()) {
      return false;
    }

    await this.chapterProgressRepository.upsert(
      aggregate.buildStatusRecord(userId, ProgressStatus.AVAILABLE)
    );
    return true;
  }

  async updateChapterStatus(
    userId: number,
    chapterId: number,
    status: ProgressStatus,
    scores?: ScoreUpdate
  ): Promise<ChapterProgressSnapshot> {
    const context = await this.courseProgressReadModel.getChapterContext(chapterId);
    if (!context) {
      throw new Error("Chapter not found");
    }

    const currentProgress = await this.chapterProgressRepository.findByUserAndChapter(
      userId,
      chapterId
    );

    const aggregate = new ProgressAggregate(context.chapter, currentProgress);
    const record = aggregate.buildStatusRecord(userId, status, scores);
    const updated = await this.chapterProgressRepository.upsert(record);

    if (status === ProgressStatus.COMPLETED) {
      await this.tryUnlockNextChapter(userId, context, updated);
    }

    return updated;
  }

  async processAssessmentResult(
    userId: number,
    assessmentId: number,
    score: number,
    isTheoryAssessment: boolean = true
  ): Promise<ChapterProgressSnapshot> {
    const assessment = await this.assessmentRepository.findByIdWithChapter(assessmentId);

    if (!assessment) {
      throw new Error("Assessment not found");
    }

    const context = await this.courseProgressReadModel.getChapterContext(assessment.chapterId);
    if (!context) {
      throw new Error("Chapter not found");
    }

    const currentProgress = await this.chapterProgressRepository.findByUserAndChapter(
      userId,
      assessment.chapterId
    );

    if (!currentProgress) {
      throw new Error("Chapter progress not found");
    }

    const aggregate = new ProgressAggregate(context.chapter, currentProgress);
    const scoreUpdate: ScoreUpdate = isTheoryAssessment
      ? { theoryScore: score }
      : { practiceScore: score };

    const nextStatus = aggregate.determineStatusAfterScore(scoreUpdate);
    const updated = await this.chapterProgressRepository.upsert(
      aggregate.buildStatusRecord(userId, nextStatus, scoreUpdate)
    );

    if (nextStatus === ProgressStatus.COMPLETED) {
      await this.tryUnlockNextChapter(userId, context, updated);
    }

    return updated;
  }

  async unlockNextChapter(userId: number, currentChapterId: number): Promise<void> {
    const context = await this.courseProgressReadModel.getChapterContext(currentChapterId);
    if (!context?.nextChapter) {
      return;
    }

    const currentProgress = await this.chapterProgressRepository.findByUserAndChapter(
      userId,
      currentChapterId
    );

    if (!currentProgress) {
      return;
    }

    await this.tryUnlockNextChapter(userId, context, currentProgress);
  }

  private async tryUnlockNextChapter(
    userId: number,
    context: ChapterContext,
    currentProgress: ChapterProgressSnapshot
  ): Promise<void> {
    if (!context.nextChapter) {
      return;
    }

    const nextProgress = await this.chapterProgressRepository.findByUserAndChapter(
      userId,
      context.nextChapter.id
    );

    const aggregate = new ProgressAggregate(context.nextChapter, nextProgress, {
      chapter: context.chapter,
      progress: currentProgress,
    });

    if (!aggregate.canUnlock()) {
      return;
    }

    await this.chapterProgressRepository.upsert(
      aggregate.buildStatusRecord(userId, ProgressStatus.AVAILABLE)
    );
  }

  private async resolvePreviousProgress(
    userId: number,
    context: ChapterContext
  ): Promise<PreviousChapterContext | null> {
    if (!context.previousChapter) {
      return null;
    }

    const previousProgress = await this.chapterProgressRepository.findByUserAndChapter(
      userId,
      context.previousChapter.id
    );

    return {
      chapter: context.previousChapter,
      progress: previousProgress,
    };
  }
}
