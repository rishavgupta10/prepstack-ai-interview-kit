import { Router } from "express";
import { AuthController } from "./auth.controller";
import { authMiddleware } from "../../../shared/middleware/auth.middleware";

const router = Router();
let authController = new AuthController();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/google", authController.googleLogin);
router.post("/logout", authMiddleware, authController.logout);
router.get("/me", authMiddleware, authController.getCurrentUser);
export default router;
