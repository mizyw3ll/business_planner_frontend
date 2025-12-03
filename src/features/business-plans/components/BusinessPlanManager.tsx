// src/features/business-plans/components/BusinessPlanManager.tsx
"use client";

import { Button, Box, Typography } from "@mui/material";
import { Plus } from "lucide-react";
import BusinessPlanList from "@/src/features/business-plans/components/BusinessPlanList";
import BusinessPlanDialogForm from "@/src/features/business-plans/components/BusinessPlanDialogForm";

type Props = {
    openCreate: boolean;
    onOpenCreateChange: (open: boolean) => void;
};

export default function BusinessPlanManager({ openCreate, onOpenCreateChange }: Props) {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    Мои планы
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<Plus size={18} />}
                    onClick={() => onOpenCreateChange(true)}
                >
                    Новый план
                </Button>
            </Box>

            <BusinessPlanList onOpenCreate={() => onOpenCreateChange(true)} />

            <BusinessPlanDialogForm
                open={openCreate}
                onOpenChange={onOpenCreateChange}
            />
        </Box>
    );
}
