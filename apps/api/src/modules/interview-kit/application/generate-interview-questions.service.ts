import { AIService } from "../../../ai/core/ai.service";
import { generateInterviewQuestionsPrompt } from "../../../ai/prompts/interview-kit/generate-interview-questions.prompt";
import type {
  CompanyBrief,
  InterviewQuestion,
  InterviewRole,
} from "../domain/types";
import { validateGeneratedInterviewQuestions } from "../domain/question-generation.validation";

interface GeneratedQuestion {
  requirement_ids: string[];
  category: InterviewQuestion["category"];
  prompt: string;
  answer_outline: string;
  difficulty: InterviewQuestion["difficulty"];
}

interface GeneratedQuestionsResponse {
  questions: GeneratedQuestion[];
}

export class GenerateInterviewQuestionsService {
  private readonly aiService: AIService;

  constructor() {
    this.aiService = new AIService();
  }

  async execute(
    role: InterviewRole,
    companyBrief: CompanyBrief,
    interviewProcessSources: {
      title: string;
      url: string;
      text: string;
    }[],
  ): Promise<InterviewQuestion[]> {
    const prompt = generateInterviewQuestionsPrompt(
      role,
      companyBrief,
      interviewProcessSources,
    );

    const response = await this.aiService.generate(prompt);

    const cleanedResponse = response
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();

    // console.log("[AI] Raw question generation response:");
    // console.log(cleanedResponse);

    const parsedResponse = JSON.parse(
      cleanedResponse,
    ) as GeneratedQuestionsResponse;

    if (!parsedResponse || !Array.isArray(parsedResponse.questions)) {
      throw new Error("Invalid interview question generation response.");
    }

    const questions = parsedResponse.questions.map((question, index) => {
      if (
        !Array.isArray(question.requirement_ids) ||
        question.requirement_ids.length === 0
      ) {
        throw new Error(
          `Generated question at index ${index} is missing requirement_ids.`,
        );
      }

      return {
        id: `q-${String(index + 1).padStart(3, "0")}`,
        requirement_ids: question.requirement_ids,
        category: question.category,
        prompt: question.prompt,
        answer_outline: question.answer_outline,
        difficulty: question.difficulty,
      };
    });

    validateGeneratedInterviewQuestions(questions, role);

    return questions;
  }
}
