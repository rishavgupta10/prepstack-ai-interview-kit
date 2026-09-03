import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    phone: { type: String, default: "" },
    profileUrl: { type: String, default: "" },
    summary: { type: String, default: "" },
    portfolioUrl: { type: String, default: "", trim: true },
    linkedinUrl: { type: String, default: "", trim: true },
    avatarUrl: { type: String, default: "", trim: true },
    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },
    avatar: {
      type: String,
    },
    authProvider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },
  },
  {
    timestamps: true,
  },
);

export const UserModel = mongoose.model("User", userSchema);
