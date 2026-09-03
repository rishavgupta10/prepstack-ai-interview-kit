"use client";

import { useMutation } from "@tanstack/react-query";
import { AnalyseResume } from "../api/analyse-resume";


export const useAnalyseResume = () => {
  return useMutation({
    mutationFn: AnalyseResume,
  });
};
