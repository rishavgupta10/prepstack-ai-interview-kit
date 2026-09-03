import { InterviewKitRepository } from "../infrastructure/interview-kit.repository";

export class GetInterviewKitsService {
  private readonly interviewKitRepository: InterviewKitRepository;

  constructor() {
    this.interviewKitRepository = new InterviewKitRepository();
  }

  async execute(userId: string) {
    return this.interviewKitRepository.findByUserId(userId);
  }
}
