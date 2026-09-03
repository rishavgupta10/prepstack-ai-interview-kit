import { PreparationModel } from "../model/preparation.model";

export class PreparationRepository {
  async create(data: {
    userId: string;
    jobDescription: string;
    introductionScript: string;
    questions: Array<{ question: string; answer: string }>;
  }) {
    return PreparationModel.create(data);
  }

  async findById(id: string) {
    return PreparationModel.findById(id);
  }

  async findByUserId(userId: string) {
    return PreparationModel.find({ userId }).sort({ createdAt: -1 });
  }

  async addQuestions(id: string, questions: Array<{ question: string; answer: string }>) {
    return PreparationModel.findByIdAndUpdate(
      id,
      {
        $push: { questions: { $each: questions } },
      },
      { new: true }
    );
  }

  async deleteById(id: string) {
    return PreparationModel.findByIdAndDelete(id);
  }
}
