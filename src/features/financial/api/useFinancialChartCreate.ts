// src/features/financial/api/useFinancialChartCreate.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/src/lib/axios";
import { CreateFinancialChartData } from "@/src/features/financial/types";

export const useFinancialChartCreate = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: CreateFinancialChartData) => {
            const res = await api.post("/api/v1/financial/charts", data);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["financial-charts"] });
        },
    });
};
