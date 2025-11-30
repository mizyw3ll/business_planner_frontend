// src/features/business-plans/api/useBusinessPlanUpdate.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/src/lib/axios";
import { API_ROUTES } from "@/src/lib/apiRoutes";
import { UpdateBusinessPlanData } from "@/src/features/business-plans/types";

export const useBusinessPlanUpdate = (planId: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: UpdateBusinessPlanData) => {
            const res = await api.patch(API_ROUTES.businessPlans.update(planId), data);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["business-plans"] });
            queryClient.invalidateQueries({ queryKey: ["business-plan", planId] });
        },
    });
};
