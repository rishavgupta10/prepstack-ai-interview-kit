import type { InterviewRequirement, InterviewRole } from "../domain/types";

export function assignRequirementIds(role: InterviewRole): InterviewRole {
  const requirements: InterviewRequirement[] = role.requirements.map(
    (requirement, index) => ({
      ...requirement,
      id: `req-${String(index + 1).padStart(3, "0")}`,
    }),
  );

  return {
    ...role,
    requirements,
  };
}
