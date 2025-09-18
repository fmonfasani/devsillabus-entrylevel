export interface EnrollmentProps {
  id?: number;
  userId: number;
  courseId: number;
  isActive?: boolean;
  completedAt?: Date | null;
}

export class Enrollment {
  private readonly props: EnrollmentProps;

  constructor(props: EnrollmentProps) {
    this.props = {
      ...props,
      isActive: props.isActive ?? true,
      completedAt: props.completedAt ?? null,
    };

    this.ensureValidIdentifiers();
  }

  private ensureValidIdentifiers() {
    if (!Number.isInteger(this.props.userId) || this.props.userId <= 0) {
      throw new Error('Enrollment requires a valid userId');
    }
    if (!Number.isInteger(this.props.courseId) || this.props.courseId <= 0) {
      throw new Error('Enrollment requires a valid courseId');
    }
  }

  get userId() {
    return this.props.userId;
  }

  get courseId() {
    return this.props.courseId;
  }

  get isActive() {
    return this.props.isActive ?? false;
  }

  toJSON(): EnrollmentProps {
    return { ...this.props };
  }
}
