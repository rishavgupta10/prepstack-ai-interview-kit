"use client";

import { useQuery } from "@tanstack/react-query";

import { getReport } from "../api/get-report";

export const useReport = (interviewId: string) => {
  return useQuery({
    queryKey: ["report", interviewId],

    queryFn: () => getReport(interviewId),
  });
};
