// src/features/financial/components/FinancialChartCard.tsx
"use client";

import Link from "next/link";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FinancialChart } from "@/src/features/financial/types";
import { APP_ROUTES } from "@/src/lib/appRoutes";
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

    return (
        <Card className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{chart.title}</CardTitle>
                    <Badge variant={chart.is_active ? "default" : "secondary"}>
                        {chart.is_active ? "Активен" : "Неактивен"}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="p-0">
                <CardDescription>
                    {chart.description || "Нет описания"}
                </CardDescription>
                <Link href={APP_ROUTES.dashboard.financial.detail(chart.id)}>
                    <div className="cursor-pointer p-4">
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
                    </div>
                </Link>
            </CardContent>
        </Card>
    );
}