// src/features/financial/api/useChartPointList.ts
import { useQuery } from "@tanstack/react-query";
import api from "@/src/lib/axios";
import { API_ROUTES } from "@/src/lib/apiRoutes";
import { ChartPointList } from "@/src/features/financial/types";

export const useChartPointList = (chartId: number) => {
    return useQuery<ChartPointList>({
        queryKey: ["chart-points", chartId],
        queryFn: async () => {
            const res = await api.get(API_ROUTES.financial.points.list(chartId));
            return res.data;
        },
        enabled: !!chartId,
    });
};
