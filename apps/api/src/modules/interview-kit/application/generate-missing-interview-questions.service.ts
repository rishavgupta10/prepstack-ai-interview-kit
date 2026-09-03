import { AIService } from "../../../ai/core/ai.service";
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

export class GenerateMissingInterviewQuestionsService {
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
    uncoveredRequirementIds: string[],
    existingQuestions: InterviewQuestion[],
  ): Promise<InterviewQuestion[]> {
    if (uncoveredRequirementIds.length === 0) {
      return [];
    }

    const missingRequirements = role.requirements.filter((requirement) =>
      uncoveredRequirementIds.includes(requirement.id),
    );

    const prompt = `
You are completing an interview preparation kit.

Generate questions ONLY for the uncovered requirements supplied below.

JOB ROLE:
${JSON.stringify(role, null, 2)}

UNCOVERED REQUIREMENTS:
${JSON.stringify(missingRequirements, null, 2)}

EXISTING QUESTIONS:
${JSON.stringify(existingQuestions, null, 2)}

COMPANY RESEARCH:
${JSON.stringify(companyBrief, null, 2)}

PUBLIC INTERVIEW-PROCESS RESEARCH:
${JSON.stringify(interviewProcessSources, null, 2)}

Rules:

1. Every generated question MUST reference at least one
   uncovered requirement ID.
2. Use ONLY requirement IDs supplied above.
3. Do not invent requirements.
4. Do not duplicate the existing questions.
5. Focus on meaningful coverage of the missing requirements.
6. Category must be exactly one of:
   - technical
   - behavioural
   - system design
   - company fit
7. Difficulty must be exactly 1, 2, or 3.
8. Provide a concise answer outline.
9. Public interview research may influence question style,
   but cannot introduce new requirements.
10. Return ONLY valid JSON.

Expected format:

{
  "questions": [
    {
      "requirement_ids": ["req-003"],
      "category": "technical",
      "prompt": "Question text",
      "answer_outline": "Key points expected in a strong answer",
      "difficulty": 2
    }
  ]
}
`;

    const response = await this.aiService.generate(prompt);

    const cleanedResponse = response
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();

    const parsedResponse = JSON.parse(
      cleanedResponse,
    ) as GeneratedQuestionsResponse;

    if (!parsedResponse || !Array.isArray(parsedResponse.questions)) {
      throw new Error("Invalid missing-question generation response.");
    }

    const startIndex = existingQuestions.length;

    const questions: InterviewQuestion[] = parsedResponse.questions.map(
      (question, index) => ({
        id: `q-${String(startIndex + index + 1).padStart(3, "0")}`,
        requirement_ids: question.requirement_ids,
        category: question.category,
        prompt: question.prompt,
        answer_outline: question.answer_outline,
        difficulty: question.difficulty,
      }),
    );

    validateGeneratedInterviewQuestions(questions, role);

    return questions;
  }
}
