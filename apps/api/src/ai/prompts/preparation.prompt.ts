export const initialPreparationPrompt = (resumeData: any, jobDescription: string) => `
You are an expert technical interviewer and resume coach.
Your task is to analyze the candidate's resume metadata and the target Job Description (JD), and generate:
1. A strong, professional, senior-level "Tell me about yourself" introduction script (around 2-3 paragraphs) tailored to the target JD and candidate's experience.
2. A list of exactly 20 tailored interview questions and detailed answers that the candidate should prepare. These should cover technical skills, projects from the resume, behavioral scenarios, and key requirements of the JD.

Candidate Resume Metadata:
${JSON.stringify(resumeData, null, 2)}

Target Job Description:
${jobDescription}

Return ONLY valid JSON matching the exact schema below:
{
  "introductionScript": "The senior-level introduction script here...",
  "questions": [
    {
      "question": "Question 1",
      "answer": "Detailed answer for Question 1"
    },
    {
      "question": "Question 2",
      "answer": "Detailed answer for Question 2"
    }
  ]
}

Ensure you generate exactly 20 questions and answers matching the structure above.
Return ONLY valid JSON. Do not write any markdown code block formatting (like \`\`\`json or \`\`\`), do not write explanations, just return the raw JSON string.
`;

export const generateMoreQuestionsPrompt = (resumeData: any, jobDescription: string, existingQuestions: string[]) => `
You are an expert technical interviewer.
Analyze the candidate's resume metadata and target Job Description (JD) below.
Generate exactly 5 NEW, unique interview questions and detailed answers for the candidate to prepare.
IMPORTANT: You MUST NOT repeat or generate variations of any of the previously generated questions listed below.

Previously Generated Questions (DO NOT REPEAT ANY OF THESE):
${existingQuestions.map((q, idx) => `${idx + 1}. ${q}`).join("\n")}

Candidate Resume Metadata:
${JSON.stringify(resumeData, null, 2)}

Target Job Description:
${jobDescription}

Return ONLY valid JSON matching the exact schema below:
{
  "questions": [
    {
      "question": "New Question 1",
      "answer": "Detailed answer for New Question 1"
    },
    {
      "question": "New Question 2",
      "answer": "Detailed answer for New Question 2"
    }
  ]
}

Ensure you generate exactly 5 new unique questions and answers matching the structure above.
Return ONLY valid JSON. Do not write any markdown code block formatting (like \`\`\`json or \`\`\`), do not write explanations, just return the raw JSON string.
`;
