import { Request, Response } from "express";
import { UserService } from "../application/user.service";
import { apiResponse } from "../../../shared/utils/api-response";
export class UserController {
  async getUserProfile(req: Request, res: Response) {
    try {
      const userServices = new UserService();
      console.log(req.user);
      const result = await userServices.getUserProfile(req?.user.userId);
      let response = apiResponse(true, "User profile successfully", result);
      res.status(201).json(response);
    } catch (error: any) {
      res.status(400).json(apiResponse(false, error.message));
    }
  }

  async updateUserProfile(req: Request, res: Response) {
    try {
      const userService = new UserService();
      if (req.body?.password) {
        return res
          .status(403)
          .json(apiResponse(false, "can't update password from here"));
      }
      let updateRes = await userService.updateUserProfile(req.user.userId, req.body);
      let response = apiResponse(
        true,
        "profile updated successfully",
        updateRes,
      );
      res.status(200).json(response);
    } catch (error: any) {
      res.status(500).json(apiResponse(false, error.message));
    }
  }
}
