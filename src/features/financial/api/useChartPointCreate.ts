// src/features/financial/api/useChartPointCreate.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/src/lib/axios";
import { API_ROUTES } from "@/src/lib/apiRoutes";
import { CreateChartPointData } from "@/src/features/financial/types";

export const useChartPointCreate = (chartId: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: CreateChartPointData) => {
            const res = await api.post(API_ROUTES.financial.points.create(chartId), data);
            return res.data;
        },
        onSuccess: () => {
            // Обновляем список точек графика
            queryClient.invalidateQueries({ queryKey: ["chart-points", chartId] });
            // Обновляем сам график (включая его точки)
            queryClient.invalidateQueries({ queryKey: ["financial-chart", chartId] });
        },
    });
};
