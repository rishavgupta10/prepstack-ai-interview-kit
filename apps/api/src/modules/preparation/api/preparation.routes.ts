import { Router } from "express";
import { authMiddleware } from "../../../shared/middleware/auth.middleware";
import { PreparationController } from "./preparation.controller";

const router = Router();
const preparationController = new PreparationController();

router.post("/", authMiddleware, preparationController.createPreparation);
router.get("/", authMiddleware, preparationController.getPreparations);
router.get("/:id", authMiddleware, preparationController.getPreparationDetail);
router.post("/:id/more", authMiddleware, preparationController.generateMoreQuestions);

export default router;
