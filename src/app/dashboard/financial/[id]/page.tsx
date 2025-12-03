// src/app/dashboard/financial/[id]/page.tsx
"use client";

import FinancialChartDetail from "@/src/features/financial/components/FinancialChartDetail";
import { useFinancialChartGet } from "@/src/features/financial/api/useFinancialChartGet";
import { useCurrencyList } from "@/src/features/financial/api/useCurrencyList";
import { useParams } from "next/navigation";
import { Box, Skeleton, Typography, Button } from "@mui/material";
import Link from "next/link";
import { useMemo } from "react";

export default function FinancialChartDetailPage() {
    const { id } = useParams();
    const chartId = Number(id);
    const { data: chart, isLoading } = useFinancialChartGet(chartId);
    const { data: currencies } = useCurrencyList();

    const currencyMap = useMemo(() => {
        if (!currencies) return new Map();
        return new Map(currencies.map(c => [c.id, c]));
    }, [currencies]);

    const enrichedChart = useMemo(() => {
        if (!chart) return null;
        if (chart.currency) {
            return chart;
        }
        const currency = currencyMap.get(chart.currency_id);
        if (currency) {
            return { ...chart, currency };
        }
        return chart;
    }, [chart, currencyMap]);

    if (isLoading) {
        return (
            <Box sx={{ maxWidth: 1200, mx: "auto", py: 10 }}>
                <Skeleton variant="rectangular" height={48} width={256} sx={{ mb: 4, borderRadius: 1 }} />
                <Skeleton variant="rectangular" height={400} sx={{ borderRadius: 1 }} />
            </Box>
        );
    }

    if (!enrichedChart) {
        return (
            <Box sx={{ maxWidth: 1200, mx: "auto", py: 10, textAlign: "center" }}>
                <Typography variant="h4" color="error" sx={{ fontWeight: 600, mb: 4 }}>
                    График не найден
                </Typography>
                <Button component={Link} href="/dashboard/financial" variant="contained">
                    Назад к списку
                </Button>
            </Box>
        );
    }

    return (
        <Box sx={{ maxWidth: 1200, mx: "auto", py: 4 }}>
            <FinancialChartDetail chart={enrichedChart} />
        </Box>
    );
}
