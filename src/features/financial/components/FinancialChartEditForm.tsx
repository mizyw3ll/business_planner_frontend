// src/features/financial/components/FinancialChartEditForm.tsx
"use client";

import { useState } from "react";
import {
    Paper,
    Box,
    Typography,
    TextField,
    Button,
    MenuItem,
    FormControlLabel,
    Switch,
    CircularProgress,
} from "@mui/material";
import { FinancialChart, UpdateFinancialChartData } from "@/src/features/financial/types";
import { useFinancialChartUpdate, useCurrencyList } from "../api";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { APP_ROUTES } from "@/src/lib/appRoutes";
import { useRouter } from "next/navigation";

type Props = {
    chart: FinancialChart;
};

export default function FinancialChartEditForm({ chart }: Props) {
    const router = useRouter();
    const mutation = useFinancialChartUpdate(chart.id);
    const { data: currencies, isLoading: currenciesLoading } = useCurrencyList();

    const [formData, setFormData] = useState({
        title: chart.title,
        description: chart.description || "",
        currency_id: chart.currency_id,
        is_active: chart.is_active,
    });

    const handleChange = (field: keyof typeof formData, value: any) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        mutation.mutate(formData, {
            onSuccess: () => {
                router.push(APP_ROUTES.dashboard.financial.detail(chart.id));
            },
        });
    };

    if (currenciesLoading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: 400 }}>
                <CircularProgress />
            </Box>
        );
    }

    const selectedCurrency = currencies?.find(c => c.id === formData.currency_id);

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {/* Заголовок */}
            <Box>
                <Button
                    variant="outlined"
                    size="small"
                    component={Link}
                    href={APP_ROUTES.dashboard.financial.detail(chart.id)}
                    startIcon={<ArrowLeft size={18} />}
                    sx={{ mb: 2 }}
                >
                    К деталям графика
                </Button>
                <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
                    Редактирование графика
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Измените параметры финансового графика
                </Typography>
            </Box>

            {/* Форма */}
            <Paper
                elevation={4}
                sx={{
                    p: 4,
                    borderRadius: "18px",
                }}
            >
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                    Параметры графика
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                        <TextField
                            id="title"
                            label="Название графика"
                            value={formData.title}
                            onChange={(e) => handleChange("title", e.target.value)}
                            placeholder="Введите название графика"
                            required
                            fullWidth
                        />

                        <TextField
                            id="description"
                            label="Описание"
                            value={formData.description}
                            onChange={(e) => handleChange("description", e.target.value)}
                            placeholder="Введите описание графика"
                            multiline
                            rows={3}
                            fullWidth
                        />

                        <TextField
                            id="currency_id"
                            label="Валюта"
                            select
                            value={formData.currency_id.toString()}
                            onChange={(e) => handleChange("currency_id", Number(e.target.value))}
                            disabled={currenciesLoading}
                            fullWidth
                        >
                            {currencies?.map((currency) => (
                                <MenuItem key={currency.id} value={currency.id.toString()}>
                                    {currency.name} ({currency.code})
                                </MenuItem>
                            ))}
                        </TextField>

                        <FormControlLabel
                            control={
                                <Switch
                                    checked={formData.is_active}
                                    onChange={(e) => handleChange("is_active", e.target.checked)}
                                />
                            }
                            label="Активный график"
                        />

                        <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end", pt: 2 }}>
                            <Button
                                type="button"
                                variant="outlined"
                                component={Link}
                                href={APP_ROUTES.dashboard.financial.detail(chart.id)}
                            >
                                Отмена
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                disabled={mutation.isPending}
                                startIcon={<Save size={18} />}
                            >
                                {mutation.isPending ? "Сохраняем..." : "Сохранить"}
                            </Button>
                        </Box>
                    </Box>
                </form>
            </Paper>
        </Box>
    );
}
