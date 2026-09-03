import type {
  InterviewQuestion,
  InterviewRole,
  InterviewSchedule,
} from "../domain/types";
import { validateInterviewSchedule } from "../domain/schedule.validation";

const MINUTES_PER_DAY = 45;

export class CreateInterviewScheduleService {
  execute(
    role: InterviewRole,
    questions: InterviewQuestion[],
    daysAvailable: number,
  ): InterviewSchedule {
    if (!Number.isInteger(daysAvailable) || daysAvailable < 1) {
      throw new Error("Days available must be a positive integer.");
    }

    const orderedQuestions = this.orderQuestions(role, questions);

    const scheduleDays = Array.from({ length: daysAvailable }, (_, index) => ({
      day: index + 1,
      focus: this.createFocus(index + 1, daysAvailable),
      question_ids: [] as string[],
      minutes: 0,
    }));

    orderedQuestions.forEach((question, index) => {
      const dayIndex = Math.floor(
        (index * daysAvailable) / orderedQuestions.length,
      );

      scheduleDays[dayIndex].question_ids.push(question.id);

      scheduleDays[dayIndex].minutes += this.getQuestionDuration(question);
    });

    const schedule: InterviewSchedule = {
      days_available: daysAvailable,
      days: scheduleDays,
    };

    validateInterviewSchedule(schedule, role, questions);

    return schedule;
  }

  private orderQuestions(
    role: InterviewRole,
    questions: InterviewQuestion[],
  ): InterviewQuestion[] {
    const requirementPriority = new Map(
      role.requirements.map((requirement) => [
        requirement.id,
        requirement.priority,
      ]),
    );

    return [...questions].sort((a, b) => {
      const priorityA = this.getPriorityScore(a, requirementPriority);

      const priorityB = this.getPriorityScore(b, requirementPriority);

      if (priorityA !== priorityB) {
        return priorityB - priorityA;
      }

      if (a.difficulty !== b.difficulty) {
        return b.difficulty - a.difficulty;
      }

      return a.id.localeCompare(b.id);
    });
  }

  private getPriorityScore(
    question: InterviewQuestion,
    requirementPriority: Map<string, string>,
  ): number {
    return question.requirement_ids.some(
      (requirementId) => requirementPriority.get(requirementId) === "must",
    )
      ? 2
      : 1;
  }

  private getQuestionDuration(question: InterviewQuestion): number {
    return 5 + question.difficulty * 2;
  }

  private createFocus(day: number, totalDays: number): string {
    if (day === 1) {
      return "Core requirements and fundamentals";
    }

    if (day === totalDays) {
      return "Final review and interview practice";
    }

    return "Targeted interview practice";
  }
}
