import mongoose from "mongoose";
import { UserModel } from "../model/user.model";

export class UserRepository {
  async findByEmail(email: string) {
    return UserModel.findOne({ email });
  }

  async create(data: {
    name: string;
    email: string;
    password?: string;
    googleId?: string | undefined;
    avatar?: string | undefined;
    authProvider?: "local" | "google";
  }) {
    return UserModel.create({
      ...data,
      authProvider: data.authProvider ?? "local",
    });
  }

  async findById(id: string) {
    return UserModel.findById(id);
  }

  async findByGoogleId(googleId: string) {
    return UserModel.findOne({ googleId });
  }

  async getUserProfile(id: string) {
    const objectId = new mongoose.Types.ObjectId(id);
    let result = await UserModel.aggregate([
      {
        $match: {
          _id: objectId,
        },
      },
      {
        $lookup: {
          from: "resumes",
          let: {
            currentUser: "$_id",
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$userId", "$$currentUser"],
                },
              },
            },
            {
              $project: {
                skills: 1,
                experienceYears: 1,
                _id: 0,
              },
            },
          ],
          localField: "_id",
          foreignField: "userId",
          as: "resume",
        },
      },
      { $unwind: { path: "$resume", preserveNullAndEmptyArrays: true } },
      {
        $addFields: {
          skills: "$resume.skills",
          experience: "$resume.experienceYears",
        },
      },
      {
        $project: {
          resume: 0,
          password: 0,
        },
      },
    ]);
    // console.log(result);
    return result[0];
  }

  async updateUserProfile(id: string, payload: object) {
    let updatedres = await UserModel.findByIdAndUpdate(id, payload, {
      new: true,
    });
    return updatedres;
  }
}
