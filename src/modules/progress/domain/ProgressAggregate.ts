import { ProgressStatus } from "@prisma/client";

export interface ChapterSnapshot {
  id: number;
  courseId: number;
  weekNumber: number;
  minScoreTheory: number;
  minScorePractice: number;
  unlockDate: Date | null;
}

export interface ChapterProgressSnapshot {
  userId: number;
  chapterId: number;
  status: ProgressStatus;
  theoryScore?: number | null;
  practiceScore?: number | null;
  startedAt?: Date | null;
  completedAt?: Date | null;
  lastAccessed?: Date | null;
}

export interface ScoreUpdate {
  theoryScore?: number;
  practiceScore?: number;
}

export interface PreviousChapterContext {
  chapter: ChapterSnapshot;
  progress: ChapterProgressSnapshot | null;
}

export class ProgressAggregate {
  constructor(
    private readonly chapter: ChapterSnapshot,
    private readonly currentState: ChapterProgressSnapshot | null,
    private readonly previousContext?: PreviousChapterContext | null
  ) {}

  createInitialRecord(userId: number): ChapterProgressSnapshot {
    return {
      userId,
      chapterId: this.chapter.id,
      status: this.isFirstChapter() ? ProgressStatus.AVAILABLE : ProgressStatus.LOCKED,
      lastAccessed: null,
    };
  }

  buildStatusRecord(
    userId: number,
    status: ProgressStatus,
    scores?: ScoreUpdate,
    now: Date = new Date()
  ): ChapterProgressSnapshot {
    const base: ChapterProgressSnapshot = {
      userId,
      chapterId: this.chapter.id,
      status,
      theoryScore: this.resolveTheoryScore(scores),
      practiceScore: this.resolvePracticeScore(scores),
      startedAt: this.resolveStartedAt(status, now),
      completedAt: this.resolveCompletedAt(status, now),
      lastAccessed: now,
    };

    return base;
  }

  determineStatusAfterScore(scores?: ScoreUpdate): ProgressStatus {
    const currentStatus = this.currentState?.status ?? ProgressStatus.AVAILABLE;
    if (currentStatus === ProgressStatus.COMPLETED) {
      return ProgressStatus.COMPLETED;
    }

    const theoryScore = this.resolveTheoryScore(scores);
    const practiceScore = this.resolvePracticeScore(scores);

    if (this.meetsAllRequirements(theoryScore, practiceScore)) {
      return ProgressStatus.COMPLETED;
    }

    return currentStatus;
  }

  canUnlock(now: Date = new Date()): boolean {
    if (this.isFirstChapter()) {
      return true;
    }

    if (!this.previousContext?.chapter || !this.previousContext.progress) {
      return false;
    }

    if (!this.isUnlockDateReached(now)) {
      return false;
    }

    if (this.previousContext.progress.status !== ProgressStatus.COMPLETED) {
      return false;
    }

    return (
      this.meetsTheoryRequirement(
        this.previousContext.chapter.minScoreTheory,
        this.previousContext.progress.theoryScore
      ) &&
      this.meetsPracticeRequirement(
        this.previousContext.chapter.minScorePractice,
        this.previousContext.progress.practiceScore
      )
    );
  }

  private resolveTheoryScore(scores?: ScoreUpdate): number | null | undefined {
    if (scores?.theoryScore !== undefined) {
      return scores.theoryScore;
    }

    return this.currentState?.theoryScore ?? null;
  }

  private resolvePracticeScore(scores?: ScoreUpdate): number | null | undefined {
    if (scores?.practiceScore !== undefined) {
      return scores.practiceScore;
    }

    return this.currentState?.practiceScore ?? null;
  }

  private resolveStartedAt(status: ProgressStatus, now: Date): Date | null | undefined {
    if (status === ProgressStatus.IN_PROGRESS && !this.currentState?.startedAt) {
      return now;
    }

    return this.currentState?.startedAt ?? null;
  }

  private resolveCompletedAt(status: ProgressStatus, now: Date): Date | null | undefined {
    if (status === ProgressStatus.COMPLETED) {
      return now;
    }

    return this.currentState?.completedAt ?? null;
  }

  private meetsAllRequirements(
    theoryScore?: number | null,
    practiceScore?: number | null
  ): boolean {
    return (
      this.meetsTheoryRequirement(this.chapter.minScoreTheory, theoryScore) &&
      this.meetsPracticeRequirement(this.chapter.minScorePractice, practiceScore)
    );
  }

  private meetsTheoryRequirement(minScore: number, score?: number | null): boolean {
    return this.meetsScoreRequirement(minScore, score);
  }

  private meetsPracticeRequirement(minScore: number, score?: number | null): boolean {
    return this.meetsScoreRequirement(minScore, score);
  }

  private meetsScoreRequirement(minScore: number, score?: number | null): boolean {
    if (score === null || score === undefined) {
      return true;
    }

    return score >= minScore;
  }

  private isFirstChapter(): boolean {
    return this.chapter.weekNumber === 1;
  }

  private isUnlockDateReached(now: Date): boolean {
    if (!this.chapter.unlockDate) {
      return true;
    }

    return now >= this.chapter.unlockDate;
  }
}
