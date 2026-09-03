import { AIService } from "../../../ai/core/ai.service";
import { extractJdRequirementsPrompt } from "../../../ai/prompts/interview-kit/extract-jd-requirements.prompt";
import { validateExtractedInterviewRole } from "../domain/jd-extractation.validation";
import type { InterviewRole } from "../domain/types";
import { assignRequirementIds } from "./assign-requirement-ids";

export class ExtractJdRequirementsService {
  private readonly aiService: AIService;

  constructor() {
    this.aiService = new AIService();
  }

  async execute(jd: string): Promise<InterviewRole> {
    const prompt = extractJdRequirementsPrompt(jd);

    const response = await this.aiService.generate(prompt);

    const cleanedResponse = response
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();

    const parsedResponse: unknown = JSON.parse(cleanedResponse);

    validateExtractedInterviewRole(parsedResponse);

    return assignRequirementIds(parsedResponse);
  }
}
