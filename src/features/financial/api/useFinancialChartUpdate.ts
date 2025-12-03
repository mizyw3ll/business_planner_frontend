// src/features/financial/api/useFinancialChartUpdate.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/src/lib/axios";
import { API_ROUTES } from "@/src/lib/apiRoutes";
import { UpdateFinancialChartData } from "@/src/features/financial/types";

export const useFinancialChartUpdate = (id: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: UpdateFinancialChartData) => {
            const res = await api.patch(API_ROUTES.financial.charts.update(id), data);
            return res.data;
        },
        onSuccess: () => {
            // Обновляем список графиков
            queryClient.invalidateQueries({ queryKey: ["financial-charts"] });
            // Обновляем конкретный график
            queryClient.invalidateQueries({ queryKey: ["financial-chart", id] });
        },
    });
};
