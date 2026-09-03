import mongoose from "mongoose";

const interviewSchema =
  new mongoose.Schema(
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      mode: {
        type: String,
        required: true,
      },

      role: {
        type: String,
        required: true,
      },

      status: {
        type: String,
        enum: [
          "active",
          "completed",
        ],
        default: "active",
      },
    },
    {
      timestamps: true,
    }
  );

export const InterviewModel =
  mongoose.model(
    "Interview",
    interviewSchema
  );