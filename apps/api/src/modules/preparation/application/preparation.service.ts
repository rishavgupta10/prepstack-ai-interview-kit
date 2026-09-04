import { PreparationRepository } from "../infrastructure/preparation.repository";
import { ResumeMetaDataRepository } from "../../resume/infrastructure/resumemeta.repository";
import { AIService } from "../../../ai/core/ai.service";
import { parseResumeToMetadata } from "../../../ai/parsers/resume-metadata.parser";
import { initialPreparationPrompt, generateMoreQuestionsPrompt } from "../../../ai/prompts/preparation.prompt";
import { ResumeService } from "../../resume/application/resume.service";

const preparationRepository = new PreparationRepository();
const resumeMetaDataRepository = new ResumeMetaDataRepository();
const resumeService = new ResumeService();
const aiService = new AIService();

export class PreparationService {
  async createPreparation(userId: string, jobDescription: string) {
    // 1. Fetch user's ResumeMetaData
    // const resumeMetaData = await resumeMetaDataRepository.fetchResumeMetaData(userId);
     const resumeMetaData = await resumeService.getMyResumeRawText(userId);
    if (!resumeMetaData) {
      throw new Error("No resume found. Please build or upload your resume in the Resume Builder first to tailor the preparation.");
    }

    try {
      // 2. Generate initial introduction and 20 Q&As
      console.log(`Generating interview preparation for user ${userId}...`);
      const prompt = initialPreparationPrompt(resumeMetaData, jobDescription);
      const aiResponse = await aiService.generate(prompt);
      const parsedData = parseResumeToMetadata(aiResponse);

      // 3. Save to database
      const preparation = await preparationRepository.create({
        userId,
        jobDescription,
        introductionScript: parsedData.introductionScript || "Self introduction tailored to the role.",
        questions: parsedData.questions || [],
      });

      return preparation;
    } catch (error) {
      console.error("Failed to generate preparation script and questions:", error);
      throw new Error("Failed to generate preparation: " + error.message);
    }
  }

  async generateMoreQuestions(userId: string, preparationId: string) {
    // 1. Fetch existing preparation
    const preparation = await preparationRepository.findById(preparationId);
    if (!preparation) {
      throw new Error("Preparation not found");
    }

    // Verify ownership
    if (preparation.userId.toString() !== userId) {
      throw new Error("Unauthorized access to this preparation");
    }

    // 2. Fetch user's ResumeMetaData
    const resumeMetaData = await resumeMetaDataRepository.fetchResumeMetaData(userId);
    if (!resumeMetaData) {
      throw new Error("No resume found. Please build or upload your resume first.");
    }

    try {
      // Extract existing questions to avoid duplicates
      const existingQuestions = preparation.questions.map((q) => q.question);

      console.log(`Generating 5 more unique questions for preparation ${preparationId}...`);
      const prompt = generateMoreQuestionsPrompt(resumeMetaData, preparation.jobDescription, existingQuestions);
      const aiResponse = await aiService.generate(prompt);
      const parsedData = parseResumeToMetadata(aiResponse);

      const newQuestions = parsedData.questions || [];

      // 3. Append new questions to DB
      const updatedPrep = await preparationRepository.addQuestions(preparationId, newQuestions);
      return updatedPrep;
    } catch (error) {
      console.error("Failed to generate more preparation questions:", error);
      throw new Error("Failed to generate more questions: " + error.message);
    }
  }

  async getPreparations(userId: string) {
    return preparationRepository.findByUserId(userId);
  }

  async getPreparationDetail(userId: string, preparationId: string) {
    const preparation = await preparationRepository.findById(preparationId);
    if (!preparation) {
      throw new Error("Preparation not found");
    }

    // Verify ownership
    if (preparation.userId.toString() !== userId) {
      throw new Error("Unauthorized access");
    }

    return preparation;
  }
}
