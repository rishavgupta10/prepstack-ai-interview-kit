"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createInterviewKit,
  deleteInterviewKit,
  getInterviewKit,
  getInterviewKits,
  updateInterviewKit,
} from "../api/interview-kit";
import type {
  CreateInterviewKitInput,
  InterviewKit,
  UpdateInterviewKitInput,
} from "../types/interview-kit.types";

export const useInterviewKits = () => {
  return useQuery({
    queryKey: ["interview-kits"],
    queryFn: async (): Promise<InterviewKit[]> => {
      const res = await getInterviewKits();
      if (Array.isArray(res)) return res;
      if (Array.isArray(res?.data)) return res.data;
      return [];
    },
    staleTime: 1000 * 60 * 5,
  });
};

export const useInterviewKit = (id: string) => {
  return useQuery({
    queryKey: ["interview-kit", id],
    queryFn: async (): Promise<InterviewKit> => {
      const res = await getInterviewKit(id);
      return res?.data ?? res;
    },
    enabled: !!id,
  });
};

export const useCreateInterviewKit = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateInterviewKitInput) => createInterviewKit(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["interview-kits"] });
    },
  });
};

export const useUpdateInterviewKit = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdateInterviewKitInput;
    }) => updateInterviewKit({ id, payload }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["interview-kits"] });
      queryClient.invalidateQueries({ queryKey: ["interview-kit", variables.id] });
    },
  });
};

export const useDeleteInterviewKit = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteInterviewKit(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["interview-kits"] });
    },
  });
};
