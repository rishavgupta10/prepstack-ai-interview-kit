"use client";

import { useQuery } from "@tanstack/react-query";

import { getResume } from "../api/get-resume";

export const useResume = () => {
  return useQuery({
    queryKey: ["resume"],
    queryFn: getResume,
  });
};
