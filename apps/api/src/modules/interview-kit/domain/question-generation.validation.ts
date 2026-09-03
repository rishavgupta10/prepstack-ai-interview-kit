import type { InterviewQuestion, InterviewRole } from "./types";

const VALID_CATEGORIES = [
  "technical",
  "behavioural",
  "system design",
  "company fit",
] as const;

const VALID_DIFFICULTIES = [1, 2, 3] as const;

export function validateGeneratedInterviewQuestions(
  questions: InterviewQuestion[],
  role: InterviewRole,
): void {
  if (!Array.isArray(questions)) {
    throw new Error("Generated questions must be an array.");
  }

  const requirementIds = new Set(
    role.requirements.map((requirement) => requirement.id),
  );

  const questionIds = new Set<string>();

  for (const question of questions) {
    if (!question || typeof question !== "object") {
      throw new Error("Invalid generated question.");
    }

    if (typeof question.id !== "string" || question.id.trim().length === 0) {
      throw new Error("Generated question ID is required.");
    }

    if (questionIds.has(question.id)) {
      throw new Error(`Duplicate question ID: ${question.id}`);
    }

    questionIds.add(question.id);

    if (
      !Array.isArray(question.requirement_ids) ||
      question.requirement_ids.length === 0
    ) {
      throw new Error(
        `Question ${question.id} must reference at least one requirement.`,
      );
    }

    for (const requirementId of question.requirement_ids) {
      if (!requirementIds.has(requirementId)) {
        throw new Error(
          `Question ${question.id} references unknown requirement ${requirementId}.`,
        );
      }
    }

    if (!VALID_CATEGORIES.includes(question.category)) {
      throw new Error(`Invalid category for question ${question.id}.`);
    }

    if (
      typeof question.prompt !== "string" ||
      question.prompt.trim().length === 0
    ) {
      throw new Error(`Question ${question.id} must have a prompt.`);
    }

    if (
      typeof question.answer_outline !== "string" ||
      question.answer_outline.trim().length === 0
    ) {
      throw new Error(`Question ${question.id} must have an answer outline.`);
    }

    if (!VALID_DIFFICULTIES.includes(question.difficulty)) {
      throw new Error(`Invalid difficulty for question ${question.id}.`);
    }
  }
}
