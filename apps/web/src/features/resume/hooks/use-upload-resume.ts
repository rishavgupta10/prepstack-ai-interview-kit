"use client";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { uploadResume } from "../api/post-resume";

export const useUploadResume = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: uploadResume,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["resume"],
      });
    },
  });
};
