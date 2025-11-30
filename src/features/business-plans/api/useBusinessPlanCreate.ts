// src/features/business-plans/api/useBusinessPlanCreate.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/src/lib/axios";
import { API_ROUTES } from "@/src/lib/apiRoutes";
import { CreateBusinessPlanData } from "@/src/features/business-plans/types";

export const useBusinessPlanCreate = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: CreateBusinessPlanData) => {
            const res = await api.post(API_ROUTES.businessPlans.create, data);
            return res.data;
        },
        onSuccess: () => {
            // Обновляем список планов
            queryClient.invalidateQueries({ queryKey: ["business-plans"] });
        },
    });
};
