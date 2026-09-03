"use client";

import { useMutation } from "@tanstack/react-query";

import { googleLogin, login } from "../api/login";

export const useLogin = () => {
  return useMutation({
    mutationFn: login,
  });
};
export const useGoogleLogin = () => {
  return useMutation({
    mutationFn: googleLogin,
  });
};




