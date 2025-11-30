// src/features/business-plans/api/useBlockReorder.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/src/lib/axios";
import { API_ROUTES } from "@/src/lib/apiRoutes";

export const useBlockReorder = (planId: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (newOrder: number[]) => {
            const response = await api.patch(
                API_ROUTES.businessPlans.blocks.reorder(planId),
                { new_order: newOrder },
            );
            return response.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["business-plan", planId] });
        },
    });
};
