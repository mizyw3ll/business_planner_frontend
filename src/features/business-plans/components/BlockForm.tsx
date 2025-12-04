"use client";

import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Box,
    Autocomplete
} from "@mui/material";
import { Plus } from "lucide-react";
import { useBlockCreate } from "../api/useBlockCreate";
import { useState } from "react";

type Props = {
    planId: number;
};

// Определяем доступные типы блоков (совпадает с PlanBlocks)
const blockTypes = [
    { value: "text", label: "Текст" },
    { value: "heading", label: "Заголовок" },
    { value: "subheading", label: "Подзаголовок" },
    { value: "financial", label: "Финансовый" },
] as const;

// Создаем типы на основе константы
type BlockType = typeof blockTypes[number];

interface FormData {
    title: string;
    content: string;
    block_type: BlockType; // Убрали null, тип всегда должен быть выбран
}

export default function BlockForm({ planId }: Props) {
    const [open, setOpen] = useState(false);
    const mutation = useBlockCreate(planId);
    const [formData, setFormData] = useState<FormData>({
        title: "",
        content: "",
        block_type: blockTypes[0], // Начальное значение - первый тип из списка
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        mutation.mutate(
            {
                title: formData.title,
                content: formData.content,
                block_type: formData.block_type.value,
            },
            {
                onSuccess: () => {
                    setOpen(false);
                    // Сброс формы к начальному состоянию
                    setFormData({
                        title: "",
                        content: "",
                        block_type: blockTypes[0]
                    });
                },
                onError: (error) => {
                    console.error("Ошибка при создании блока:", error);
                }
            }
        );
    };

    const handleClose = () => {
        setOpen(false);
        // Восстанавливаем начальные значения при отмене
        setFormData({
            title: "",
            content: "",
            block_type: blockTypes[0]
        });
    };

    return (
        <>
            <Button
                variant="contained"
                startIcon={<Plus size={18} />}
                onClick={() => setOpen(true)}
                sx={{ mb: 3 }}
            >
                Добавить блок
            </Button>
            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                <form onSubmit={handleSubmit}>
                    <DialogTitle>Новый блок</DialogTitle>
                    <DialogContent>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 3, pt: 1 }}>
                            <TextField
                                name="title"
                                label="Заголовок"
                                placeholder="Введение"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                required
                                fullWidth
                                disabled={mutation.isPending}
                            />

                            <TextField
                                name="content"
                                label="Содержимое"
                                placeholder="Текст блока..."
                                value={formData.content}
                                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                required
                                multiline
                                rows={5}
                                fullWidth
                                disabled={mutation.isPending}
                            />

                            {/* Autocomplete с правильной типизацией */}
                            <Autocomplete
                                value={formData.block_type}
                                onChange={(_, newValue) => {
                                    if (newValue) {
                                        setFormData({ ...formData, block_type: newValue });
                                    }
                                }}
                                options={blockTypes}
                                getOptionLabel={(option) => option.label}
                                isOptionEqualToValue={(option, value) => option.value === value.value}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Тип блока"
                                        placeholder="Выберите тип блока..."
                                        required
                                    />
                                )}
                                fullWidth
                                disableClearable
                                disabled={mutation.isPending}
                            />
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            type="button"
                            onClick={handleClose}
                            disabled={mutation.isPending}
                        >
                            Отмена
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={mutation.isPending || !formData.title.trim() || !formData.content.trim()}
                        >
                            {mutation.isPending ? "Добавляем..." : "Добавить"}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
}