// src/features/business-plans/components/BusinessPlanList.tsx

import { useBusinessPlanList } from "../api/useBusinessPlanList";
import BusinessPlanCard from "./BusinessPlanCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { APP_ROUTES } from "@/src/lib/appRoutes";

export default function BusinessPlanList() {
  const { data: plans, isLoading } = useBusinessPlanList();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-48" />
        ))}
      </div>
    );
  }

  if (!plans || plans.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">У вас пока нет бизнес-планов</h2>
        <Button size="sm" variant="outline" asChild>
          <Link href={APP_ROUTES.dashboard.plans.create}>Создать первый план</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {plans.map((plan) => (
        <BusinessPlanCard key={plan.id} plan={plan} />
      ))}
    </div>
  );
}