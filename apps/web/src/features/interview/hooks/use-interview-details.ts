"use client";

import { useQuery } from "@tanstack/react-query";

import { getInterviewDetails } from "../api/get-interview-details";

export const useInterviewDetails = (interviewId:string) => {
  return useQuery({
    queryKey: ["interview", interviewId],

    queryFn: () => getInterviewDetails(interviewId),
  });
};
