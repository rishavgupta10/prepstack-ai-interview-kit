import { api } from "@/shared/api/client";

export const getReport = async (interviewId: string) => {
  const response = await api.get(`/report/${interviewId}`);

  return response.data;
};
