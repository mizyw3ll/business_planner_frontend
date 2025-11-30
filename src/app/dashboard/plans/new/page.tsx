// src/app/dashboard/plans/new/page.tsx
"use client";

import CreateBusinessPlanForm from "@/src/features/business-plans/components/BusinessPlanForm";

export default function NewPlanPage() {
    return (
        <div className="container mx-auto py-10">
            <CreateBusinessPlanForm />
        </div>
    );
}