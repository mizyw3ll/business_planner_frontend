// src/features/business-plans/components/CreateBusinessPlanForm.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useBusinessPlanCreate } from "../api/useBusinessPlanCreate";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
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
        <Card className="max-w-4xl mx-auto">
            <CardHeader>
                <CardTitle>Создать новый бизнес-план</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium mb-2">Название плана</label>
                        <Input {...register("title")} placeholder="Мой стартап 2025" />
                        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Описание (необязательно)</label>
                        <Textarea {...register("description")} placeholder="Краткое описание..." rows={3} />
                    </div>

                    {/* Здесь можно добавить редактор блоков — пока просто заглушка */}
                    <div className="bg-muted p-6 rounded-lg">
                        <p className="text-sm text-muted-foreground">
                            Редактор блоков будет в следующей версии
                        </p>
                    </div>

                    <div className="flex gap-4">
                        <Button type="submit" disabled={mutation.isPending}>
                            {mutation.isPending ? "Создаём..." : "Создать план"}
                        </Button>
                        <Button type="button" variant="outline" onClick={() => router.back()}>
                            Отмена
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}