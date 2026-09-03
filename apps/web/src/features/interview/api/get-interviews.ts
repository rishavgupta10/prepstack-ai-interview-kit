import { api } from "@/shared/api/client";

export const getInterviews = async () => {
  const response = await api.get("/interview");

  return response.data;
};
