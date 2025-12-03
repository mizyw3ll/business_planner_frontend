// src/features/financial/components/FinancialChartManager.tsx
"use client";

import { Button, Box, Typography } from "@mui/material";
import { Plus } from "lucide-react";
import FinancialChartList from "@/src/features/financial/components/FinancialChartList";
import FinancialChartForm from "@/src/features/financial/components/FinancialChartForm";

type Props = {
    openCreate: boolean;
    onOpenCreateChange: (open: boolean) => void;
};

export default function FinancialChartManager({ openCreate, onOpenCreateChange }: Props) {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    Мои графики
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<Plus size={18} />}
                    onClick={() => onOpenCreateChange(true)}
                >
                    Новый график
                </Button>
            </Box>

            <FinancialChartList onOpenCreate={() => onOpenCreateChange(true)} />

            <FinancialChartForm
                open={openCreate}
                onOpenChange={onOpenCreateChange}
            />
        </Box>
    );
}
