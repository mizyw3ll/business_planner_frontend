// src/features/business-plans/api/useBusinessPlanDelete.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/src/lib/axios";
import { API_ROUTES } from "@/src/lib/apiRoutes";
import { useRouter } from "next/navigation";

export const useBusinessPlanDelete = () => {
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation({
        mutationFn: async (planId: number) => {
            await api.delete(API_ROUTES.businessPlans.delete(planId));
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["business-plans"] });
            router.push("/dashboard");
        },
    });
};
