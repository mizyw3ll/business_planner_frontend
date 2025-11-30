// src/app/dashboard/plans/[id]/page.tsx

"use client";

import { useParams } from "next/navigation";
import { useBusinessPlanGet } from "@/src/features/business-plans/api/useBusinessPlanGet";
import PlanBlocks from "@/src/features/business-plans/components/PlanBlocks";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import AddBlockButton from "@/src/features/business-plans/components/BlockForm";

export default function BusinessPlanDetailPage() {
  const { id } = useParams();
  const planId = Number(id);
  const { data: plan, isLoading, error } = useBusinessPlanGet(planId);

  if (isLoading) {
    return (
      <div className="container mx-auto py-10">
        <Skeleton className="h-12 w-64 mb-8" />
        <Skeleton className="h-96" />
      </div>
    );
  }

  if (error || !plan) {
    return (
      <div className="container mx-auto py-10 text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">План не найден</h1>
        <Button asChild>
          <Link href="/dashboard">Назад к списку</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-4xl font-bold">{plan?.title}</h1>
          <AddBlockButton planId={planId} />
          {plan?.description && (
            <p className="text-xl text-muted-foreground mt-2">
              {plan?.description}
            </p>
          )}
        </div>
        <Button variant="outline" asChild>
          <Link href="/dashboard">Назад</Link>
        </Button>
      </div>

      <PlanBlocks blocks={plan?.blocks || []} planId={planId} />
    </div>
  );
}
