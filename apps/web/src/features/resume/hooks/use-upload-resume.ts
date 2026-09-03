"use client";

import { useMutation } from "@tanstack/react-query";
import { uploadResume } from "../api/post-resume";

export const useUploadResume = () => {
  return useMutation({
    mutationFn: uploadResume,
  });
};
