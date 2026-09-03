import type { InterviewFlashcard, InterviewQuestion } from "./types";

export interface UpdateInterviewKitInput {
  questions?: InterviewQuestion[];
  flashcards?: InterviewFlashcard[];
}

export function validateUpdateInterviewKitInput(
  input: unknown,
): asserts input is UpdateInterviewKitInput {
  if (!input || typeof input !== "object") {
    throw new Error("Invalid interview kit update.");
  }

  const data = input as Record<string, unknown>;

  const allowedFields = new Set(["questions", "flashcards"]);

  for (const key of Object.keys(data)) {
    if (!allowedFields.has(key)) {
      throw new Error(`Field "${key}" cannot be updated.`);
    }
  }

  if (data.questions !== undefined && !Array.isArray(data.questions)) {
    throw new Error("Questions must be an array.");
  }

  if (data.flashcards !== undefined && !Array.isArray(data.flashcards)) {
    throw new Error("Flashcards must be an array.");
  }
}
