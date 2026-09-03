import { Router } from "express";
import { authMiddleware } from "../../../shared/middleware/auth.middleware";
import { upload } from "../../../shared/middleware/upload.middleware";
import { ResumeController } from "./resume.controller";
const router = Router();

let resumeController = new ResumeController();

router.post(
  "/upload",

  authMiddleware,

  upload.single("resume"),

  resumeController.uploadResume,
);

router.get("/me", authMiddleware, resumeController.getMyResume);
router.post("/analyze", authMiddleware, resumeController.analyzeResume);

export default router;
