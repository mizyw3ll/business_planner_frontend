// src/features/financial/components/FinancialChartList.tsx
"use client";

import FinancialChartCard from "./FinancialChartCard";
import { useFinancialChartList } from "../api/useFinancialChartList";
import { useCurrencyList } from "../api/useCurrencyList";
import { Box, Typography, Button, Skeleton } from "@mui/material";
import { useMemo } from "react";
import { FinancialChart } from "../types";

type Props = {
    onOpenCreate?: () => void;
};

export default function FinancialChartList({ onOpenCreate }: Props) {
    const { data: charts, isLoading } = useFinancialChartList();
    const { data: currencies } = useCurrencyList();

    // Создаем мапу валют по ID для быстрого доступа
    const currencyMap = useMemo(() => {
        if (!currencies) return new Map();
        return new Map(currencies.map(c => [c.id, c]));
    }, [currencies]);

    // Обогащаем графики валютой, если она не пришла с бэкенда
    const enrichedCharts = useMemo(() => {
        if (!charts) return [];
        return charts.map((chart: FinancialChart) => {
            if (chart.currency) {
                return chart; // Валюта уже есть
            }
            // Если валюты нет, пытаемся получить её из списка валют по currency_id
            const currency = currencyMap.get(chart.currency_id);
            if (currency) {
                return { ...chart, currency };
            }
            return chart;
        });
    }, [charts, currencyMap]);

    if (isLoading) {
        return (
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" },
                    gap: 3,
                    mt: 3,
                }}
            >
                {[...Array(6)].map((_, i) => (
                    <Skeleton key={i} variant="rectangular" height={200} sx={{ borderRadius: 2 }} />
                ))}
            </Box>
        );
    }

    if (!charts || charts.length === 0) {
        return (
            <Box
                sx={{
                    textAlign: "center",
                    py: 6,
                    mt: 3,
                }}
            >
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                    У вас пока нет финансовых графиков
                </Typography>
                <Button
                    variant="contained"
                    onClick={() => onOpenCreate?.()}
                >
                    Создать первый график
                </Button>
            </Box>
        );
    }

    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" },
                gap: 3,
            }}
        >
            {enrichedCharts.map((chart) => (
                <FinancialChartCard key={chart.id} chart={chart} size="small" />
            ))}
        </Box>
    );
}
