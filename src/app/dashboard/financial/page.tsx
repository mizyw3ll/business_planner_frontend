// src/app/dashboard/financial/page.tsx
"use client";

import { useState } from "react";
import { FinancialChartManager } from "@/src/features/financial/components";

export default function FinancialPage() {
    const [openCreate, setOpenCreate] = useState(false);

    return (
        <div className="container mx-auto py-8">
            <FinancialChartManager
                openCreate={openCreate}
                onOpenCreateChange={setOpenCreate}
            />
        </div>
    );
}