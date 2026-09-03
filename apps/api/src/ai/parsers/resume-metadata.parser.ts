export const parseResumeToMetadata = (response: string) => {
  const cleaned = response.replace(/```json/g, "").replace(/```/g, "").trim();

  return JSON.parse(cleaned);
};
