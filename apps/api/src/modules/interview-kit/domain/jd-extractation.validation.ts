import type {
  InterviewRequirement,
  InterviewRole,
  RequirementKind,
  RequirementPriority,
} from "./types";

const REQUIREMENT_KINDS: RequirementKind[] = [
  "technical",
  "behavioural",
  "domain",
];

const REQUIREMENT_PRIORITIES: RequirementPriority[] = ["must", "nice"];

export function validateExtractedInterviewRole(
  value: unknown,
): asserts value is InterviewRole {
  if (!isObject(value)) {
    throw new Error("JD extraction returned an invalid object.");
  }

  if (typeof value.title !== "string" || value.title.trim().length === 0) {
    throw new Error("JD extraction returned an invalid job title.");
  }

  if (
    typeof value.seniority !== "string" ||
    value.seniority.trim().length === 0
  ) {
    throw new Error("JD extraction returned an invalid seniority.");
  }

  if (!Array.isArray(value.responsibilities)) {
    throw new Error("JD extraction returned invalid responsibilities.");
  }

  for (const responsibility of value.responsibilities) {
    if (
      typeof responsibility !== "string" ||
      responsibility.trim().length === 0
    ) {
      throw new Error("JD extraction returned an invalid responsibility.");
    }
  }

  if (!Array.isArray(value.requirements)) {
    throw new Error("JD extraction returned invalid requirements.");
  }

  for (const requirement of value.requirements) {
    validateRequirement(requirement);
  }
}

function validateRequirement(
  value: unknown,
): asserts value is InterviewRequirement {
  if (!isObject(value)) {
    throw new Error("JD extraction returned an invalid requirement.");
  }

  if (typeof value.text !== "string" || value.text.trim().length === 0) {
    throw new Error("JD extraction returned a requirement without text.");
  }

  if (!REQUIREMENT_KINDS.includes(value.kind as RequirementKind)) {
    throw new Error(`Invalid requirement kind: ${String(value.kind)}.`);
  }

  if (!REQUIREMENT_PRIORITIES.includes(value.priority as RequirementPriority)) {
    throw new Error(`Invalid requirement priority: ${String(value.priority)}.`);
  }
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}
