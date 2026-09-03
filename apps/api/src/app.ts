import express, { NextFunction, Request, Response } from "express";
import authRoutes from "./modules/auth/api/auth.routes";
import resumeRoutes from "./modules/resume/api/resume.routes";
import interviewRoutes from "./modules/interview/api/interview.routes";
import interviewKitRoutes from "./modules/interview-kit/api/interview-kit.routes";
import reportRoutes from "./modules/report/api/report.routes";
import userRoutes from "./modules/user/api/user.routes";
import preparationRoutes from "./modules/preparation/api/preparation.routes";
import cors from "cors";
import { authMiddleware } from "./shared/middleware/auth.middleware";
import { InterviewController } from "./modules/interview/api/interview.controller";
import { env } from "./config/env";
import { apiResponse } from "./shared/utils/api-response";
import { logger } from "./config/logger";
import loggerMiddleware from "./shared/middleware/logger.middleware";

const app = express();
const interviewController = new InterviewController();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [
      env.FRONTEND_URL || "http://localhost:3000",
    ],
  }),
);

app.use(loggerMiddleware);

app.get("/health-check", (req: Request, res: Response) => {
  res.status(200).json(apiResponse(true, "server is healthy", []));
});
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/interview", interviewRoutes);
app.use("/api/interview-kit", interviewKitRoutes);
app.use("/api/report", reportRoutes);
app.use("/api/preparation", preparationRoutes);
app.get(
  "/api/dashboard-stats",
  authMiddleware,
  interviewController.getDashboardStats,
);

export default app;
