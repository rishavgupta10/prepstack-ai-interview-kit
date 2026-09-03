import { Router } from "express";

import { ReportController } from "./report.controller";

import { authMiddleware } from "../../../shared/middleware/auth.middleware";

const router = Router();

const reportController = new ReportController();

router.get("/:interviewId", authMiddleware, reportController.getReport);
router.post(
  "/:interviewId/generate",
  authMiddleware,
  reportController.generateReport,
);
router.get("/stats/get", authMiddleware, reportController.getReportStatus);

export default router;
