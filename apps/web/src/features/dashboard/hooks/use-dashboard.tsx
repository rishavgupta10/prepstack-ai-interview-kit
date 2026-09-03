"use client";

import { useResume }
  from "@/features/resume/hooks/use-resume";
import { useQuery } from "@tanstack/react-query";
import { getDashboardStats } from "../api/get-dashboardstats";

export const useDashboard =
  () => {

    const resumeQuery =
      useResume();

    return {
      resumeQuery,
    };

  };


export const useDashboardStats = () => {
  return useQuery({
    queryKey: ["dashboardstats"],
    queryFn: getDashboardStats,
  });
}