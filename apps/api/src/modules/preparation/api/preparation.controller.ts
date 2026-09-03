import { Request, Response } from "express";
import { PreparationService } from "../application/preparation.service";
import { apiResponse } from "../../../shared/utils/api-response";

const preparationService = new PreparationService();

export class PreparationController {
  createPreparation = async (req: Request, res: Response) => {
    const { userId } = req.user!;
    const { jobDescription } = req.body;
    try {
      if (!jobDescription) {
        return res.status(400).json(apiResponse(false, "Job description is required"));
      }
      const preparation = await preparationService.createPreparation(userId, jobDescription);
      res.status(201).json(apiResponse(true, "Interview preparation created successfully", preparation));
    } catch (error) {
      console.error("Controller Error in createPreparation:", error);
      res.status(500).json(apiResponse(false, error.message));
    }
  };

  getPreparations = async (req: Request, res: Response) => {
    const { userId } = req.user!;
    try {
      const preparations = await preparationService.getPreparations(userId);
      res.status(200).json(apiResponse(true, "Preparations list fetched successfully", preparations));
    } catch (error) {
      console.error("Controller Error in getPreparations:", error);
      res.status(500).json(apiResponse(false, error.message));
    }
  };

  getPreparationDetail = async (req: Request, res: Response) => {
    const { userId } = req.user!;
    const { id } = req.params;
    try {
      const preparation = await preparationService.getPreparationDetail(userId, id);
      res.status(200).json(apiResponse(true, "Preparation details fetched successfully", preparation));
    } catch (error) {
      console.error("Controller Error in getPreparationDetail:", error);
      res.status(500).json(apiResponse(false, error.message));
    }
  };

  generateMoreQuestions = async (req: Request, res: Response) => {
    const { userId } = req.user!;
    const { id } = req.params;
    try {
      const updatedPrep = await preparationService.generateMoreQuestions(userId, id);
      res.status(200).json(apiResponse(true, "Additional questions generated successfully", updatedPrep));
    } catch (error) {
      console.error("Controller Error in generateMoreQuestions:", error);
      res.status(500).json(apiResponse(false, error.message));
    }
  };
}
