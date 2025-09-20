export enum ProgressStatus {
  LOCKED = 'LOCKED',
  AVAILABLE = 'AVAILABLE',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}

export interface ProgressProps {
  userId: number;
  chapterId: number;
  status: ProgressStatus;
  theoryScore?: number | null;
  practiceScore?: number | null;
  startedAt?: Date | null;
  completedAt?: Date | null;
}

export class ProgressRecord {
  private readonly props: ProgressProps;

  constructor(props: ProgressProps) {
    this.props = {
      ...props,
      theoryScore: props.theoryScore ?? null,
      practiceScore: props.practiceScore ?? null,
      startedAt: props.startedAt ?? null,
      completedAt: props.completedAt ?? null,
    };

    this.ensureValidIdentifiers();
  }

  private ensureValidIdentifiers() {
    if (!Number.isInteger(this.props.userId) || this.props.userId <= 0) {
      throw new Error('Progress record requires a valid userId');
    }
    if (!Number.isInteger(this.props.chapterId) || this.props.chapterId <= 0) {
      throw new Error('Progress record requires a valid chapterId');
    }
  }

  get status() {
    return this.props.status;
  }

  toJSON(): ProgressProps {
    return { ...this.props };
  }
}
