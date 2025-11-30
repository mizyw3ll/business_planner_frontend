// src/features/business-plans/components/BusinessPlanCard.tsx

import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import { format} from "date-fns";
import { ru } from "date-fns/locale";
import { APP_ROUTES } from "@/src/lib/appRoutes";
import DeletePlanButton from "./BusinessPlanActions";

type Props = {
  plan: {
    id: number;
    title: string;
    description: string | null;
    created_at: string;
  };
};

export default function BusinessPlanCard({ plan }: Props) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle>{plan.title}</CardTitle>
        <CardDescription>
          {plan.description || "Нет описания"}
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          {/* 23 ноября 2025 */}
          {/* Создан {format(new Date(plan.created_at), "dd.MM.yyyy", {locale: ru})} */}

          {/* 5 дней назад */}
          Создан {formatDistanceToNow(new Date(plan.created_at), { locale: ru, addSuffix: true })}
        </p>
        
        <div className="flex gap-2">
          
          <Button size="sm" variant="outline" asChild>
            <Link href={APP_ROUTES.dashboard.plans.detail(plan.id)}>Открыть</Link>
          </Button>

          <Button size="sm" variant="outline" asChild>
            <Link href={APP_ROUTES.dashboard.plans.edit(plan.id)}>Редактировать</Link>
          </Button>
          
          <DeletePlanButton planId={plan.id} />
        </div>
      </CardFooter>
    </Card>
  );
}