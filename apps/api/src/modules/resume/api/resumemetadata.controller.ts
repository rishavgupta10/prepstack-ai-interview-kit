import { Request, Response } from "express";
import { ResumeMetaDataService } from "../application/resume-metadata.service";
import { apiResponse } from "../../../shared/utils/api-response";

const resumemetadataService = new ResumeMetaDataService();

export class ResumeMetaDataController {
  createResume = async (req: Request, res: Response) => {
    const { userId } = req?.user;
    const bodyData = req.body;
    try {
      const resume = await resumemetadataService.create({
        ...bodyData,
        userId,
      });
      const response = apiResponse(true, "resume created", resume);
      res.status(200).json(response);
    } catch (error) {
      const response = apiResponse(false, error?.message);
      res.status(500).json(response);
    }
  };
  fetchResumeMetaData = async (req:Request,res:Response)=>{
    const {userId} = req?.user
    try{
      const resume = await resumemetadataService.fetchResumeMetaData(userId)
      const response = apiResponse(true,"resume metadata fetched",resume)
      res.status(200).json(response)
    }catch(error){
      let response = apiResponse(false,error.message)
      res.status(500).json(response)
    }
  }
  enhanceResume = async (req: Request, res: Response) => {
    const { resumeData, jobDescription } = req.body;
    try {
      const enhancedResume = await resumemetadataService.enhance(resumeData, jobDescription);
      const response = apiResponse(true, "resume enhanced successfully", enhancedResume);
      res.status(200).json(response);
    } catch (error) {
      const response = apiResponse(false, error?.message);
      res.status(500).json(response);
    }
  };
}
