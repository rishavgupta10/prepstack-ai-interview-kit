import { ResumeMetaDataRepository } from "../infrastructure/resumemeta.repository";
import { ICreateResumeMetaDataInput } from "../domain/resumemetadata.dto";
import { ResumeRepository } from "../infrastructure/resume.repository";
import { AIService } from "../../../ai/core/ai.service";
import { resumeMetadataPrompt } from "../../../ai/prompts/resume-metadata.prompt";
import { parseResumeToMetadata } from "../../../ai/parsers/resume-metadata.parser";
import { resumeEnhancePrompt } from "../../../ai/prompts/resume-enhance.prompt";

const resumemetadataRepository = new ResumeMetaDataRepository();
const resumeRepository = new ResumeRepository();
const aiService = new AIService();

export class ResumeMetaDataService {
  async create(data: ICreateResumeMetaDataInput) {
    try {
      if (data?._id) {
        const isExist = await resumemetadataRepository.findByResumeId(data._id);
        if (isExist) {
          const update = await resumemetadataRepository.FindByIdAndUpdate(
            isExist?._id,
            data,
          );
          return update;
        }
      }

      const result = await resumemetadataRepository.create(data);
      return result;
    } catch (error) {
      console.log(error.message);
      throw new Error("failed to creaate");
    }
  }

  async fetchResumeMetaData(userId: string) {
    try {
      let result = await resumemetadataRepository.fetchResumeMetaData(userId);
      if (!result) {
        // If no metadata exists, check if there is an existing uploaded resume with raw text
        const resume = await resumeRepository.findByUserIdwithRawText(userId);
        if (resume && resume.rawText) {
          try {
            console.log("No ResumeMetaData found, but found existing resume. Parsing on-the-fly...");
            const prompt = resumeMetadataPrompt(resume.rawText);
            const aiResponse = await aiService.generate(prompt);
            const parsedData = parseResumeToMetadata(aiResponse);

            result = await resumemetadataRepository.create({
              ...parsedData,
              userId,
            });
            console.log("On-the-fly ResumeMetaData created successfully.");
          } catch (aiError) {
            console.error("Failed to parse existing resume on-the-fly:", aiError);
          }
        }
      }
      return result;
    } catch (error) {
      console.log(error);
      throw new Error("failed to get resume");
    }
  }

  async enhance(resumeData: any, jobDescription: string) {
    try {
      const prompt = resumeEnhancePrompt(resumeData, jobDescription);
      const aiResponse = await aiService.generate(prompt);
      const enhancedData = parseResumeToMetadata(aiResponse);
      return enhancedData;
    } catch (error) {
      console.error("Failed to enhance resume metadata:", error);
      throw new Error("Failed to enhance resume metadata: " + error.message);
    }
  }
}
