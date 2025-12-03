// src/features/financial/api/useCurrencyList.ts
import { useQuery } from "@tanstack/react-query";
import api from "@/src/lib/axios";
import { Currency } from "@/src/features/financial/types";

export const useCurrencyList = () => {
    return useQuery<Currency[]>({
        queryKey: ["currencies"],
        queryFn: async () => {
            const res = await api.get("/api/v1/financial/currencies");
            return res.data;
        },
    });
};
