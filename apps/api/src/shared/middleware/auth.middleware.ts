import { Request, Response, NextFunction } from "express";

import { verifyToken } from "../utils/jwt";

import { JwtPayload } from "../types/auth.types";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = verifyToken(token) as JwtPayload;

    req.user = {
      userId: decoded.userId,
      name: decoded.name,
      email: decoded.email,
    };

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};
