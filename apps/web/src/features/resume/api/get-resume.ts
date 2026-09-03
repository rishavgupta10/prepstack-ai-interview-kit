import { api } from "@/shared/api/client";

export const getResume = async () => {
  const { data } = await api.get("/resume/me");

  return data;
};
