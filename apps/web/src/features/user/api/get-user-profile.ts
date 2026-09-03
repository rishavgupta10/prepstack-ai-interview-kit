import { api } from "@/shared/api/client";

export const getUserProfile = async () => {
  const { data } = await api.get("/user/profile");
  return data;
};


export const updateUserProfile = async(payload: Record<string, unknown>)=>{
  const { data } = await api.patch("/user/profile/update",payload);
  return data;
}