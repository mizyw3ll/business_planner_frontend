// src/features/financial/components/ChartPointForm.tsx
"use client";

import { useState, useEffect } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Box,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    FormLabel,
} from "@mui/material";
import { ChartPoint, CreateChartPointData, UpdateChartPointData } from "@/src/features/financial/types";
import { validateChartPointForm, formatDateForInput } from "@/src/features/financial/utils/helpers";
import { POINT_TYPE_OPTIONS } from "@/src/features/financial/utils/constants";

type Props = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    chartId: number;
    point?: ChartPoint;
    onSubmit: (data: CreateChartPointData | UpdateChartPointData) => void;
    isPending?: boolean;
};

export default function ChartPointForm({
    open,
    onOpenChange,
    chartId,
    point,
    onSubmit,
    isPending = false,
}: Props) {
    const [formData, setFormData] = useState({
        date: point?.date ? formatDateForInput(point.date) : "",
        type: point?.type || POINT_TYPE_OPTIONS[0].value,
        amount: point?.amount || "",
        description: point?.description || "",
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        setFormData({
            date: point?.date ? formatDateForInput(point.date) : "",
            type: point?.type || POINT_TYPE_OPTIONS[0].value,
            amount: point?.amount || "",
            description: point?.description || "",
        });
        setErrors({});
    }, [point]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const validation = validateChartPointForm(formData);
        if (!validation.isValid) {
            setErrors(validation.errors);
            return;
        }

        setErrors({});

        const submitData = point
            ? {
                date: formData.date || undefined,
                type: formData.type,
                amount: formData.amount,
                description: formData.description || undefined,
            } as UpdateChartPointData
            : {
                date: formData.date!,
                type: formData.type,
                amount: formData.amount,
                description: formData.description || undefined,
            } as CreateChartPointData;

        onSubmit(submitData);
    };

    const resetForm = () => {
        setFormData({
            date: point?.date ? formatDateForInput(point.date) : "",
            type: point?.type || POINT_TYPE_OPTIONS[0].value,
            amount: point?.amount || "",
            description: point?.description || "",
        });
        setErrors({});
    };

    const handleClose = () => {
        resetForm();
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <form onSubmit={handleSubmit}>
                <DialogTitle>
                    {point ? "Редактировать точку" : "Добавить точку"}
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 3, pt: 1 }}>
                        <TextField
                            id="date"
                            label="Дата"
                            type="date"
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            required
                            error={!!errors.date}
                            helperText={errors.date}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            fullWidth
                        />

                        <FormControl component="fieldset">
                            <FormLabel component="legend">Тип</FormLabel>
                            <RadioGroup
                                value={formData.type}
                                onChange={(e) =>
                                    setFormData({ ...formData, type: e.target.value as "income" | "expense" })
                                }
                                row
                            >
                                <FormControlLabel
                                    value="income"
                                    control={<Radio />}
                                    label="Доход"
                                />
                                <FormControlLabel
                                    value="expense"
                                    control={<Radio />}
                                    label="Расход"
                                />
                            </RadioGroup>
                        </FormControl>

                        <TextField
                            id="amount"
                            label="Сумма"
                            type="number"
                            inputProps={{ step: "0.01", min: "0" }}
                            placeholder="0.00"
                            value={formData.amount}
                            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                            required
                            error={!!errors.amount}
                            helperText={errors.amount}
                            fullWidth
                        />

                        <TextField
                            id="description"
                            label="Описание"
                            placeholder="Описание операции"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            multiline
                            rows={3}
                            error={!!errors.description}
                            helperText={errors.description}
                            fullWidth
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button type="button" onClick={handleClose}>
                        Отмена
                    </Button>
                    <Button type="submit" variant="contained" disabled={isPending}>
                        {isPending ? "Сохраняем..." : point ? "Сохранить" : "Добавить"}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}
