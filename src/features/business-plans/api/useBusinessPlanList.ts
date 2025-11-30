// src/features/business-plans/api/useBusinessPlanList.ts

import { useQuery } from "@tanstack/react-query";
import api from "@/src/lib/axios";
import { API_ROUTES } from "@/src/lib/apiRoutes";
import { BusinessPlan } from "@/src/features/business-plans/types";

export const useBusinessPlanList = () => {
    return useQuery<BusinessPlan[]>({
        queryKey: ["business-plans"],
        queryFn: async () => {
            const res = await api.get(API_ROUTES.businessPlans.list);
            return res.data;
        },
    });
};
