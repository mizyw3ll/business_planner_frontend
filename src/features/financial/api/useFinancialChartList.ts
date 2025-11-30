// src/features/financial/api/useFinancialChartList.ts
import { useQuery } from "@tanstack/react-query";
import api from "@/src/lib/axios";
import { API_ROUTES } from "@/src/lib/apiRoutes";
import { FinancialChartList } from "@/src/features/financial/types";

export const useFinancialChartList = () => {
    return useQuery<FinancialChartList>({
        queryKey: ["financial-charts"],
        queryFn: async () => {
            const res = await api.get(API_ROUTES.financial.charts.list);
            return res.data;
        },
    });
};
