import { InterviewKitRepository } from "../infrastructure/interview-kit.repository";

export class DeleteInterviewKitService {
  private readonly interviewKitRepository: InterviewKitRepository;

  constructor() {
    this.interviewKitRepository = new InterviewKitRepository();
  }

  async execute(interviewKitId: string, userId: string) {
    const deletedKit = await this.interviewKitRepository.delete(
      interviewKitId,
      userId,
    );

    if (!deletedKit) {
      throw new Error("Interview kit not found.");
    }

    return deletedKit;
  }
}
