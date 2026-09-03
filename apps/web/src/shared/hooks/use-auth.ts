"use client";

import { useCurrentUser }
from "@/features/auth/hooks/use-current-user";

export const useAuth = () => {

  const {
    data,
    isLoading,
    error,
  } = useCurrentUser();

  return {
    user: data?.data,
    isLoading,
    isAuthenticated:
      !!data?.data,
    error,
  };

};