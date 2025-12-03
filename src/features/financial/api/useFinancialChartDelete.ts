// src/features/financial/api/useFinancialChartDelete.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/src/lib/axios";
import { API_ROUTES } from "@/src/lib/apiRoutes";

export const useFinancialChartDelete = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: number) => {
            const res = await api.delete(API_ROUTES.financial.charts.delete(id));
            return res.data;
        },
        onSuccess: () => {
            // Обновляем список графиков
            queryClient.invalidateQueries({ queryKey: ["financial-charts"] });
        },
    });
};
