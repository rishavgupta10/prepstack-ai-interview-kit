"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { logout } from "../api/logout-user";

export const useLogout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      // Remove the cached current user
      queryClient.removeQueries({
        queryKey: ["current-user"],
      });

      // Optional: Clear all queries if required
      queryClient.clear();
    },
  });
};
