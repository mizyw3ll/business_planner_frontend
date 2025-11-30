// src/app/dashboard/financial/page.tsx
"use client";

import { useState } from "react";
import FinancialChartManager from "@/src/features/financial/components/FinancialChartManager";

export default function FinancialPage() {
    const [openCreate, setOpenCreate] = useState(false);

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-8">Финансовые графики</h1>
            <FinancialChartManager
                openCreate={openCreate}
                onOpenCreateChange={setOpenCreate}
            />
        </div>
    );
}