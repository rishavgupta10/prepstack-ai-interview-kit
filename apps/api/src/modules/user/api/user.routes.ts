import { Router } from "express";
import { UserController } from "./user.controller";
import { authMiddleware } from "../../../shared/middleware/auth.middleware";
const router = Router();
const userController = new UserController();

router.get("/profile", authMiddleware, userController.getUserProfile);
router.patch(
  "/profile/update",
  authMiddleware,
  userController.updateUserProfile,
);

export default router;
