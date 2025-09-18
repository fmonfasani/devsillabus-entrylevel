import { AssessmentInput, ChapterRepository } from '../ports/ChapterRepository';

export class AddAssessment {
  constructor(private readonly repository: ChapterRepository) {}

  execute(chapterId: number, input: AssessmentInput) {
    return this.repository.addAssessment(chapterId, input);
  }
}
