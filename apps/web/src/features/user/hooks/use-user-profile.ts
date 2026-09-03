"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserProfile, updateUserProfile } from "../api/get-user-profile";

const useUserProfile = () => {
  return useQuery({
    queryKey: ["userProfile"],
    queryFn: getUserProfile,

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

export const useUpdateUserProfile = () =>{
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn:(payload: Record<string, unknown>)=>updateUserProfile(payload),


    onSuccess:(newProfileData)=>{
      console.log("profile data",newProfileData)
      queryClient.setQueryData(["userProfile"],newProfileData)
    }
  })
}

export default useUserProfile;