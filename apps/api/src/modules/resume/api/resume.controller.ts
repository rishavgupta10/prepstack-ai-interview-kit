import { Request, Response } from "express";
import { ResumeService } from "../application/resume.service";
import { apiResponse } from "../../../shared/utils/api-response";
import { ResumeAnalysisService } from "../application/resume-analysis.service";

const resumeService = new ResumeService();
const resumeAnalysisService = new ResumeAnalysisService();

export class ResumeController {
  uploadResume = async (req: Request, res: Response) => {
    try {
      const userId = req.user!.userId;
      const file = req.file!;
      const resume = await resumeService.uploadResume(userId, file);
      let response = apiResponse(true, "Resume uploaded successfully", resume);
      return res.json(response);
    } catch (error) {
      let response = apiResponse(false, error?.message, null);
      return res.status(500).json(response);
    }
  };

  getMyResume = async (req: Request, res: Response) => {
    try {
      const resume = await resumeService.getMyResume(req.user?.userId);
      if (!resume) {
        let response = apiResponse(false, "Resume not found", null);
        return res.status(404).json(response);
      }
      let response = apiResponse(true, "Resume fetched successfully", resume);
      return res.json(response);
    } catch (error) {
      let response = apiResponse(false, error?.message, null);
      return res.status(500).json(response);
    }
  };

  analyzeResume = async (req: Request, res: Response) => {
    try {
      const userId = req.user!.userId;
      const result = await resumeAnalysisService.analyzeResumeForUser(userId);
      let response = apiResponse(true, "resume analyzed successfully", result);
      return res.status(200).json(response);
    } catch (error) {
      let response = apiResponse(
        false,
        error.message || "failed to analyze",
        null,
      );
      return res.status(500).json(response);
    }
  };
}
