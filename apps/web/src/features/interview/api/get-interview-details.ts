import { api } from "@/shared/api/client";

export const getInterviewDetails = async (interviewId: string) => {
  const response = await api.get(`/interview/${interviewId}`);

  return response.data;
};
