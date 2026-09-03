import { AIService } from "../../../ai/core/ai.service";
import { parseInterviewReport } from "../../../ai/parsers/report.parser";
import { evaluateInterviewPrompt } from "../../../ai/prompts/report/evaluate-interview.prompt";
import { GeminiProvider } from "../../../ai/providers/gemini.provider";
import { InterviewRepository } from "../../interview/infrastructure/interview.repository";
import { MessageRepository } from "../../interview/infrastructure/message.repository";
import { ResumeRepository } from "../../resume/infrastructure/resume.repository";
import { ReportRepository } from "../infrastructure/report.repository";
import { formatReportConversation } from "./utils/format-report-conversation";

const interviewRepository = new InterviewRepository();
const messageRepository = new MessageRepository();
const resumeRepository = new ResumeRepository();
const aiServiceProvider = new AIService();
const reportRepository = new ReportRepository();

export class ReportService {
  async generateReport(interviewId: string, userId: string) {
    const interview = await interviewRepository.findById(interviewId);
    if (!interview) {
      throw new Error("Interview not found");
    }

    //verify ownership
    if (interview.userId.toString() !== userId) {
      throw new Error("Unauthorized");
    }

    //load resume and messages
    const resume = await resumeRepository.findByUserId(userId);
    if (!resume) {
      throw new Error("Resume not found");
    }
    const messages =
      await messageRepository.getConversationHistory(interviewId);
    //load conversation history and format it for the prompt
    const conversation = formatReportConversation(messages);

    // /create the prompt for Gemini using the conversation history and resume data
    const prompt = evaluateInterviewPrompt(resume.rawText, conversation);

    //generate the response
    const response = await aiServiceProvider.generate(prompt);
    //return the generated report
    const report = parseInterviewReport(response);
    //save the report to the database
    await reportRepository.create({
      userId,
      interviewId,

      ...report,
    });
    //mark interview as completed
    await interviewRepository.markCompleted(interviewId);
    return report;
  }
  async getReport(interviewId: string) {
    try {
      const report = await reportRepository.findByInterviewId(interviewId);

      if (!report) {
        throw new Error("Report not found");
      }

      return report;
    } catch (error) {
      console.error("Error fetching report:", error);

      throw new Error("Failed to fetch report");
    }
  }
  async getReportStatus( userId: string) {
    try {
      const report = await reportRepository.getReportStats(userId);

      if (!report) {
        throw new Error("Report not found");
      }

      return report;
    } catch (error) {
      console.error("Error fetching report:", error);

      throw new Error("Failed to fetch report");
    }
  }
}
