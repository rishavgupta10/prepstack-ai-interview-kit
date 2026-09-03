import { api } from "@/shared/api/client";

export const getReportStats = async () => {
  const { data } = await api.get(`/report/stats/get`);

  return data;
};
