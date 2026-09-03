import { api } from "@/shared/api/client";
import { ICreateResumeMetaDataInput } from "../types/resumemetadata.types";

export const SaveResumeData = async (payload: ICreateResumeMetaDataInput) => {
  const { data } = await api.post("/resume/resume-save", payload);
  return data;
};
export const fetchResumeMetaData = async () => {
  const { data } = await api.get("/resume/resume-data/get");
  return data;
};
export const enhanceResumeData = async (payload: { resumeData: ICreateResumeMetaDataInput; jobDescription: string }) => {
  const { data } = await api.post("/resume/resume-enhance", payload);
  return data;
};
