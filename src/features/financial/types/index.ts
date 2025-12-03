// src/features/financial/types/index.ts

export type ChartPoint = {
    id: number;
    chart_id: number;
    date: string; // ISO string
    type: "income" | "expense";
    amount: string; // Decimal как строка
    description: string | null;
    created_at?: string;
    updated_at?: string;
};

export type Currency = {
    id: number;
    code: string;
    name: string;
};

export type FinancialChart = {
    id: number;
    user_id: number;
    title: string;
    description: string | null;
    currency_id: number;
    currency?: Currency; // Опциональный, так как может не приходить в списке
    is_active: boolean;
    created_at: string;
    updated_at: string;
    chart_points: ChartPoint[];
};

export type CreateFinancialChartData = {
    title: string;
    currency_id: number;
    description?: string;
    is_active?: boolean;
};

export type UpdateFinancialChartData = {
    title?: string;
    description?: string | null;
    currency_id?: number;
    is_active?: boolean;
};

export type CreateChartPointData = {
    chart_id: number;
    date: string; // ISO string
    type: "income" | "expense";
    amount: string; // Decimal как строка
    description?: string;
};

export type UpdateChartPointData = {
    date?: string; // ISO string
    type?: "income" | "expense";
    amount?: string; // Decimal как строка
    description?: string;
};

export type FinancialChartList = FinancialChart[];
export type ChartPointList = ChartPoint[];

