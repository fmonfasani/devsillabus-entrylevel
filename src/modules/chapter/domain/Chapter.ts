export interface ChapterProps {
  id?: number;
  courseId: number;
  title: string;
  weekNumber: number;
  isPublished?: boolean;
  minScoreTheory?: number;
  minScorePractice?: number;
  unlockDate?: Date | null;
}

export class Chapter {
  private readonly props: ChapterProps;

  constructor(props: ChapterProps) {
    this.props = {
      ...props,
      isPublished: props.isPublished ?? true,
      minScoreTheory: props.minScoreTheory ?? 0,
      minScorePractice: props.minScorePractice ?? 0,
      unlockDate: props.unlockDate ?? null,
    };

    this.ensureValidWeekNumber();
    this.ensureValidTitle();
  }

  private ensureValidWeekNumber() {
    if (!Number.isInteger(this.props.weekNumber) || this.props.weekNumber <= 0) {
      throw new Error('Chapter weekNumber must be a positive integer');
    }
  }

  private ensureValidTitle() {
    if (!this.props.title || this.props.title.trim().length === 0) {
      throw new Error('Chapter title is required');
    }
  }

  get id() {
    return this.props.id;
  }

  get weekNumber() {
    return this.props.weekNumber;
  }

  get courseId() {
    return this.props.courseId;
  }

  get title() {
    return this.props.title;
  }

  isPublished() {
    return this.props.isPublished ?? false;
  }

  toJSON(): ChapterProps {
    return { ...this.props };
  }
}
