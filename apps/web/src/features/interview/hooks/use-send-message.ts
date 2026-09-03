"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { sendMessage } from "../api/send-message";

export const useSendMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: sendMessage,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["interview"],
      });
    },
  });
};
