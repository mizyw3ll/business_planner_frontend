// src/app/dashboard/page.tsx
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  return (
    <div className="container mx-auto py-16 text-center">
      <h1 className="text-4xl font-bold mb-12">Добро пожаловать!</h1>

      <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
        <Button asChild size="lg">
          <Link href="/dashboard/plans">
            Бизнес-планы
          </Link>
        </Button>

        <Button asChild size="lg" variant="outline">
          <Link href="/dashboard/financial">
            Финансы
          </Link>
        </Button>
      </div>
    </div>
  );
}