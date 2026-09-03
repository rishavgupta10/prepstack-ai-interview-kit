import { api } from "@/shared/api/client";

export const AnalyseResume = async () => {
  const { data } = await api.post("/resume/analyze");

  return data;
};
