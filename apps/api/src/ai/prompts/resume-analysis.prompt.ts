export const resumeAnalysisPrompt = (rawText: string) => `
Analyze the resume.

Return ONLY valid JSON.

{
  "skills": [],
  "projects": [],
  "experienceYears": 0
}

Resume:

${rawText}
`;
