// src/app/dashboard/financial/new/page.tsx
"use client";

import FinancialChartForm from "@/src/features/financial/components/FinancialChartForm";
import { APP_ROUTES } from "@/src/lib/appRoutes";
import { Button, Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function CreateFinancialChartPage() {
    const router = useRouter();
    const [open, setOpen] = useState(true);

    const handleClose = () => {
        router.push(APP_ROUTES.dashboard.financial.list);
    };

    return (
        <Box sx={{ maxWidth: 1200, mx: "auto", py: 4 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 4 }}>
                <Box>
                    <Button
                        variant="outlined"
                        size="small"
                        component={Link}
                        href={APP_ROUTES.dashboard.financial.list}
                        startIcon={<ArrowLeft size={18} />}
                        sx={{ mb: 2 }}
                    >
                        К списку графиков
                    </Button>
                    <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
                        Создание финансового графика
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Создайте новый финансовый график для отслеживания доходов и расходов
                    </Typography>
                </Box>
            </Box>

            <FinancialChartForm open={open} onOpenChange={handleClose} />
        </Box>
    );
}
