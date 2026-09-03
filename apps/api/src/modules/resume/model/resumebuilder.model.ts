import mongoose from "mongoose";

// --- SUB-SCHEMAS ---

const PersonalSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    location: { type: String, required: true, trim: true },
    linkedin: { type: String, default: "LinkedIn" },
    linkedinUrl: { type: String, trim: true },
    github: { type: String, default: "GitHub" },
    githubUrl: { type: String, trim: true },
    portfolio: { type: String, default: "Portfolio" },
    portfolioUrl: { type: String, trim: true },
    summary: { type: String, required: true, trim: true },
  },
  { _id: false },
); // No separate _id needed for the personal object

const EducationSchema = new mongoose.Schema({
  school: { type: String, required: true, trim: true },
  degree: { type: String, required: true, trim: true },
  period: { type: String, required: true, trim: true },
  grade: { type: String, trim: true },
});

const SkillSchema = new mongoose.Schema({
  label: { type: String, required: true, trim: true },
  value: { type: String, required: true, trim: true },
});

const ExperienceSchema = new mongoose.Schema({
  role: { type: String, required: true, trim: true },
  company: { type: String, required: true, trim: true },
  period: { type: String, required: true, trim: true },
  points: [{ type: String, trim: true }],
});

const ProjectSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  type: { type: String, required: true, trim: true },
  url: { type: String, trim: true },
  urlLabel: { type: String, trim: true },
  description: { type: String, required: true, trim: true },
  points: [{ type: String, trim: true }],
});

// --- MAIN SCHEMA ---

const ResumeMetaDataSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId ,required:true},
    personal: { type: PersonalSchema, required: true },
    education: [EducationSchema],
    skills: [SkillSchema],
    experience: [ExperienceSchema],
    projects: [ProjectSchema],
  },
  {
    timestamps: true, // Automatically creates createdAt and updatedAt fields
  },
);

// --- MODEL EXPORT ---

export const ResumeMetaDataModel = mongoose.model(
  "ResumeMetaData",
  ResumeMetaDataSchema,
);
