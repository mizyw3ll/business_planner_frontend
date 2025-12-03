// src/features/financial/api/useChartPointGet.ts
import { useQuery } from "@tanstack/react-query";
import api from "@/src/lib/axios";
import { API_ROUTES } from "@/src/lib/apiRoutes";
import { ChartPoint } from "@/src/features/financial/types";

export const useChartPointGet = (chartId: number, pointId: number) => {
    return useQuery<ChartPoint>({
        queryKey: ["chart-point", chartId, pointId],
        queryFn: async () => {
            const res = await api.get(API_ROUTES.financial.points.byId(chartId, pointId));
            return res.data;
        },
        enabled: !!chartId && !!pointId,
    });
};
