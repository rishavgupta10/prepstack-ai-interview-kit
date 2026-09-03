import { api } from "@/shared/api/client";

export const getPreparations = async () => {
  const { data } = await api.get("/preparation");
  return data;
};

export const getPreparationDetail = async (id: string) => {
  const { data } = await api.get(`/preparation/${id}`);
  return data;
};

export const createPreparation = async (payload: { jobDescription: string }) => {
  const { data } = await api.post("/preparation", payload);
  return data;
};

export const generateMoreQuestions = async (id: string) => {
  const { data } = await api.post(`/preparation/${id}/more`);
  return data;
};
