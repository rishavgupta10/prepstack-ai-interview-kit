import { Types } from "mongoose";
import { InterviewModel } from "../model/interview.model";

export class InterviewRepository {
  async create(data: { userId: string; mode: string; role: string }) {
    return InterviewModel.create(data);
  }

  async findById(interviewId: string) {
    return InterviewModel.findById(interviewId);
  }

  async markCompleted(interviewId: string) {
    return InterviewModel.findByIdAndUpdate(
      interviewId,
      {
        status: "completed",
      },
      {
        new: true,
      },
    );
  }

  async findByUserId(userId: string) {
    return InterviewModel.find({
      userId,
    }).sort({
      createdAt: -1,
    });
  }

  async getDashboardStats(userId: string) {
    return InterviewModel.aggregate([
      {
        $match: {
          userId: new Types.ObjectId(userId),
        },
      },

      {
        $lookup: {
          from: "reports",

          localField: "_id",

          foreignField: "interviewId",

          as: "report",
        },
      },

      {
        $unwind: {
          path: "$report",
          preserveNullAndEmptyArrays: true,
        },
      },

      {
        $group: {
          _id: null,

          totalInterviews: {
            $sum: 1,
          },

          completedInterviews: {
            $sum: {
              $cond: [
                {
                  $eq: ["$status", "completed"],
                },
                1,
                0,
              ],
            },
          },

          averageScore: {
            $avg: "$report.overallScore",
          },

          passedReports: {
            $sum: {
              $cond: [
                {
                  $gte: ["$report.overallScore", 4],
                },
                1,
                0,
              ],
            },
          },

          totalReports: {
            $sum: {
              $cond: [
                {
                  $ifNull: ["$report._id", false],
                },
                1,
                0,
              ],
            },
          },
        },
      },

      {
        $project: {
          _id: 0,

          totalInterviews: 1,

          completedInterviews: 1,

          averageScore: {
            $round: ["$averageScore", 1],
          },

          passRate: {
            $cond: [
              {
                $eq: ["$totalReports", 0],
              },
              0,
              {
                $round: [
                  {
                    $multiply: [
                      {
                        $divide: ["$passedReports", "$totalReports"],
                      },
                      100,
                    ],
                  },
                  0,
                ],
              },
            ],
          },
        },
      },
    ]);
  }
}
