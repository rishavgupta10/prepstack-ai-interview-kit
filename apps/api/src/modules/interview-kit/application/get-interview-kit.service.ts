import { InterviewKitRepository } from "../infrastructure/interview-kit.repository";

export class GetInterviewKitService {
  private readonly interviewKitRepository: InterviewKitRepository;

  constructor() {
    this.interviewKitRepository = new InterviewKitRepository();
  }

  async execute(interviewKitId: string, userId: string) {
    const interviewKit = await this.interviewKitRepository.findById(
      interviewKitId,
      userId,
    );

    if (!interviewKit) {
      throw new Error("Interview kit not found.");
    }

    return interviewKit;
  }
}
