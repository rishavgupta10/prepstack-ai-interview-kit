import { MessageModel } from "../model/message.model";

export class MessageRepository {
  async create(data: {
    interviewId: string;
    sender: "user" | "ai";
    content: string;
  }) {
    return MessageModel.create(data);
  }

  async findByInterviewId(interviewId: string) {
    return MessageModel.find({
      interviewId,
    }).sort({
      createdAt: 1,
    });
  }

  async getConversationHistory(interviewId: string) {
    return MessageModel.find({
      interviewId,
    })
      .sort({
        createdAt: 1,
      })
      .lean();
  }
}
