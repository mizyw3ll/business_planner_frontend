// src/features/financial/components/FinancialChartForm.tsx
"use client";

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Box,
    MenuItem,
    FormControlLabel,
    Switch,
} from "@mui/material";
import { useFinancialChartCreate, useCurrencyList } from "@/src/features/financial/api";
import { useState } from "react";

type Props = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

export default function FinancialChartForm({ open, onOpenChange }: Props) {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        currency_id: "",
        is_active: true,
    });

    const mutation = useFinancialChartCreate();
    const { data: currencies, isLoading: currenciesLoading } = useCurrencyList();

    const handleChange = (field: keyof typeof formData, value: string | boolean) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.title || !formData.currency_id) {
            return;
        }

        mutation.mutate(
            {
                title: formData.title,
                description: formData.description || undefined,
                currency_id: Number(formData.currency_id),
                is_active: formData.is_active,
            },
            { onSuccess: () => onOpenChange(false) }
        );
    };

    const handleClose = () => {
        setFormData({ title: "", description: "", currency_id: "", is_active: true });
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <form onSubmit={handleSubmit}>
                <DialogTitle>Новый финансовый график</DialogTitle>
                <DialogContent>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 3, pt: 1 }}>
                        <TextField
                            id="title"
                            label="Название графика"
                            placeholder="Введите название графика"
                            value={formData.title}
                            onChange={(e) => handleChange("title", e.target.value)}
                            required
                            fullWidth
                        />

                        <TextField
                            id="description"
                            label="Описание"
                            placeholder="Введите описание графика"
                            value={formData.description}
                            onChange={(e) => handleChange("description", e.target.value)}
                            multiline
                            rows={3}
                            fullWidth
                        />

                        <TextField
                            id="currency_id"
                            label="Валюта"
                            select
                            value={formData.currency_id}
                            onChange={(e) => handleChange("currency_id", e.target.value)}
                            disabled={currenciesLoading}
                            required
                            fullWidth
                        >
                            {currenciesLoading ? (
                                <MenuItem value="">Загрузка...</MenuItem>
                            ) : (
                                currencies?.map((currency) => (
                                    <MenuItem key={currency.id} value={currency.id.toString()}>
                                        {currency.name} ({currency.code})
                                    </MenuItem>
                                ))
                            )}
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
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button type="button" onClick={handleClose}>
                        Отмена
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={mutation.isPending || !formData.title || !formData.currency_id}
                    >
                        {mutation.isPending ? "Создание..." : "Создать"}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}
