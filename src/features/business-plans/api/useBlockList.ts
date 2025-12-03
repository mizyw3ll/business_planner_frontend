// src/features/business-plans/api/useBlockList.ts
import { useQuery } from "@tanstack/react-query";
import api from "@/src/lib/axios";
import { API_ROUTES } from "@/src/lib/apiRoutes";
import { Block } from "@/src/features/business-plans/types";

export const useBlockList = (planId: number) => {
    return useQuery({
        queryKey: ["blocks", planId],
        queryFn: async () => {
            const res = await api.get(API_ROUTES.businessPlans.blocks.list(planId));
            return res.data as Block[];
        },
        enabled: !!planId,
    });
};
