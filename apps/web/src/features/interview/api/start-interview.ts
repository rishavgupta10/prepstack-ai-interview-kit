import { api } from "@/shared/api/client";

export const startInterview = async (payload: {
  role: string;
  mode: string;
}) => {
  const response = await api.post("/interview/start", payload);

  return response.data;
};
