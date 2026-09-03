import type { InterviewKit } from "./types";
import { validateInterviewSchedule } from "./schedule.validation";
import { validateGeneratedInterviewQuestions } from "./question-generation.validation";
import { validateGeneratedInterviewFlashcards } from "./flashcard-generation.validation";

export function validateInterviewKit(
  kit: InterviewKit,
  expectedDays: number,
): void {
  if (!kit || typeof kit !== "object") {
    throw new Error("Invalid interview kit.");
  }

  if (!kit.source?.company_url) {
    throw new Error("Interview kit company URL is required.");
  }

  if (!kit.source?.role) {
    throw new Error("Interview kit role is required.");
  }

  if (!kit.role) {
    throw new Error("Interview kit role data is required.");
  }

  if (!Array.isArray(kit.role.requirements)) {
    throw new Error("Interview requirements must be an array.");
  }

  if (kit.schedule.days_available !== expectedDays) {
    throw new Error("Interview schedule does not match requested days.");
  }

  validateGeneratedInterviewQuestions(kit.questions, kit.role);

  validateGeneratedInterviewFlashcards(kit.flashcards, kit.role);

  validateInterviewSchedule(kit.schedule, kit.role, kit.questions);

  if (
    !Number.isInteger(kit.coverage.passes) ||
    kit.coverage.passes < 1 ||
    kit.coverage.passes > 2
  ) {
    throw new Error("Interview coverage passes must be 1 or 2.");
  }

  const requirementIds = new Set(
    kit.role.requirements.map((requirement) => requirement.id),
  );

  for (const requirementId of kit.coverage.uncovered_requirement_ids) {
    if (!requirementIds.has(requirementId)) {
      throw new Error(
        `Coverage references unknown requirement ${requirementId}.`,
      );
    }
  }
}
