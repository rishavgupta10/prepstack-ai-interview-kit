import { api } from "@/shared/api/client";

import { LoginDto, LoginResponse } from "../types/auth.types";

export const login = async (payload: LoginDto) => {
  const response = await api.post<LoginResponse>("/auth/login", payload);

  return response.data;
};

export const googleLogin = async (credential: string) => {
  const response =  await api.post("/auth/google", {
    credential,
  });
  return response.data;
};
