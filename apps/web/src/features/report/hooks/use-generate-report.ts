"use client";

import { useMutation } from "@tanstack/react-query";
import { generateReport } from "../api/generate-report";

export const useGenerateReport = () => {
  return useMutation({
    mutationFn: generateReport,
  });
};
