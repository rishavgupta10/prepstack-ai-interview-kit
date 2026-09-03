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
  "preferedAnswers":[];
}
`;
