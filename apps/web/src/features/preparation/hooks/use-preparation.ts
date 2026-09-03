import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getPreparations,
  getPreparationDetail,
  createPreparation,
  generateMoreQuestions,
} from "../api/preparation";

export const usePreparations = () => {
  return useQuery({
    queryKey: ["preparations"],
    queryFn: getPreparations,
    staleTime: 1000 * 60 * 5,
  });
};

export const usePreparationDetail = (id: string) => {
  return useQuery({
    queryKey: ["preparation", id],
    queryFn: () => getPreparationDetail(id),
    enabled: !!id,
  });
};

export const useCreatePreparation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPreparation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["preparations"] });
    },
  });
};

export const useGenerateMoreQuestions = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => generateMoreQuestions(id),
    onSuccess: (data, id) => {
      queryClient.invalidateQueries({ queryKey: ["preparation", id] });
    },
  });
};
