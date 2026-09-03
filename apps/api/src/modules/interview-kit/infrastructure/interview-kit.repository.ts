import { InterviewKitModel } from "../model/interview-kit.model";

export class InterviewKitRepository {
  async create(userId: string, data: object) {
    return InterviewKitModel.create({
      userId,
      ...data,
    });
  }

  async findById(interviewKitId: string, userId: string) {
    return InterviewKitModel.findOne({
      _id: interviewKitId,
      userId,
    });
  }

  async findByUserId(userId: string) {
    return InterviewKitModel.find({
      userId,
    }).sort({
      createdAt: -1,
    });
  }

  async update(interviewKitId: string, userId: string, data: object) {
    return InterviewKitModel.findOneAndUpdate(
      {
        _id: interviewKitId,
        userId,
      },
      data,
      {
        new: true,
        runValidators: true,
      },
    );
  }

  async delete(interviewKitId: string, userId: string) {
    return InterviewKitModel.findOneAndDelete({
      _id: interviewKitId,
      userId,
    });
  }
}
