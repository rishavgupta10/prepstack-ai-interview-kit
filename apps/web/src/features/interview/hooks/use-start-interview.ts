"use client";

import { useMutation } from "@tanstack/react-query";

import { startInterview } from "../api/start-interview";

export const useStartInterview = () => {
  return useMutation({
    mutationFn: startInterview,
  });
};
