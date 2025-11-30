// src/lib/appRoutes.ts — ИДЕАЛЬНАЯ ВЕРСИЯ

export const APP_ROUTES = {
    // Публичные
    home: "/",
    login: "/auth/login",
    register: "/auth/register",

    // Защищённые — всё под /dashboard
    dashboard: {
        root: "/dashboard" as const,

        // Подразделы дашборда
        plans: {
            list: "/dashboard/plans" as const,                   
            detail: (id: number) => `/dashboard/plans/${id}` as const,
            create: "/dashboard/plans/new" as const,
            edit: (id: number) => `/dashboard/plans/${id}/edit` as const,
        },

        financial: {
            list: "/dashboard/financial" as const,
            detail: (id: number) => `/dashboard/financial/${id}` as const,
            create: "/dashboard/financial/new" as const,
            edit: (id: number) => `/dashboard/financial/${id}/edit` as const,
        },

        // на будущее
        cashflow: "/dashboard/cashflow" as const,
        analytics: "/dashboard/analytics" as const,
        settings: "/dashboard/settings" as const,
        profile: "/dashboard/profile" as const,


    },
} as const;