// src/features/financial/components/FinancialChartDetail.tsx
"use client";

import { Paper, Chip, Button, Box, Typography } from "@mui/material";
import { FinancialChart } from "@/src/features/financial/types";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { ArrowLeft, Edit, TrendingUp, TrendingDown } from "lucide-react";
import Link from "next/link";
import { APP_ROUTES } from "@/src/lib/appRoutes";
import FinancialChartActions from "./FinancialChartActions";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ButtonBase from "@mui/material/ButtonBase";
import Divider from "@mui/material/Divider";
import { useTheme } from "@mui/material/styles";
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ReferenceLine,
    Legend,
} from "recharts";
import ChartPointList from "./ChartPointList";
import ChartPointForm from "./ChartPointForm";
import { formatCurrency, getCurrencySymbol } from "../utils/currency";
import { Plus } from "lucide-react";
import { useChartPointCreate, useChartPointUpdate, useChartPointDelete } from "../api";
import { ChartPoint } from "../types";

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
            income: point.type === "income" ? amount : 0,
            expense: point.type === "expense" ? amount : 0,
            type: point.type,
            amount,
        });
    }

    return result;
}

// Расчет статистики
function calculateStats(points: FinancialChart["chart_points"]) {
    if (!points || points.length === 0) {
        return { totalIncome: 0, totalExpense: 0, balance: 0 };
    }

    const totalIncome = points
        .filter(p => p.type === "income")
        .reduce((sum, p) => sum + Number(p.amount), 0);

    const totalExpense = points
        .filter(p => p.type === "expense")
        .reduce((sum, p) => sum + Number(p.amount), 0);

    return {
        totalIncome,
        totalExpense,
        balance: totalIncome - totalExpense,
    };
}

type Props = {
    chart: FinancialChart;
};

function CollapsibleDescription({ text }: { text: string }) {
    const [expanded, setExpanded] = useState(false);

    return (
        <Box sx={{ mt: 2 }}>
            <Typography
                variant="body1"
                color="text.secondary"
                sx={{
                    wordBreak: "break-word",
                    ...(expanded
                        ? {}
                        : {
                            display: "-webkit-box",
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                        }),
                }}
            >
                {text}
            </Typography>
            <ButtonBase
                onClick={() => setExpanded((prev) => !prev)}
                sx={{
                    mt: 2,
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    fontSize: "0.75rem",
                    color: "primary.main",
                    "&:hover": {
                        color: "primary.dark",
                    },
                }}
            >
                <Divider sx={{ flex: 1, borderColor: "divider" }} />
                <Typography variant="caption" sx={{ whiteSpace: "nowrap" }}>
                    {expanded ? "Скрыть" : "Раскрыть полностью"}
                </Typography>
                <Divider sx={{ flex: 1, borderColor: "divider" }} />
            </ButtonBase>
        </Box>
    );
}

export default function FinancialChartDetail({ chart }: Props) {
    const theme = useTheme();
    const router = useRouter();
    const data = convertToAreaChartData(chart.chart_points);
    const stats = calculateStats(chart.chart_points);
    const currencyCode = chart.currency?.code || "RUB";
    const currencySymbol = getCurrencySymbol(currencyCode);

    // Состояние для формы добавления точки
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingPoint, setEditingPoint] = useState<ChartPoint | undefined>();

    const createMutation = useChartPointCreate(chart.id);
    const updateMutation = useChartPointUpdate(chart.id, editingPoint?.id || 0);
    const deleteMutation = useChartPointDelete(chart.id);

    const handleCreate = (data: any) => {
        createMutation.mutate(data, {
            onSuccess: () => {
                setIsFormOpen(false);
            },
        });
    };

    const handleUpdate = (data: any) => {
        if (!editingPoint) return;

        updateMutation.mutate(data, {
            onSuccess: () => {
                setEditingPoint(undefined);
                setIsFormOpen(false);
            },
        });
    };

    const handleDelete = (pointId: number) => {
        deleteMutation.mutate(pointId);
    };

    const handleEdit = (point: ChartPoint) => {
        setEditingPoint(point);
        setIsFormOpen(true);
    };

    const handleCloseForm = () => {
        setEditingPoint(undefined);
        setIsFormOpen(false);
    };

    const handleCreateNew = () => {
        setEditingPoint(undefined);
        setIsFormOpen(true);
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {/* Заголовок */}
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                        <Button
                            variant="outlined"
                            size="small"
                            component={Link}
                            href={APP_ROUTES.dashboard.financial.list}
                            startIcon={<ArrowLeft size={18} />}
                        >
                            К списку графиков
                        </Button>
                        <Chip
                            label={chart.is_active ? "Активен" : "Неактивен"}
                            color={chart.is_active ? "success" : "default"}
                            size="small"
                        />
                        {chart.currency && (
                            <Chip
                                label={`${chart.currency.name} (${currencySymbol})`}
                                size="small"
                                variant="outlined"
                            />
                        )}
                    </Box>
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 600,
                            wordBreak: "break-word",
                            mb: 2,
                        }}
                    >
                        {chart.title}
                    </Typography>
                    <Button
                        variant="contained"
                        startIcon={<Plus size={18} />}
                        onClick={handleCreateNew}
                        sx={{ mb: 2 }}
                    >
                        Добавить точку
                    </Button>
                    <CollapsibleDescription text={chart.description || "Нет описания"} />
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        Создан {format(new Date(chart.created_at), "dd MMMM yyyy", { locale: ru })}
                    </Typography>
                </Box>
                <Box sx={{ display: "flex", gap: 1 }}>
                    <Button
                        variant="outlined"
                        component={Link}
                        href={APP_ROUTES.dashboard.financial.edit(chart.id)}
                        startIcon={<Edit size={18} />}
                    >
                        Редактировать
                    </Button>
                    <FinancialChartActions
                        chartId={chart.id}
                        size="default"
                        onSuccess={() => router.push(APP_ROUTES.dashboard.financial.list)}
                    />
                </Box>
            </Box>

            {/* Статистика */}
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" }, gap: 2 }}>
                <Paper
                    elevation={4}
                    sx={{
                        p: 3,
                        borderRadius: "18px",
                        transition: "all 0.25s ease",
                        "&:hover": {
                            transform: "translateY(-4px)",
                            boxShadow: "0 12px 32px rgba(0,0,0,0.12)",
                        },
                    }}
                >
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                        <Typography variant="subtitle2" sx={{ color: "text.secondary", fontWeight: 600 }}>
                            Общий доход
                        </Typography>
                        <TrendingUp size={22} style={{ color: theme.palette.success.main }} />
                    </Box>
                    <Typography variant="h5" sx={{ fontWeight: 700, color: theme.palette.success.main }}>
                        +{formatCurrency(stats.totalIncome, currencyCode)}
                    </Typography>
                </Paper>

                <Paper
                    elevation={4}
                    sx={{
                        p: 3,
                        borderRadius: "18px",
                        transition: "all 0.25s ease",
                        "&:hover": {
                            transform: "translateY(-4px)",
                            boxShadow: "0 12px 32px rgba(0,0,0,0.12)",
                        },
                    }}
                >
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                        <Typography variant="subtitle2" sx={{ color: "text.secondary", fontWeight: 600 }}>
                            Общий расход
                        </Typography>
                        <TrendingDown size={22} style={{ color: theme.palette.error.main }} />
                    </Box>
                    <Typography variant="h5" sx={{ fontWeight: 700, color: theme.palette.error.main }}>
                        -{formatCurrency(stats.totalExpense, currencyCode)}
                    </Typography>
                </Paper>

                <Paper
                    elevation={4}
                    sx={{
                        p: 3,
                        borderRadius: "18px",
                        transition: "all 0.25s ease",
                        "&:hover": {
                            transform: "translateY(-4px)",
                            boxShadow: "0 12px 32px rgba(0,0,0,0.12)",
                        },
                    }}
                >
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                        <Typography variant="subtitle2" sx={{ color: "text.secondary", fontWeight: 600 }}>
                            Баланс
                        </Typography>
                        <Box
                            sx={{
                                width: 16,
                                height: 16,
                                borderRadius: "50%",
                                bgcolor: stats.balance >= 0 ? theme.palette.success.main : theme.palette.error.main,
                            }}
                        />
                    </Box>
                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: 700,
                            color: stats.balance >= 0 ? theme.palette.success.main : theme.palette.error.main,
                        }}
                    >
                        {stats.balance >= 0 ? "+" : ""}
                        {formatCurrency(stats.balance, currencyCode)}
                    </Typography>
                </Paper>
            </Box>

            {/* График */}
            <Paper
                elevation={4}
                sx={{
                    p: 3,
                    borderRadius: "18px",
                }}
            >
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                    График баланса
                </Typography>
                {data.length === 0 ? (
                    <Box sx={{ textAlign: "center", py: 8 }}>
                        <Typography color="text.secondary">
                            Нет данных для отображения графика
                        </Typography>
                    </Box>
                ) : (
                    <ResponsiveContainer width="100%" height={400}>
                        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
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
                                formatter={(value: number) => formatCurrency(value, currencyCode)}
                            />
                            <ReferenceLine y={0} stroke="#6b7280" />
                            <Legend />
                            <Area
                                type="monotone"
                                dataKey="balance"
                                stroke="#8b5cf6"
                                fillOpacity={1}
                                fill="url(#colorBalance)"
                                strokeWidth={2}
                                name="Баланс"
                            />
                            <Area
                                type="monotone"
                                dataKey="income"
                                stroke="#10b981"
                                fillOpacity={0.6}
                                fill="url(#colorIncome)"
                                strokeWidth={2}
                                name="Доход"
                            />
                            <Area
                                type="monotone"
                                dataKey="expense"
                                stroke="#ef4444"
                                fillOpacity={0.6}
                                fill="url(#colorExpense)"
                                strokeWidth={2}
                                name="Расход"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                )}
            </Paper>

            {/* Точки графика */}
            <ChartPointList
                chartId={chart.id}
                points={chart.chart_points || []}
                currencyCode={currencyCode}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            {/* Форма добавления/редактирования точки */}
            <ChartPointForm
                open={isFormOpen}
                onOpenChange={handleCloseForm}
                chartId={chart.id}
                point={editingPoint}
                onSubmit={editingPoint ? handleUpdate : handleCreate}
                isPending={createMutation.isPending || updateMutation.isPending}
            />
        </Box>
    );
}
