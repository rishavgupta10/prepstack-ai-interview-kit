import { api } from "@/shared/api/client";

export const uploadResume = async (file: File) => {
  const formData = new FormData();

  formData.append("resume", file);

  const { data } = await api.post("/resume/upload", formData);

  return data;
};
