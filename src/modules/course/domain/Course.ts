export interface CourseProps {
  id?: number;
  name: string;
  slug: string;
  description?: string | null;
  type?: string | null;
  level?: string | null;
  durationWeeks?: number | null;
  startDate?: Date | null;
  endDate?: Date | null;
}

export class Course {
  private readonly props: CourseProps;

  constructor(props: CourseProps) {
    this.props = {
      ...props,
      description: props.description ?? null,
      type: props.type ?? null,
      level: props.level ?? null,
      durationWeeks: props.durationWeeks ?? null,
      startDate: props.startDate ?? null,
      endDate: props.endDate ?? null,
    };

    this.ensureValidName();
    this.ensureValidSlug();
    this.ensureValidDuration();
  }

  private ensureValidName() {
    if (!this.props.name || this.props.name.trim().length === 0) {
      throw new Error('Course name is required');
    }
  }

  private ensureValidSlug() {
    const slug = this.props.slug;
    if (!slug || slug.trim().length === 0) {
      throw new Error('Course slug is required');
    }

    const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
    if (!slugPattern.test(slug)) {
      throw new Error('Course slug must be lowercase and hyphen separated');
    }
  }

  private ensureValidDuration() {
    if (this.props.durationWeeks != null && this.props.durationWeeks < 0) {
      throw new Error('Course duration must be positive');
    }
  }

  get id() {
    return this.props.id;
  }

  get name() {
    return this.props.name;
  }

  get slug() {
    return this.props.slug;
  }

  get description() {
    return this.props.description ?? null;
  }

  get type() {
    return this.props.type ?? null;
  }

  get level() {
    return this.props.level ?? null;
  }

  get durationWeeks() {
    return this.props.durationWeeks ?? null;
  }

  get startDate() {
    return this.props.startDate ?? null;
  }

  get endDate() {
    return this.props.endDate ?? null;
  }

  toJSON(): CourseProps {
    return { ...this.props };
  }
}
