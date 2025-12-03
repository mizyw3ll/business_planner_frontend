// src/features/financial/api/useChartPointUpdate.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/src/lib/axios";
import { API_ROUTES } from "@/src/lib/apiRoutes";
import { UpdateChartPointData } from "@/src/features/financial/types";

export const useChartPointUpdate = (chartId: number, pointId: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: UpdateChartPointData) => {
            const res = await api.patch(API_ROUTES.financial.points.update(chartId, pointId), data);
            return res.data;
        },
        onSuccess: () => {
            // Обновляем список точек графика
            queryClient.invalidateQueries({ queryKey: ["chart-points", chartId] });
            // Обновляем конкретную точку
            queryClient.invalidateQueries({ queryKey: ["chart-point", chartId, pointId] });
            // Обновляем сам график (включая его точки)
            queryClient.invalidateQueries({ queryKey: ["financial-chart", chartId] });
        },
    });
};
