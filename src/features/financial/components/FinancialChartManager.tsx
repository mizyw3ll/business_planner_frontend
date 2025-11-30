// src/features/financial/components/FinancialChartManager.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import FinancialChartList from "@/src/features/financial/components/FinancialChartList";
import FinancialChartForm from "@/src/features/financial/components/FinancialChartForm";

type Props = {
    openCreate: boolean;
    onOpenCreateChange: (open: boolean) => void;
};

export default function FinancialChartManager({ openCreate, onOpenCreateChange }: Props) {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Мои графики</h2>
                <Button onClick={() => onOpenCreateChange(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Новый график
                </Button>
            </div>

            <FinancialChartList />

            <FinancialChartForm
                open={openCreate}
                onOpenChange={onOpenCreateChange}
            />
        </div>
    );
}
