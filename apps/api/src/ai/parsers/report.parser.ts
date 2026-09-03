export const parseInterviewReport = (response: string) => {
  const cleaned = response.replace("```json", "").replace("```", "").trim();

  return JSON.parse(cleaned);
};
