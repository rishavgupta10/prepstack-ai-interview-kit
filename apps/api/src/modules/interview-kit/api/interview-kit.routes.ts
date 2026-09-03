import { Router } from "express";

import { InterviewKitController } from "./interview-kit.controller";

import { authMiddleware } from "../../../shared/middleware/auth.middleware";

const router = Router();

const interviewKitController = new InterviewKitController();

router.post("/", authMiddleware, interviewKitController.createInterviewKit);
router.get("/", authMiddleware, interviewKitController.getInterviewKits);
router.get("/:id", authMiddleware, interviewKitController.getInterviewKit);
router.patch("/:id", authMiddleware, interviewKitController.updateInterviewKit);
router.delete(
  "/:id",
  authMiddleware,
  interviewKitController.deleteInterviewKit,
);

export default router;
