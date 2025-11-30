"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useBlockCreate } from "../api/useBlockCreate";
import { useState } from "react";

type Props = {
    planId: number;
};

export default function AddBlockButton({ planId }: Props) {
    const [open, setOpen] = useState(false);
    const mutation = useBlockCreate(planId);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        mutation.mutate(
            {
                title: formData.get("title") as string,
                content: formData.get("content") as string,
                block_type: formData.get("block_type") as any,
            },
            {
                onSuccess: () => {
                    setOpen(false);
                },
            }
        );
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="mb-6">
                    <Plus className="w-4 h-4 mr-2" />
                    Добавить блок
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Новый блок</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-sm font-medium">Заголовок</label>
                        <Input name="title" placeholder="Введение" required />
                    </div>
                    <div>
                        <label className="text-sm font-medium">Содержимое</label>
                        <Textarea name="content" rows={5} placeholder="Текст блока..." required />
                    </div>
                    <div>
                        <label className="text-sm font-medium">Тип блока</label>
                        <Select name="block_type" defaultValue="text">
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="text">Текст</SelectItem>
                                <SelectItem value="heading">Заголовок</SelectItem>
                                <SelectItem value="financial">Финансовый</SelectItem>
                                <SelectItem value="list">Список</SelectItem>
                                <SelectItem value="image">Изображение</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex justify-end gap-3">
                        <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                            Отмена
                        </Button>
                        <Button type="submit" disabled={mutation.isPending}>
                            {mutation.isPending ? "Добавляем..." : "Добавить"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}