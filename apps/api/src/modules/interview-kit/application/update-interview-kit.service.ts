import { InterviewKitRepository } from "../infrastructure/interview-kit.repository";
import { validateUpdateInterviewKitInput } from "../domain/update-interview-kit.validation";
import type { UpdateInterviewKitInput } from "../domain/update-interview-kit.validation";
import { validateGeneratedInterviewQuestions } from "../domain/question-generation.validation";
import { validateGeneratedInterviewFlashcards } from "../domain/flashcard-generation.validation";
import type { InterviewRole } from "../domain/types";

export class UpdateInterviewKitService {
  private readonly interviewKitRepository: InterviewKitRepository;

  constructor() {
    this.interviewKitRepository = new InterviewKitRepository();
  }

  async execute(
    interviewKitId: string,
    userId: string,
    data: UpdateInterviewKitInput,
  ) {
    validateUpdateInterviewKitInput(data);

    const existingKit = await this.interviewKitRepository.findById(
      interviewKitId,
      userId,
    );

    if (!existingKit) {
      throw new Error("Interview kit not found.");
    }

    const role = existingKit.role as unknown as InterviewRole;

    if (data.questions !== undefined) {
      validateGeneratedInterviewQuestions(data.questions, role);
    }

    if (data.flashcards !== undefined) {
      validateGeneratedInterviewFlashcards(data.flashcards, role);
    }

    const updatedKit = await this.interviewKitRepository.update(
      interviewKitId,
      userId,
      data,
    );

    if (!updatedKit) {
      throw new Error("Interview kit not found.");
    }

    return updatedKit;
  }
}
