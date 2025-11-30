// src/app/dashboard/plans/[id]/edit/page.tsx
"use client";

import { useBusinessPlanGet } from "@/src/features/business-plans/api/useBusinessPlanGet";
import { useBusinessPlanUpdate } from "@/src/features/business-plans/api/useBusinessPlanUpdate";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function EditPlanPage() {
    const { id } = useParams();
    const planId = Number(id);
    const router = useRouter();
    const { data: plan, isLoading } = useBusinessPlanGet(planId);
    const mutation = useBusinessPlanUpdate(planId);

    if (isLoading) return <div>Загрузка...</div>;
    if (!plan) return <div>План не найден</div>;

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = {
            title: formData.get("title") as string,
            description: formData.get("description") as string || null,
        };

        mutation.mutate(data, {
            onSuccess: () => router.push(`/dashboard/plans/${planId}`),
        });
    };

    return (
        <Card className="max-w-4xl mx-auto">
            <CardHeader>
                <CardTitle>Редактирование: {plan.title}</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label>Название</label>
                        <Input name="title" defaultValue={plan.title} required />
                    </div>
                    <div>
                        <label>Описание</label>
                        <Textarea name="description" defaultValue={plan.description || ""} rows={4} />
                    </div>
                    <div className="flex gap-4">
                        <Button type="submit" disabled={mutation.isPending}>
                            {mutation.isPending ? "Сохраняем..." : "Сохранить"}
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