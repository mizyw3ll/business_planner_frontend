// src/features/business-plans/components/BusinessPlanForm.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useBusinessPlanCreate } from "../api/useBusinessPlanCreate";
import {
    Paper,
    Box,
    Typography,
    TextField,
    Button,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { APP_ROUTES } from "@/src/lib/appRoutes";

const blockSchema = z.object({
    title: z.string().min(1, "Название блока обязательно"),
    content: z.string().min(1, "Содержимое обязательно"),
    block_type: z.enum(["text", "financial", "table", "image"]),
    block_order: z.number(),
});

const schema = z.object({
    title: z.string().min(3, "Минимум 3 символа"),
    description: z.string().optional(),
    blocks: z.array(blockSchema).min(1, "Добавьте хотя бы один блок"),
});

type FormData = z.infer<typeof schema>;

export default function CreateBusinessPlanForm() {
    const router = useRouter();
    const mutation = useBusinessPlanCreate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            title: "",
            description: "",
            blocks: [
                {
                    title: "Введение",
                    content: "Опишите идею бизнеса...",
                    block_type: "text",
                    block_order: 0,
                },
            ],
        },
    });

    const onSubmit = (data: FormData) => {
        mutation.mutate(data, {
            onSuccess: (newPlan) => {
                router.push(APP_ROUTES.dashboard.plans.detail(newPlan.id));
            },
        });
    };

    return (
        <Paper
            elevation={4}
            sx={{
                maxWidth: 800,
                mx: "auto",
                p: 4,
                borderRadius: 2,
            }}
        >
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
                Создать новый бизнес-план
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                    <TextField
                        {...register("title")}
                        label="Название плана"
                        placeholder="Мой стартап 2025"
                        error={!!errors.title}
                        helperText={errors.title?.message}
                        fullWidth
                        required
                    />

                    <TextField
                        {...register("description")}
                        label="Описание (необязательно)"
                        placeholder="Краткое описание..."
                        multiline
                        rows={3}
                        fullWidth
                    />

                    {/* Здесь можно добавить редактор блоков — пока просто заглушка */}
                    <Box
                        sx={{
                            bgcolor: "action.hover",
                            p: 3,
                            borderRadius: 1,
                        }}
                    >
                        <Typography variant="body2" color="text.secondary">
                            Редактор блоков будет в следующей версии
                        </Typography>
                    </Box>

                    <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={mutation.isPending}
                        >
                            {mutation.isPending ? "Создаём..." : "Создать план"}
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
    );
}
