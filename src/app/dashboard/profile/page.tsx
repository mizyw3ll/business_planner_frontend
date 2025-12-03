// src/app/dashboard/profile/page.tsx

"use client";

import { useEffect, useState } from "react";
import api from "@/src/lib/axios";
import LogoutButton from "@/src/components/LogoutButton";

import { useBusinessPlanList } from "@/src/features/business-plans/api/useBusinessPlanList";
import { useFinancialChartList } from "@/src/features/financial/api/useFinancialChartList";

import {
    Paper,
    Box,
    Typography,
    useTheme,
} from "@mui/material";

import { FileText, TrendingUp, BarChart3 } from "lucide-react";

type CurrentUser = {
    id: string;
    email: string;
    username: string | null;
};

export default function ProfilePage() {
    const theme = useTheme();

    const [user, setUser] = useState<CurrentUser | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const { data: plans, isLoading: plansLoading } = useBusinessPlanList();
    const { data: charts, isLoading: chartsLoading } = useFinancialChartList();

    const plansCount = plans?.length || 0;
    const chartsCount = charts?.length || 0;
    const totalPoints =
        charts?.reduce(
            (sum, chart) => sum + (chart.chart_points?.length || 0),
            0
        ) || 0;

    useEffect(() => {
        async function loadUser() {
            try {
                const { data } = await api.get<CurrentUser>("/api/v1/users/me");
                setUser(data);
            } catch {
                setError("Не удалось загрузить данные пользователя");
            } finally {
                setLoading(false);
            }
        }

        loadUser();
    }, []);

    return (
        <Box sx={{ maxWidth: 1200, mx: "auto", py: 6, px: 2 }}>
            {/* Header */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 4,
                }}
            >
                <Box>
                    <Typography variant="h4" fontWeight={700}>
                        Профиль
                    </Typography>

                    {/* {user && (
                        <Typography
                            variant="body2"
                            sx={{ color: theme.palette.text.secondary }}
                        >
                            {user.username || user.email}
                        </Typography>
                    )} */}
                </Box>

                <LogoutButton />
            </Box>

            {/* User info card */}
            <Paper
                elevation={3}
                sx={{
                    p: 3,
                    borderRadius: "18px",
                    backdropFilter: "blur(12px)",
                    background: theme.palette.mode === "light"
                        ? "rgba(255,255,255,0.65)"
                        : "rgba(30,30,35,0.55)",
                    boxShadow:
                        theme.palette.mode === "light"
                            ? "0 8px 26px rgba(0,0,0,0.08)"
                            : "0 8px 26px rgba(0,0,0,0.45)",
                    mb: 4,
                }}
            >
                {loading && (
                    <Typography color="text.secondary">
                        Загружаем данные пользователя...
                    </Typography>
                )}

                {error && (
                    <Typography color="error">{error}</Typography>
                )}

                {user && (
                    <Box sx={{ display: "grid", gap: 1 }}>
                        <Box>
                            <Typography variant="caption" color="text.secondary">
                                Email:
                            </Typography>
                            <Typography>{user.email}</Typography>
                        </Box>

                        <Box>
                            <Typography variant="caption" color="text.secondary">
                                Имя пользователя:
                            </Typography>
                            <Typography>{user.username || "—"}</Typography>
                        </Box>
                    </Box>
                )}
            </Paper>

            {/* Stats */}
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
                    gap: 3,
                }}
            >
                <StatCard
                    label="Бизнес-планы"
                    value={plansLoading ? "…" : plansCount}
                    color={theme.palette.primary.main}
                    Icon={FileText}
                />

                <StatCard
                    label="Финансовые графики"
                    value={chartsLoading ? "…" : chartsCount}
                    color={theme.palette.success.main}
                    Icon={TrendingUp}
                />

                <StatCard
                    label="Финансовые точки"
                    value={chartsLoading ? "…" : totalPoints}
                    color={theme.palette.info.main}
                    Icon={BarChart3}
                />
            </Box>
        </Box>
    );
}

/* ------------------------- Stat Card Component ------------------------- */

function StatCard({ label, value, color, Icon }: any) {
    return (
        <Paper
            elevation={4}
            sx={{
                p: 3,
                borderRadius: "18px",
                transition: "all 0.25s ease",
                cursor: "default",
                "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 12px 32px rgba(0,0,0,0.12)",
                },
            }}
        >
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography
                    variant="subtitle2"
                    sx={{ color: "text.secondary", fontWeight: 600 }}
                >
                    {label}
                </Typography>

                <Icon size={22} style={{ color }} />
            </Box>

            <Typography variant="h3" sx={{ fontWeight: 700, color }}>
                {value}
            </Typography>

            <Typography sx={{ mt: 1 }} variant="body2" color="text.secondary">
                Всего записей
            </Typography>
        </Paper>
    );
}
