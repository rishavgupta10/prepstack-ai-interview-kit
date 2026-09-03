"use client";

import { useQuery } from "@tanstack/react-query";
import { getReportStats } from "../api/get-report-stats";

export const useReportStats = () => {
  return useQuery({
    queryKey: ["report"],

    queryFn: () => getReportStats(),
  });
};
