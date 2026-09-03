import type { InterviewFlashcard, InterviewRole } from "./types";

export function validateGeneratedInterviewFlashcards(
  flashcards: InterviewFlashcard[],
  role: InterviewRole,
): void {
  if (!Array.isArray(flashcards)) {
    throw new Error("Generated flashcards must be an array.");
  }

  const requirementIds = new Set(
    role.requirements.map((requirement) => requirement.id),
  );

  const flashcardIds = new Set<string>();

  for (const flashcard of flashcards) {
    if (!flashcard || typeof flashcard !== "object") {
      throw new Error("Invalid generated flashcard.");
    }

    if (typeof flashcard.id !== "string" || flashcard.id.trim().length === 0) {
      throw new Error("Generated flashcard ID is required.");
    }

    if (flashcardIds.has(flashcard.id)) {
      throw new Error(`Duplicate flashcard ID: ${flashcard.id}`);
    }

    flashcardIds.add(flashcard.id);

    if (
      typeof flashcard.front !== "string" ||
      flashcard.front.trim().length === 0
    ) {
      throw new Error(`Flashcard ${flashcard.id} must have a front.`);
    }

    if (
      typeof flashcard.back !== "string" ||
      flashcard.back.trim().length === 0
    ) {
      throw new Error(`Flashcard ${flashcard.id} must have a back.`);
    }

    if (
      !Array.isArray(flashcard.requirement_ids) ||
      flashcard.requirement_ids.length === 0
    ) {
      throw new Error(
        `Flashcard ${flashcard.id} must reference at least one requirement.`,
      );
    }

    for (const requirementId of flashcard.requirement_ids) {
      if (!requirementIds.has(requirementId)) {
        throw new Error(
          `Flashcard ${flashcard.id} references unknown requirement ${requirementId}.`,
        );
      }
    }
  }
}
