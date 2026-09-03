import { api } from "@/shared/api/client";
export const getCurrentUser = async () => {
  const { data } = await api.get("/auth/me");
  return data;
};
