import { ResumeRepository } from "../infrastructure/resume.repository";
import { PdfService } from "./pdf.service";
import fs from "fs";

const resumeRepository = new ResumeRepository();

export class ResumeService {
  async uploadResume(userId: string, file: Express.Multer.File) {
    let pdfService = new PdfService();
    let checkprev = await resumeRepository.findByUserId(userId);
    if (checkprev) {
      let filePath = `${checkprev.fileUrl.replace(/\\/g, "/")}`;
      if (fs.existsSync(filePath)) {

        fs.unlinkSync(filePath);
      }
      await resumeRepository.findByIdAndDelete(checkprev?._id);
    }
    const resume = await resumeRepository.create({
      userId,

      fileName: file.originalname,

      fileUrl: file.path,
    });
    const rawText = await pdfService.extractText(file.path);
    await resumeRepository.updateRawText(resume._id, rawText);

    return resume;
  }
  async getMyResume(userId: string) {
    const myresume = await resumeRepository.findByUserId(userId);
    return myresume;
  }

  async getMyResumeRawText(userId: string) {
    const myresume = await resumeRepository.findByUserResumeRawText(userId);
    return myresume;
  }
}
