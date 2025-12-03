// src/app/dashboard/financial/[id]/edit/page.tsx
"use client";

import FinancialChartEditForm from "@/src/features/financial/components/FinancialChartEditForm";
import { useFinancialChartGet } from "@/src/features/financial/api/useFinancialChartGet";
import { useParams } from "next/navigation";
import Box from "@mui/material/Box";

export default function EditFinancialChartPage() {
    const { id } = useParams();
    const chartId = Number(id);
    const { data: chart, isLoading } = useFinancialChartGet(chartId);

    if (isLoading) return <div>Загрузка...</div>;
    if (!chart) return <div>График не найден</div>;

    return (
        <Box sx={{ maxWidth: 960, mx: "auto", py: 4 }}>
            <FinancialChartEditForm chart={chart} />
        </Box>
    );
}
