"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchResumeMetaData, SaveResumeData, enhanceResumeData } from "../api/resume-metadata";
import { ICreateResumeMetaDataInput } from "../types/resumemetadata.types";


const useResumeMetaData = () => {
  return useQuery({
    queryKey: ["userResumeMetaData"],
    queryFn: fetchResumeMetaData,

    // Data stays fresh for 5 minutes
    staleTime: 1000 * 60 * 5,

    // Remove from cache after 10 minutes of inactivity
    gcTime: 1000 * 60 * 10,

    // Retry only once if request fails
    retry: 1,

    // Don't refetch when tab becomes active
    refetchOnWindowFocus: false,

    // Don't refetch when reconnecting to internet
    refetchOnReconnect: false,

    // Don't refetch on mount if data is still fresh
    refetchOnMount: true,
  });
};

export const useUpdateResumeData = () =>{
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn:(payload:any)=>SaveResumeData(payload),


    onSuccess:(newResumeMetaData)=>{
      queryClient.setQueryData(["userResumeMetaData"],newResumeMetaData)
    }
  })
}

export const useEnhanceResumeData = () => {
  return useMutation({
    mutationFn: (payload: { resumeData: any; jobDescription: string }) =>
      enhanceResumeData(payload),
  });
};

export default useResumeMetaData;