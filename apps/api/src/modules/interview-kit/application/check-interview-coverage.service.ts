import type {
  InterviewQuestion,
  InterviewRole,
  InterviewCoverage,
} from "../domain/types";

export class CheckInterviewCoverageService {
  execute(
    role: InterviewRole,
    questions: InterviewQuestion[],
  ): InterviewCoverage {
    const coveredRequirementIds = new Set<string>();

    for (const question of questions) {
      for (const requirementId of question.requirement_ids) {
        coveredRequirementIds.add(requirementId);
      }
    }

    const uncoveredRequirementIds = role.requirements
      .filter((requirement) => !coveredRequirementIds.has(requirement.id))
      .map((requirement) => requirement.id);

    return {
      uncovered_requirement_ids: uncoveredRequirementIds,
      passes: 1,
    };
  }
}
