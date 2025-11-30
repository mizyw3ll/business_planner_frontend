// src/app/dashboard/financial/[id]/page.tsx
"use client";

import FinancialChartCard from "@/src/features/financial/components/FinancialChartCard";
import { useFinancialChartGet } from "@/src/features/financial/api/useFinancialChartGet";
import { useParams } from "next/navigation";

export default function FinancialChartDetailPage() {
    const { id } = useParams();
    const chartId = Number(id);
    const { data: chart, isLoading } = useFinancialChartGet(chartId);

    if (isLoading) return <div>Загрузка...</div>;
    if (!chart) return <div>График не найден</div>;

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-8">{chart.title}</h1>
            <FinancialChartCard chart={chart} size="large" />
        </div>
    );
}