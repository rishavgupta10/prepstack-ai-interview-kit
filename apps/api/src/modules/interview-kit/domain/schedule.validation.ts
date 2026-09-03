import type {
  InterviewQuestion,
  InterviewRole,
  InterviewSchedule,
} from "./types";

export function validateInterviewSchedule(
  schedule: InterviewSchedule,
  role: InterviewRole,
  questions: InterviewQuestion[],
): void {
  if (!Number.isInteger(schedule.days_available)) {
    throw new Error("Schedule days_available must be an integer.");
  }

  if (schedule.days.length !== schedule.days_available) {
    throw new Error(
      "Schedule must contain exactly the requested number of days.",
    );
  }

  const questionIds = new Set(questions.map((question) => question.id));

  const scheduledQuestionIds = new Set<string>();

  for (const day of schedule.days) {
    if (!Number.isInteger(day.day) || day.day < 1) {
      throw new Error("Invalid schedule day.");
    }

    if (!Number.isInteger(day.minutes) || day.minutes < 0) {
      throw new Error(`Invalid duration for day ${day.day}.`);
    }

    for (const questionId of day.question_ids) {
      if (!questionIds.has(questionId)) {
        throw new Error(`Schedule references unknown question ${questionId}.`);
      }

      if (scheduledQuestionIds.has(questionId)) {
        throw new Error(
          `Question ${questionId} appears more than once in the schedule.`,
        );
      }

      scheduledQuestionIds.add(questionId);
    }
  }

  const mustRequirementIds = new Set(
    role.requirements
      .filter((requirement) => requirement.priority === "must")
      .map((requirement) => requirement.id),
  );

  const coveredMustRequirementIds = new Set<string>();

  for (const question of questions) {
    if (!scheduledQuestionIds.has(question.id)) {
      continue;
    }

    for (const requirementId of question.requirement_ids) {
      if (mustRequirementIds.has(requirementId)) {
        coveredMustRequirementIds.add(requirementId);
      }
    }
  }

  for (const requirementId of mustRequirementIds) {
    if (!coveredMustRequirementIds.has(requirementId)) {
      throw new Error(
        `Must-have requirement ${requirementId} is missing from the schedule.`,
      );
    }
  }
}
