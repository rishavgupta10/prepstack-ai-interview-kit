import mongoose from "mongoose";

const interviewKitSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    source: {
      company_name: {
        type: String,
        required: true,
      },

      company_url: {
        type: String,
        required: true,
      },

      role: {
        type: String,
        required: true,
      },

      location: {
        type: String,
        required: true,
      },

      jd_chars: {
        type: Number,
        required: true,
      },

      researched_at: {
        type: String,
        required: true,
      },

      pages_used: {
        type: [String],
        default: [],
      },
    },

    company_brief: {
      summary: {
        type: String,
        required: true,
      },

      what_they_do: {
        type: String,
        required: true,
      },

      sources: {
        type: [String],
        default: [],
      },
    },

    role: {
      title: {
        type: String,
        required: true,
      },

      seniority: {
        type: String,
        required: true,
      },

      responsibilities: {
        type: [String],
        default: [],
      },

      requirements: [
        {
          id: {
            type: String,
            required: true,
          },

          text: {
            type: String,
            required: true,
          },

          kind: {
            type: String,
            required: true,
          },

          priority: {
            type: String,
            enum: ["must", "nice"],
            required: true,
          },
        },
      ],
    },

    questions: [
      {
        id: {
          type: String,
          required: true,
        },

        requirement_ids: {
          type: [String],
          default: [],
        },

        category: {
          type: String,
          required: true,
        },

        prompt: {
          type: String,
          required: true,
        },

        answer_outline: {
          type: String,
          required: true,
        },

        difficulty: {
          type: Number,
          enum: [1, 2, 3],
          required: true,
        },
      },
    ],

    flashcards: [
      {
        id: {
          type: String,
          required: true,
        },

        front: {
          type: String,
          required: true,
        },

        back: {
          type: String,
          required: true,
        },

        requirement_ids: {
          type: [String],
          default: [],
        },
      },
    ],

    schedule: {
      days_available: {
        type: Number,
        required: true,
      },

      days: [
        {
          day: {
            type: Number,
            required: true,
          },

          focus: {
            type: String,
            required: true,
          },

          question_ids: {
            type: [String],
            default: [],
          },

          minutes: {
            type: Number,
            required: true,
          },
        },
      ],
    },

    coverage: {
      uncovered_requirement_ids: {
        type: [String],
        default: [],
      },

      passes: {
        type: Number,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  },
);

export const InterviewKitModel = mongoose.model(
  "InterviewKit",
  interviewKitSchema,
);
