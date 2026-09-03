import { Types } from "mongoose";
import { ReportModel } from "../model/report.model";

export class ReportRepository {
  async create(data: any) {
    return ReportModel.create(data);
  }

  async findByInterviewId(interviewId: string) {
    return ReportModel.findOne({
      interviewId,
    }).populate("interviewId");
  }

  // report.repository.ts

  async getReportStats(userId: string) {
    return ReportModel.aggregate([
      {
        $match: {
          userId: new Types.ObjectId(userId),
        },
      },

      {
        $lookup: {
          from: "interviews",

          localField: "interviewId",

          foreignField: "_id",

          as: "interview",
        },
      },

      {
        $unwind: "$interview",
      },

      {
        $project: {
          id: "$_id",

          interviewId: 1,

          role: "$interview.role",

          mode: "$interview.mode",

          date: {
            $dateToString: {
              format: "%Y-%m-%d",

              date: "$createdAt",
            },
          },

          overall: "$overallScore",

          technical: "$technicalScore",

          communication: "$communicationScore",
        },
      },

      {
        $addFields: {
          verdict: {
            $cond: [
              {
                $gte: ["$overall", 4],
              },
              "pass",
              "needs-improvement",
            ],
          },
        },
      },

      {
        $sort: {
          date: -1,
        },
      },
    ]);
  }
}
