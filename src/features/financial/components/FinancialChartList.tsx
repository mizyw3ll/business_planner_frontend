// src/features/financial/components/FinancialChartList.tsx
import FinancialChartCard from "./FinancialChartCard";
import { useFinancialChartList } from "../api/useFinancialChartList";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { APP_ROUTES } from "@/src/lib/appRoutes";

export default function FinancialChartList() {
    const { data: charts, isLoading } = useFinancialChartList();

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                    <Skeleton key={i} className="h-48" />
                ))}
            </div>
        );
    }

    if (!charts || charts.length === 0) {
        return (
            <div className="text-center py-12">
                <h2 className="text-2xl font-bold mb-4">У вас пока нет финансовых графиков</h2>
                <Button asChild>
                    <Link href={APP_ROUTES.dashboard.financial.create}>
                        Создать первый график
                    </Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {charts.map((chart) => (
                <FinancialChartCard key={chart.id} chart={chart} size="small" />
            ))}
        </div>
    );
}