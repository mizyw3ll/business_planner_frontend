// src/features/financial/api/useFinancialChartGet.ts
import { useQuery } from "@tanstack/react-query";
import api from "@/src/lib/axios";
import { API_ROUTES } from "@/src/lib/apiRoutes";
import { FinancialChart } from "@/src/features/financial/types";

export const useFinancialChartGet = (id: number) => {
    return useQuery<FinancialChart>({
        queryKey: ["financial-chart", id],
        queryFn: async () => {
            const res = await api.get(API_ROUTES.financial.charts.byId(id));
            return res.data;
        },
        enabled: !!id,
    });
};
