import { api } from "@/shared/api/client";

import { RegisterDto, RegisterResponse } from "../types/auth.types";

export const register = async (payload: RegisterDto) => {
  const response = await api.post<RegisterResponse>("/auth/register", payload);

  return response.data;
};
