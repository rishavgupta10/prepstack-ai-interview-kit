import type {
  InterviewRole,
  InterviewQuestion,
} from "../../../modules/interview-kit/domain/types";

export function generateInterviewFlashcardsPrompt(
  role: InterviewRole,
  questions: InterviewQuestion[],
): string {
  return `
Create interview preparation flashcards from the supplied job requirements
and interview questions.

JOB ROLE:
${JSON.stringify(role, null, 2)}

INTERVIEW QUESTIONS:
${JSON.stringify(questions, null, 2)}

Rules:

1. Flashcards must be directly relevant to the supplied requirements.
2. Do not invent requirements.
3. Every flashcard must reference one or more existing requirement IDs.
4. Use only requirement IDs supplied in the job role.
5. The front should be a concise concept/question.
6. The back should contain the concise answer or key points to remember.
7. Prefer important technical concepts and difficult interview topics.
8. Do not duplicate identical flashcards.
9. Return ONLY valid JSON.

Expected format:

{
  "flashcards": [
    {
      "front": "What is event loop in Node.js?",
      "back": "The event loop allows Node.js to perform non-blocking I/O...",
      "requirement_ids": ["req-001"]
    }
  ]
}
`;
}
