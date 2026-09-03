import { api } from "@/shared/api/client";

export const sendMessage = async (payload: {
  interviewId: string;
  content: string;
}) => {
  const response = await api.post("/interview/message", payload);

  return response.data;
};
