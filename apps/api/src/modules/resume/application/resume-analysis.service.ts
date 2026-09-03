import { AIService } from "../../../ai/core/ai.service";
import { parseResumeAnalysis } from "../../../ai/parsers/resume.parser";
import { resumeAnalysisPrompt } from "../../../ai/prompts/resume-analysis.prompt";
import { ResumeRepository } from "../infrastructure/resume.repository";

const aIServiceProvider = new AIService();
const resumeRepository = new ResumeRepository();

export class ResumeAnalysisService {
  async analyzeResume(rawText: string) {
    try {
      const prompt = resumeAnalysisPrompt(rawText);
      const response = await aIServiceProvider.generate(prompt);
      const analysis = parseResumeAnalysis(response);
      return analysis;
    } catch (error) {
      console.error("Error analyzing resume:", error);
      throw new Error("Failed to analyze resume");
    }
  }
  async analyzeResumeForUser(userId: string) {
    try {
      const resume = await resumeRepository.findByUserIdwithRawText(userId);

      if (!resume) {
        throw new Error("Resume not found");
      }

      const prompt = resumeAnalysisPrompt(resume.rawText || "");


      const response = await aIServiceProvider.generate(prompt);

      const analysis = parseResumeAnalysis(response);

      const updatedResume = await resumeRepository.updateAnalysis(
        resume.id,
        analysis,
      );

      return updatedResume;
    } catch (error) {
      console.error("Error analyzing resume for user:", error);
      throw new Error(error.message || "Failed to analyze resume for user");
    }
  }
}
