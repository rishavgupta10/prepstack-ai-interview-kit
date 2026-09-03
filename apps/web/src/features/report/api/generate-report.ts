import { api } from "@/shared/api/client";

export const generateReport = async (interviewId: string) => {
  const { data } = await api.post(`/report/${interviewId}/generate`);
  return data;
};
