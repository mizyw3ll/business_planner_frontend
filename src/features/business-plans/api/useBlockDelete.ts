// src/features/business-plans/api/useBlockDelete.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/src/lib/axios";
import { API_ROUTES } from "@/src/lib/apiRoutes";

export const useBlockDelete = (planId: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (blockId: number) => {
            await api.delete(API_ROUTES.businessPlans.blocks.delete(planId, blockId));
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["business-plan", planId] });
        },
    });
};
