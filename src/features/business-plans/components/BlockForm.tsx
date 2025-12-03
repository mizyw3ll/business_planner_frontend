"use client";

import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem, Box, Typography } from "@mui/material";
import { Plus } from "lucide-react";
import { useBlockCreate } from "../api/useBlockCreate";
import { useState } from "react";

type Props = {
    planId: number;
};

export default function BlockForm({ planId }: Props) {
    const [open, setOpen] = useState(false);
    const mutation = useBlockCreate(planId);
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        block_type: "text",
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        mutation.mutate(
            {
                title: formData.title,
                content: formData.content,
                block_type: formData.block_type as any,
            },
            {
                onSuccess: () => {
                    setOpen(false);
                    setFormData({ title: "", content: "", block_type: "text" });
                },
            }
        );
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
            <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
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
                            />
                            <TextField
                                name="block_type"
                                label="Тип блока"
                                select
                                value={formData.block_type}
                                onChange={(e) => setFormData({ ...formData, block_type: e.target.value })}
                                fullWidth
                            >
                                <MenuItem value="text">Текст</MenuItem>
                                <MenuItem value="heading">Заголовок</MenuItem>
                                <MenuItem value="financial">Финансовый</MenuItem>
                                <MenuItem value="list">Список</MenuItem>
                                <MenuItem value="image">Изображение</MenuItem>
                            </TextField>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button type="button" onClick={() => setOpen(false)}>
                            Отмена
                        </Button>
                        <Button type="submit" variant="contained" disabled={mutation.isPending}>
                            {mutation.isPending ? "Добавляем..." : "Добавить"}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
}
