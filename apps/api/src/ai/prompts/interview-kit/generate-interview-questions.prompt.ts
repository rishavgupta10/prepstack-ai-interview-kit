import type {
  InterviewRole,
  CompanyBrief,
} from "../../../modules/interview-kit/domain/types";

export function generateInterviewQuestionsPrompt(
  role: InterviewRole,
  companyBrief: CompanyBrief,
  interviewProcessSources: {
    title: string;
    url: string;
    text: string;
  }[],
): string {
  return `
You are generating an interview preparation kit.

Use ONLY the supplied job description requirements, company research,
and public interview-process research.

Do not invent job requirements.

JOB ROLE:
${JSON.stringify(role, null, 2)}

COMPANY RESEARCH:
${JSON.stringify(companyBrief, null, 2)}

PUBLIC INTERVIEW-PROCESS RESEARCH:
${JSON.stringify(interviewProcessSources, null, 2)}

Generate interview questions that directly test the supplied requirements.

Rules:

1. 1. Every question must reference one or more existing requirement IDs.requirement_ids must never be an empty array.
2. Never create or modify requirement IDs.
3. Do not invent requirements that are not present in the role.
4. Cover technical, behavioural, domain, and company-fit areas when
   supported by the supplied information.
5. Higher-priority "must" requirements should receive stronger coverage.
6. Questions should be realistic interview questions, not trivia.
7. Difficulty must be exactly 1, 2, or 3.
8. Category must be exactly one of:
   - technical
   - behavioural
   - system design
   - company fit
9. answer_outline should contain concise points an excellent answer
   should cover.
10. Generate enough questions to provide meaningful coverage of all
    must-have requirements.
11. Public interview research is evidence, not a source of new job
    requirements.
12. If public interview research is unavailable, simply generate questions
    from the job description and company research.

STRICT REQUIREMENT MAPPING RULES:
- Every generated question MUST reference at least one requirement_id.
- requirement_ids MUST NEVER be empty.
- Each requirement_id MUST exactly match an ID from the supplied requirements list.
- Do not create, modify, or invent requirement IDs.
- A question that cannot be mapped to a supplied requirement MUST NOT be generated.
- Before returning the JSON, verify that every question has at least one valid requirement_id.

Return ONLY valid JSON.

Expected format:

{
  "questions": [
    {
      "requirement_ids": ["req-001"],
      "category": "technical",
      "prompt": "Question text",
      "answer_outline": "Key points expected in a strong answer",
      "difficulty": 2
    }
  ]
}
`;
}
