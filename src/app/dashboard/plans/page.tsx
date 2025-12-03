// src/app/dashboard/plans/page.tsx
"use client";

import { useState } from "react";
import { BusinessPlanManager } from "@/src/features/business-plans/components";

export default function DashboardPage() {
    const [openCreate, setOpenCreate] = useState(false);

    return (
        <div className="container mx-auto py-8">
            <BusinessPlanManager
                openCreate={openCreate}
                onOpenCreateChange={setOpenCreate}
            />
        </div>
    );
}