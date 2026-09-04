export const evaluateInterviewPrompt = (
  resume: string,
  conversation: string,
) => `
You are a senior engineering interviewer.

Analyze the interview.

Resume:

${resume}

Interview:

${conversation}


report format notes :
take 5 as max score and return candiate score out of max score for overallScore , technicalScore ,  communicationScore
in preferedAnswers write answers of each question as senior and which will get you 5 out of 5 


OUTPUT FORMAT RULES:

1. Return ONLY valid JSON.
2. Do not wrap the JSON in markdown code fences.
3. Do not include any explanation, introduction, or text outside the JSON.
4. Follow the exact field names and structure defined below.
5. preferedAnswers MUST always be an array.
6. Every item in preferedAnswers MUST be an object containing exactly:
   - question: string
   - answer: string
7. Never return preferedAnswers as a single string.
8. Never return null for preferedAnswers; return an empty array [] if there are no preferred answers.
9. All questions and answers must be strings.
10. Do not add extra fields that are not defined in the schema.
11. Escape quotes and special characters correctly so the response remains valid JSON.
12. Base the report only on the provided resume and interview conversation. Do not invent interview responses or candidate experience.


Return ONLY JSON.
{
  "overallScore": 0,
  "technicalScore": 0,
  "communicationScore": 0,
  "strengths": [],
  "improvements": [],
  "missedConcepts": [],
  "finalFeedback": ""
  "topicsToLearn":[],
  "preferedAnswers": [
    {
      "question": "string",
      "answer": "string"
    }
  ]
}
`;
