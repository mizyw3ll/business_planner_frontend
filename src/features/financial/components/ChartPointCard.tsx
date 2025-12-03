// src/features/financial/components/ChartPointCard.tsx
"use client";

import { Paper, Box, Typography, Chip, IconButton } from "@mui/material";
import { ChartPoint } from "@/src/features/financial/types";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { Pencil, Trash2, TrendingUp, TrendingDown } from "lucide-react";
import { useTheme } from "@mui/material/styles";
import { formatCurrency } from "../utils/currency";

type Props = {
    point: ChartPoint;
    currencyCode?: string;
    onEdit?: (point: ChartPoint) => void;
    onDelete?: (pointId: number) => void;
};

export default function ChartPointCard({ point, currencyCode = "RUB", onEdit, onDelete }: Props) {
    const theme = useTheme();
    const isIncome = point.type === "income";
    const amount = Number(point.amount);
    const color = isIncome ? theme.palette.success.main : theme.palette.error.main;

    return (
        <Paper
            elevation={4}
            sx={{
                p: 3,
                borderRadius: "18px",
                transition: "all 0.25s ease",
                cursor: "default",
                borderLeft: `4px solid ${color}`,
                "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 12px 32px rgba(0,0,0,0.12)",
                },
            }}
        >
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, flex: 1 }}>
                    <Box
                        sx={{
                            color: color,
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        {isIncome ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
                    </Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, flex: 1 }}>
                        {point.description || "Без описания"}
                    </Typography>
                </Box>
                <Chip
                    label={isIncome ? "Доход" : "Расход"}
                    size="small"
                    sx={{
                        bgcolor: color,
                        color: "white",
                        fontWeight: 600,
                        ml: 1,
                    }}
                />
            </Box>

            <Box sx={{ mb: 2 }}>
                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: 700,
                        color: color,
                        mb: 0.5,
                    }}
                >
                    {isIncome ? "+" : "-"}
                    {formatCurrency(amount, currencyCode)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {format(new Date(point.date), "dd MMMM yyyy", { locale: ru })}
                </Typography>
            </Box>

            {(onEdit || onDelete) && (
                <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end", pt: 1, borderTop: "1px solid", borderColor: "divider" }}>
                    {onEdit && (
                        <IconButton
                            size="small"
                            onClick={() => onEdit(point)}
                            sx={{
                                color: theme.palette.primary.main,
                                "&:hover": {
                                    bgcolor: theme.palette.primary.main + "15",
                                },
                            }}
                        >
                            <Pencil size={18} />
                        </IconButton>
                    )}
                    {onDelete && (
                        <IconButton
                            size="small"
                            onClick={() => onDelete(point.id)}
                            sx={{
                                color: theme.palette.error.main,
                                "&:hover": {
                                    bgcolor: theme.palette.error.main + "15",
                                },
                            }}
                        >
                            <Trash2 size={18} />
                        </IconButton>
                    )}
                </Box>
            )}
        </Paper>
    );
}
