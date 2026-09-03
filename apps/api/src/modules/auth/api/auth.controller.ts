import { apiResponse } from "../../../shared/utils/api-response";
import { AuthService } from "../application/auth.service";
import { Request, Response } from "express";

export class AuthController {
  // private authService = new AuthService();
  async register(req: Request, res: Response) {
    const authService = new AuthService();
    try {
      const result = await authService.register(req.body);
      let response = apiResponse(true, "User registered successfully", result);
      res.status(201).json(response);
    } catch (error: any) {
      res.status(400).json(apiResponse(false, error.message));
    }
  }

  async login(req: Request, res: Response) {
    const authService = new AuthService();
    try {
      const result = await authService.login(req.body);
      let response = apiResponse(true, "User logged in successfully", result);
      res.status(200).json(response);
    } catch (error: any) {
      res.status(400).json(apiResponse(false, error.message));
    }
  }

  async getCurrentUser(req: Request, res: Response) {
    let response = apiResponse(true, "User registered successfully", req?.user);
    return res.status(200).json(response);
  }

  async logout(req: Request, res: Response) {
    let response = apiResponse(true, "User registered successfully", null);
    return res.status(200).json(response);
  }

  async googleLogin(req: Request, res: Response) {
    const authService = new AuthService();
    try {
      const { credential } = req.body;
      if (!credential) {
        return res
          .status(400)
          .json(apiResponse(false, "Google credential is required", null));
      }

      const result = await authService.googleLogin(credential);

      return res
        .status(200)
        .json(apiResponse(true, "Google login successful", result));
    } catch (error: any) {
      res.status(500).json(apiResponse(false, error.message));
    }
  }
}
