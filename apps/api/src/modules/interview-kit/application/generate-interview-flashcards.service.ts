import { AIService } from "../../../ai/core/ai.service";
import { generateInterviewFlashcardsPrompt } from "../../../ai/prompts/interview-kit/generate-interview-flashcards.prompt";
import type {
  InterviewFlashcard,
  InterviewQuestion,
  InterviewRole,
} from "../domain/types";
import { validateGeneratedInterviewFlashcards } from "../domain/flashcard-generation.validation";

interface GeneratedFlashcard {
  front: string;
  back: string;
  requirement_ids: string[];
}

interface GeneratedFlashcardsResponse {
  flashcards: GeneratedFlashcard[];
}

export class GenerateInterviewFlashcardsService {
  private readonly aiService: AIService;

  constructor() {
    this.aiService = new AIService();
  }

  async execute(
    role: InterviewRole,
    questions: InterviewQuestion[],
  ): Promise<InterviewFlashcard[]> {
    const prompt = generateInterviewFlashcardsPrompt(role, questions);

    const response = await this.aiService.generate(prompt);

    const cleanedResponse = response
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();

    const parsedResponse = JSON.parse(
      cleanedResponse,
    ) as GeneratedFlashcardsResponse;

    if (!parsedResponse || !Array.isArray(parsedResponse.flashcards)) {
      throw new Error("Invalid interview flashcard generation response.");
    }

    const flashcards = parsedResponse.flashcards.map((flashcard, index) => ({
      id: `fc-${String(index + 1).padStart(3, "0")}`,
      front: flashcard.front,
      back: flashcard.back,
      requirement_ids: flashcard.requirement_ids,
    }));

    validateGeneratedInterviewFlashcards(flashcards, role);

    return flashcards;
  }
}
