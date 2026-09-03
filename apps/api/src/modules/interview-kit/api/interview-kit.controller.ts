import { Request, Response } from "express";

import { CreateInterviewKitService } from "../application/create-interview-kit.service";

import { GetInterviewKitService } from "../application/get-interview-kit.service";
import { GetInterviewKitsService } from "../application/get-interview-kits.service";
import { DeleteInterviewKitService } from "../application/delete-interview-kit.service";
import { UpdateInterviewKitService } from "../application/update-interview-kit.service";

export class InterviewKitController {
  private readonly createInterviewKitService: CreateInterviewKitService;
  private readonly getInterviewKitService: GetInterviewKitService;
  private readonly getInterviewKitsService: GetInterviewKitsService;
  private readonly deleteInterviewKitService: DeleteInterviewKitService;
  private readonly updateInterviewKitService: UpdateInterviewKitService;

  constructor() {
    this.createInterviewKitService = new CreateInterviewKitService();
    this.getInterviewKitService = new GetInterviewKitService();
    this.getInterviewKitsService = new GetInterviewKitsService();
    this.deleteInterviewKitService = new DeleteInterviewKitService();
    this.updateInterviewKitService = new UpdateInterviewKitService();
  }

  createInterviewKit = async (req: Request, res: Response) => {
    try {
      const userId = req.user.userId;

      const result = await this.createInterviewKitService.execute(
        userId,
        req.body,
      );

      return res.status(201).json(result);
    } catch (error) {
      return res.status(400).json({
        message:
          error instanceof Error
            ? error.message
            : "Failed to create interview kit.",
      });
    }
  };

  getInterviewKit = async (req: Request, res: Response) => {
    try {
      const userId = req.user.userId;
      const { id } = req.params;

      const result = await this.getInterviewKitService.execute(id, userId);

      return res.status(200).json(result);
    } catch (error) {
      return res.status(404).json({
        message:
          error instanceof Error ? error.message : "Interview kit not found.",
      });
    }
  };

  getInterviewKits = async (req: Request, res: Response) => {
    try {
      const userId = req.user.userId;

      const result = await this.getInterviewKitsService.execute(userId);

      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({
        message:
          error instanceof Error
            ? error.message
            : "Failed to fetch interview kits.",
      });
    }
  };

  deleteInterviewKit = async (req: Request, res: Response) => {
    try {
      const userId = req.user.userId;
      const { id } = req.params;

      await this.deleteInterviewKitService.execute(id, userId);

      return res.status(204).send();
    } catch (error) {
      return res.status(404).json({
        message:
          error instanceof Error ? error.message : "Interview kit not found.",
      });
    }
  };

  updateInterviewKit = async (req: Request, res: Response) => {
    try {
      const userId = req.user.userId;
      const { id } = req.params;

      const result = await this.updateInterviewKitService.execute(
        id,
        userId,
        req.body,
      );

      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({
        message:
          error instanceof Error
            ? error.message
            : "Failed to update interview kit.",
      });
    }
  };
}
