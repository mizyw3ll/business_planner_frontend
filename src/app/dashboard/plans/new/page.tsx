// src/app/dashboard/plans/new/page.tsx
"use client";

import { Box } from "@mui/material";
import CreateBusinessPlanForm from "@/src/features/business-plans/components/BusinessPlanForm";

export default function NewPlanPage() {
    return (
        <Box sx={{ maxWidth: 1200, mx: "auto", py: 5 }}>
            <CreateBusinessPlanForm />
        </Box>
    );
}
