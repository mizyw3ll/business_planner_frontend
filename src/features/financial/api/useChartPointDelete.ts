// src/features/financial/api/useChartPointDelete.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/src/lib/axios";
import { API_ROUTES } from "@/src/lib/apiRoutes";

export const useChartPointDelete = (chartId: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (pointId: number) => {
            const res = await api.delete(API_ROUTES.financial.points.delete(chartId, pointId));
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
