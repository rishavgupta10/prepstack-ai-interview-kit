import { Router } from "express";

import { InterviewController } from "./interview.controller";

import { authMiddleware } from "../../../shared/middleware/auth.middleware";

const router = Router();

const interviewController = new InterviewController();

router.post("/start", authMiddleware, interviewController.startInterview);

router.post("/message", authMiddleware, interviewController.sendMessage);
router.get("/", authMiddleware, interviewController.getMyInterviews);
router.get("/:id", authMiddleware, interviewController.getInterviewDetails);
router.delete("/:id",authMiddleware,interviewController.deleteInterview)

export default router;
