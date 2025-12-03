// src/features/business-plans/components/BusinessPlanDialogForm.tsx
"use client";

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Box,
} from "@mui/material";
import { useBusinessPlanCreate } from "../api/useBusinessPlanCreate";
import { useState } from "react";

type Props = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

export default function BusinessPlanDialogForm({ open, onOpenChange }: Props) {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
    });

    const mutation = useBusinessPlanCreate();

    const handleChange = (field: keyof typeof formData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.title) {
            return;
        }

        mutation.mutate(
            {
                title: formData.title,
                description: formData.description || undefined,
                blocks: [], // Создаем план с пустым массивом блоков
            },
            {
                onSuccess: () => {
                    onOpenChange(false);
                    setFormData({ title: "", description: "" });
                },
            }
        );
    };

    const handleClose = () => {
        setFormData({ title: "", description: "" });
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <form onSubmit={handleSubmit}>
                <DialogTitle>Новый бизнес-план</DialogTitle>
                <DialogContent>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 3, pt: 1 }}>
                        <TextField
                            id="title"
                            label="Название плана"
                            placeholder="Введите название плана"
                            value={formData.title}
                            onChange={(e) => handleChange("title", e.target.value)}
                            required
                            fullWidth
                        />

                        <TextField
                            id="description"
                            label="Описание"
                            placeholder="Введите описание плана"
                            value={formData.description}
                            onChange={(e) => handleChange("description", e.target.value)}
                            multiline
                            rows={3}
                            fullWidth
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
                        disabled={mutation.isPending || !formData.title}
                    >
                        {mutation.isPending ? "Создание..." : "Создать"}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}
