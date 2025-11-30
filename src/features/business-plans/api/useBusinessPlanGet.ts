// src/features/business-plans/api/useBusinessPlanGet.ts

import { useQuery } from "@tanstack/react-query";
import api from "@/src/lib/axios";
import { API_ROUTES } from "@/src/lib/apiRoutes";
import { BusinessPlanDetail } from "@/src/features/business-plans/types";

export const useBusinessPlanGet = (id: number) => {
    return useQuery<BusinessPlanDetail>({
        queryKey: ["business-plan", id],
        queryFn: async () => {
            const res = await api.get(API_ROUTES.businessPlans.byId(id));
            return res.data;
        },
    });
};
