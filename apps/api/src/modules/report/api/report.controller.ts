import { Request, Response } from "express";

import { ReportService } from "../application/report.service";
import { apiResponse } from "../../../shared/utils/api-response";

const reportService = new ReportService();

export class ReportController {
  generateReport = async (req: Request, res: Response) => {
    const interviewId = req.params.interviewId;

    const userId = req.user!.userId;

    const report = await reportService.generateReport(interviewId, userId);

    return res.status(200).json({
      success: true,
      data: report,
    });
  };
  getReport = async (req: Request, res: Response) => {
    try {
      const report = await reportService.getReport(req.params.interviewId);

      const response = apiResponse(true, "Report fetched successfully", report);

      return res.status(200).json(response);
    } catch (error) {
      const response = apiResponse(
        false,
        error?.message || "Failed to fetch report",
        null,
      );

      return res.status(500).json(response);
    }
  };
  getReportStatus = async (req: Request, res: Response) => {
    const userId = req.user!.userId;
    console.log("userId",userId)
    try {
      const report = await reportService.getReportStatus(userId);

      const response = apiResponse(true, "Report fetched successfully", report);

      return res.status(200).json(response);
    } catch (error) {
      const response = apiResponse(
        false,
        error?.message || "Failed to fetch report",
        null,
      );

      return res.status(500).json(response);
    }
  };
}
