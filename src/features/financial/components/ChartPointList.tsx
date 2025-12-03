// src/features/financial/components/ChartPointList.tsx
"use client";

import { Box, Typography } from "@mui/material";
import { ChartPoint } from "@/src/features/financial/types";
import ChartPointCard from "./ChartPointCard";

type Props = {
    chartId: number;
    points: ChartPoint[];
    currencyCode?: string;
    isPointsLoading?: boolean;
    onEdit?: (point: ChartPoint) => void;
    onDelete?: (pointId: number) => void;
};

export default function ChartPointList({
    chartId,
    points,
    currencyCode = "RUB",
    isPointsLoading,
    onEdit,
    onDelete,
}: Props) {
    if (isPointsLoading) {
        return (
            <Typography color="text.secondary">Загрузка точек...</Typography>
        );
    }

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Точки графика
            </Typography>

            {points.length === 0 ? (
                <Box sx={{ textAlign: "center", py: 4 }}>
                    <Typography variant="body2" color="text.secondary">
                        Нет точек графика. Добавьте первую точку.
                    </Typography>
                </Box>
            ) : (
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" },
                        gap: 2,
                    }}
                >
                    {points.map((point) => (
                        <ChartPointCard
                            key={point.id}
                            point={point}
                            currencyCode={currencyCode}
                            onEdit={onEdit}
                            onDelete={onDelete}
                        />
                    ))}
                </Box>
            )}
        </Box>
    );
}
