import mongoose from "mongoose";

const questionAnswerSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
});

const preparationSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    jobDescription: { type: String, required: true },
    introductionScript: { type: String, required: true },
    questions: [questionAnswerSchema],
  },
  {
    timestamps: true,
  }
);

export const PreparationModel = mongoose.model("Preparation", preparationSchema);
