import { jsonrepair } from "jsonrepair";

export const parseResumeToMetadata = (response: string) => {
  const cleaned = response.replace(/```json/g, "").replace(/```/g, "").trim();

  try {
    return JSON.parse(cleaned);
  } catch {
    const repaired = jsonrepair(cleaned);
    return JSON.parse(repaired);
  }
};