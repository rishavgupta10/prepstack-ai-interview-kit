import { InterviewKitRepository } from "../infrastructure/interview-kit.repository";
import type { CreateInterviewKitInput } from "../domain/input.types";
import { validateCreateInterviewKitInput } from "../domain/validation";
import { GenerateInterviewKitService } from "./generate-interview-kit.service";
import { validateInterviewKit } from "../domain/interview-kit.validation";

export class CreateInterviewKitService {
  private readonly interviewKitRepository: InterviewKitRepository;
  private readonly generateInterviewKitService: GenerateInterviewKitService;

  constructor() {
    this.interviewKitRepository = new InterviewKitRepository();
    this.generateInterviewKitService = new GenerateInterviewKitService();
  }

  async execute(userId: string, input: CreateInterviewKitInput) {
    validateCreateInterviewKitInput(input);

    const kit = await this.generateInterviewKitService.execute(
      input.jd,
      input.company_url,
      input.days,
    );

    validateInterviewKit(kit, input.days);

    return this.interviewKitRepository.create(userId, kit);
  }
}
