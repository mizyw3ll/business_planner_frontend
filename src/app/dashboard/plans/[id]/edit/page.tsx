// src/app/dashboard/plans/[id]/edit/page.tsx
"use client";

import { useBusinessPlanGet } from "@/src/features/business-plans/api/useBusinessPlanGet";
import { useBusinessPlanUpdate } from "@/src/features/business-plans/api/useBusinessPlanUpdate";
import { useParams, useRouter } from "next/navigation";
import { Paper, Box, Typography, TextField, Button, CircularProgress } from "@mui/material";

export default function EditPlanPage() {
    const { id } = useParams();
    const planId = Number(id);
    const router = useRouter();
    const { data: plan, isLoading } = useBusinessPlanGet(planId);
    const mutation = useBusinessPlanUpdate(planId);

    if (isLoading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: 400 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!plan) {
        return (
            <Box sx={{ maxWidth: 800, mx: "auto", py: 4, textAlign: "center" }}>
                <Typography variant="h6" color="error">
                    План не найден
                </Typography>
            </Box>
        );
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = {
            title: formData.get("title") as string,
            description: (formData.get("description") as string) || null,
        };

        mutation.mutate(data, {
            onSuccess: () => router.push(`/dashboard/plans/${planId}`),
        });
    };

    return (
        <Box sx={{ maxWidth: 800, mx: "auto", py: 4 }}>
            <Paper
                elevation={4}
                sx={{
                    p: 4,
                    borderRadius: 2,
                }}
            >
                <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>
                    Редактирование: {plan.title}
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                        <TextField
                            name="title"
                            label="Название"
                            defaultValue={plan.title}
                            required
                            fullWidth
                        />
                        <TextField
                            name="description"
                            label="Описание"
                            defaultValue={plan.description || ""}
                            multiline
                            rows={4}
                            fullWidth
                        />
                        <Box sx={{ display: "flex", gap: 2 }}>
                            <Button
                                type="submit"
                                variant="contained"
                                disabled={mutation.isPending}
                            >
                                {mutation.isPending ? "Сохраняем..." : "Сохранить"}
                            </Button>
                            <Button
                                type="button"
                                variant="outlined"
                                onClick={() => router.back()}
                            >
                                Отмена
                            </Button>
                        </Box>
                    </Box>
                </form>
            </Paper>
        </Box>
    );
}
