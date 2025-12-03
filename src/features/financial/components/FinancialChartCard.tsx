// src/features/financial/components/FinancialChartCard.tsx
"use client";

import Link from "next/link";
import { Card, Box, Typography, Chip } from "@mui/material";

import { FinancialChart } from "@/src/features/financial/types";
import { APP_ROUTES } from "@/src/lib/appRoutes";
import { formatDistanceToNow } from "date-fns";
import { ru } from "date-fns/locale";
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ReferenceLine,
} from "recharts";
import { getCurrencySymbol } from "../utils/currency";

// Преобразуем данные для Recharts (простой график баланса)
function convertToAreaChartData(points: FinancialChart["chart_points"]) {
    if (!points || points.length === 0) return [];

    const sorted = [...points].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    let balance = 0;
    const result = [];

    for (const point of sorted) {
        const amount = Number(point.amount);
        balance = point.type === "income" ? balance + amount : balance - amount;

        result.push({
            date: new Date(point.date).toLocaleDateString("ru-RU"),
            balance,
            type: point.type,
            amount,
        });
    }

    return result;
}

type Props = {
    chart: FinancialChart;
    size?: "small" | "large";
};

export default function FinancialChartCard({ chart, size = "small" }: Props) {
    const height = size === "large" ? 500 : 200;
    const data = convertToAreaChartData(chart.chart_points);
    const pointsCount = chart.chart_points?.length || 0;
    // Используем валюту из данных, если она есть, иначе дефолт RUB
    const currencyCode = chart.currency?.code || "RUB";
    const currencySymbol = getCurrencySymbol(currencyCode);

    return (
        <Card
            component={Link}
            href={APP_ROUTES.dashboard.financial.detail(chart.id)}
            sx={{
                overflow: "hidden",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                textDecoration: "none",
                color: "inherit",
                cursor: "pointer",
                "&:hover": {
                    "& .card-content": {
                        opacity: 0.9,
                    },
                },
            }}
        >
            <Box
                className="card-content"
                sx={{
                    px: 2.5,
                    pt: 2.5,
                    pb: 1.5,
                    flex: 1,
                }}
            >
                <Box display="flex" justifyContent="space-between" alignItems="flex-start" gap={2} mb={1}>
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                            <Typography
                                variant="subtitle1"
                                fontWeight={600}
                                sx={{
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                    flex: 1,
                                }}
                            >
                                {chart.title}
                            </Typography>
                            {chart.currency && (
                                <Chip
                                    label={currencySymbol}
                                    size="small"
                                    sx={{
                                        height: 24,
                                        fontSize: "0.75rem",
                                        fontWeight: 600,
                                        minWidth: 40,
                                    }}
                                />
                            )}
                        </Box>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                display: "-webkit-box",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                            }}
                        >
                            {chart.description || "Нет описания"}
                        </Typography>
                    </Box>
                </Box>
            </Box>

            <Box sx={{ pt: 1 }}>
                <Box sx={{ cursor: "pointer", px: 2.5, pb: 2.5 }}>
                    <ResponsiveContainer width="100%" height={height}>
                        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorPositive" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorNegative" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                            <XAxis dataKey="date" stroke="#9ca3af" />
                            <YAxis stroke="#9ca3af" />
                            <Tooltip
                                contentStyle={{ backgroundColor: "#1f2937", border: "none" }}
                                labelStyle={{ color: "#e5e7eb" }}
                            />
                            <ReferenceLine y={0} stroke="#6b7280" />
                            <Area
                                type="monotone"
                                dataKey="balance"
                                stroke="#8b5cf6"
                                fillOpacity={1}
                                fill="url(#colorPositive)"
                                strokeWidth={2}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </Box>
            </Box>

            <Box
                component="footer"
                onClick={(e) => e.stopPropagation()}
                sx={{
                    px: 2.5,
                    py: 1.5,
                    borderTop: "1px solid",
                    borderColor: "divider",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 2,
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Typography variant="caption" color="text.secondary">
                        Создан {formatDistanceToNow(new Date(chart.created_at), { locale: ru, addSuffix: true })}
                    </Typography>
                    <Chip
                        label={chart.is_active ? "Активен" : "Неактивен"}
                        color={chart.is_active ? "success" : "default"}
                        size="small"
                        variant={chart.is_active ? "filled" : "outlined"}
                        sx={{ height: 20, fontSize: "0.7rem" }}
                    />
                    {chart.currency && (
                        <Chip
                            label={chart.currency.code}
                            size="small"
                            variant="outlined"
                            sx={{ height: 20, fontSize: "0.7rem" }}
                        />
                    )}
                </Box>

                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
                    Количество точек: {pointsCount}
                </Typography>
            </Box>
        </Card>
    );
}
