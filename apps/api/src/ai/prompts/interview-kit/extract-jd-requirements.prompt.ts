export const extractJdRequirementsPrompt = (jd: string) => `
You are a job description analysis system.

Your task is to extract information ONLY from the provided job description.

JOB DESCRIPTION:
${jd}

Return ONLY valid JSON.
Do not use markdown.
Do not add explanations outside the JSON.

Required JSON structure:

{
  "title": "string",
  "seniority": "string",
  "responsibilities": ["string"],
  "requirements": [
    {
      "text": "string",
      "kind": "technical | behavioural | domain",
      "priority": "must | nice"
    }
  ]
}

Rules:

1. Extract the actual job title from the job description.
2. Infer seniority ONLY when the job description provides enough evidence.
   If it cannot be determined, return "unknown".
3. Extract responsibilities explicitly stated in the job description.
4. Extract skills, qualifications, experience, knowledge and other requirements.
5. Classify every requirement as:
   - technical: technical skills, programming languages, frameworks, tools,
     databases, architecture, engineering practices, etc.
   - behavioural: communication, leadership, teamwork, collaboration,
     problem-solving, ownership, etc.
   - domain: industry/domain-specific knowledge.
6. Mark a requirement as "must" only when the JD clearly makes it required,
   such as "required", "must have", "essential", or equivalent wording.
7. Mark a requirement as "nice" when the JD describes it as preferred,
   desirable, bonus, or equivalent wording.
8. Do NOT invent requirements that are not supported by the JD.
9. Keep each requirement as a separate item.
10. Do not combine unrelated requirements into one item.
11. If the JD does not contain a particular type of information, use an empty
    array where appropriate.
12. Do not include requirement IDs. IDs will be generated deterministically
    by the application.
`;
