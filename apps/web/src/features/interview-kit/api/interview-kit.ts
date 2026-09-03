import { api } from "@/shared/api/client";
import type { CreateInterviewKitInput, UpdateInterviewKitInput } from "../types/interview-kit.types";

export const getInterviewKits = async () => {
  const { data } = await api.get("/interview-kit");
  return data;
};

export const getInterviewKit = async (id: string) => {
  const { data } = await api.get(`/interview-kit/${id}`);
  return data;
};

export const createInterviewKit = async (payload: CreateInterviewKitInput) => {
  const { data } = await api.post("/interview-kit", payload);
  return data;
};

export const updateInterviewKit = async ({
  id,
  payload,
}: {
  id: string;
  payload: UpdateInterviewKitInput;
}) => {
  const { data } = await api.patch(`/interview-kit/${id}`, payload);
  return data;
};

export const deleteInterviewKit = async (id: string) => {
  const { data } = await api.delete(`/interview-kit/${id}`);
  return data;
};
