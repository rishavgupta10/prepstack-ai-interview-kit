import { api } from "@/shared/api/client";

export const getDashboardStats = async () => {
  const { data } = await api.get("/dashboard-stats");

  return data;
};
