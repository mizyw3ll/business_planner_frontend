// src/features/financial/components/CreateFinancialChartDialog.tsx
"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useFinancialChartCreate } from "@/src/features/financial/api/useFinancialChartCreate";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";

type Props = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

export default function FinancialChartForm({ open, onOpenChange }: Props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [currencyId, setCurrencyId] = useState("");
    const mutation = useFinancialChartCreate();

    const handleSubmit = () => {
        mutation.mutate(
            { title, currency_id: Number(currencyId) },
            { onSuccess: () => onOpenChange(false) }
        );
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Новый финансовый график</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <Input
                        placeholder="Название графика"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <Textarea
                        placeholder="Опинсание"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <Input
                        type="number"
                        placeholder="ID валюты"
                        value={currencyId}
                        onChange={(e) => setCurrencyId(e.target.value)}
                    />
                    <Button onClick={handleSubmit} disabled={mutation.isPending}>
                        Создать
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}