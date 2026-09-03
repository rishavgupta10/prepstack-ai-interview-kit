import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    interviewId: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "Interview",

      required: true,
    },

    sender: {
      type: String,

      enum: ["user", "ai"],

      required: true,
    },

    content: {
      type: String,

      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const MessageModel = mongoose.model("Message", messageSchema);
