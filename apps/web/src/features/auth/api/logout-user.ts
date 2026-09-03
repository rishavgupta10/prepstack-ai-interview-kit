import { api } from "@/shared/api/client";
import { LogoutResponse } from "../types/auth.types";

export const logout = async () => {
  const response = await api.post<LogoutResponse>("/auth/logout");

  return response.data;
};
