"use client";

import { useQuery } from "@tanstack/react-query";

import { getInterviews } from "../api/get-interviews";

export const useInterviews = () => {
  return useQuery({
    queryKey: ["interviews"],

    queryFn: getInterviews,
  });
};
