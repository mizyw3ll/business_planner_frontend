// src/app/dashboard/plans/page.tsx
"use client";

import BusinessPlanList from "@/src/features/business-plans/components/BusinessPlanList";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DashboardPage() {
    return (
        <div className="container mx-auto py-10">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold">Мои бизнес-планы</h1>
                <Button asChild>
                    <Link href="/dashboard/plans/new">+ Новый план</Link>
                </Button>
            </div>

            <BusinessPlanList />
        </div>
    );
}