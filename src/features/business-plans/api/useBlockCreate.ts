// src/features/business-plans/api/useBlockCreate.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/src/lib/axios";
import { API_ROUTES } from "@/src/lib/apiRoutes";
import { AddBlockData } from "@/src/features/business-plans/types";

export const useBlockCreate = (planId: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: AddBlockData) => {
            const res = await api.post(
                `${API_ROUTES.businessPlans.blocks.create(planId)}`,
                data
            );
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["business-plan", planId] });
        },
    });
};
