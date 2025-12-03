// src/app/dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Box,
  Typography,
  Paper,
  Button,
  Container,
  useTheme,
  alpha,
  Fade
} from "@mui/material";
import {
  Description as FileText,
  TrendingUp,
  BarChart as BarChartIcon,
  ArrowRight,
  Business,
  PieChart,
  InsertChart as ChartIcon
} from "@mui/icons-material";
import { useBusinessPlanList } from "@/src/features/business-plans/api/useBusinessPlanList";
import { useFinancialChartList } from "@/src/features/financial/api/useFinancialChartList";

export default function DashboardPage() {
  const theme = useTheme();
  const [greeting, setGreeting] = useState("");

  const { data: plans, isLoading: plansLoading } = useBusinessPlanList();
  const { data: charts, isLoading: chartsLoading } = useFinancialChartList();

  const plansCount = plans?.length || 0;
  const chartsCount = charts?.length || 0;
  const totalPoints = charts?.reduce(
    (sum, chart) => sum + (chart.chart_points?.length || 0),
    0
  ) || 0;

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Доброе утро!");
    else if (hour < 18) setGreeting("Добрый день!");
    else setGreeting("Добрый вечер!");
  }, []);

  const quickActions = [
    {
      title: "Создать бизнес-план",
      description: "Начните новый проект",
      icon: <Business sx={{ fontSize: 32 }} />,
      href: "/dashboard/plans",
      color: theme.palette.primary.main,
      bgColor: alpha(theme.palette.primary.main, 0.08)
    },
    {
      title: "Финансовый анализ",
      description: "Анализ и прогнозирование",
      icon: <PieChart sx={{ fontSize: 32 }} />,
      href: "/dashboard/financial",
      color: theme.palette.success.main,
      bgColor: alpha(theme.palette.success.main, 0.08)
    },
    {
      title: "Мои проекты",
      description: "Все ваши бизнес-планы",
      icon: <FileText sx={{ fontSize: 32 }} />,
      href: "/dashboard/plans",
      color: theme.palette.info.main,
      bgColor: alpha(theme.palette.info.main, 0.08)
    }
  ];

  return (
    <Container maxWidth="xl" sx={{ py: 4, px: { xs: 2, sm: 3 } }}>
      {/* Header */}
      <Fade in={true} timeout={800}>
        <Box sx={{ mb: 6 }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              mb: 1,
              background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}
          >
            {greeting}
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
            Панель управления вашими проектами
          </Typography>
        </Box>
      </Fade>

      {/* Stats Grid */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
          gap: 3,
          mb: 6,
        }}
      >
        <StatCard
          title="Бизнес-планы"
          value={plansLoading ? "…" : plansCount}
          icon={<FileText />}
          color={theme.palette.primary.main}
          description="Активные проекты"
          gradient={`linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.15)}, ${alpha(theme.palette.primary.main, 0.05)})`}
        />
        <StatCard
          title="Финансовые графики"
          value={chartsLoading ? "…" : chartsCount}
          icon={<TrendingUp />}
          color={theme.palette.success.main}
          description="Созданные анализы"
          gradient={`linear-gradient(135deg, ${alpha(theme.palette.success.main, 0.15)}, ${alpha(theme.palette.success.main, 0.05)})`}
        />
        <StatCard
          title="Финансовые точки"
          value={chartsLoading ? "…" : totalPoints}
          icon={<BarChartIcon />}
          color={theme.palette.info.main}
          description="Всего данных"
          gradient={`linear-gradient(135deg, ${alpha(theme.palette.info.main, 0.15)}, ${alpha(theme.palette.info.main, 0.05)})`}
        />
      </Box>

      {/* Quick Actions */}
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
        Быстрые действия
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
          gap: 3,
          mb: 6,
        }}
      >
        {quickActions.map((action, index) => (
          <Fade in={true} timeout={800 + index * 100} key={index}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 3,
                border: `1px solid ${alpha(action.color, 0.2)}`,
                background: action.bgColor,
                height: "100%",
                transition: "all 0.3s ease",
                cursor: "pointer",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: `0 12px 24px ${alpha(action.color, 0.15)}`,
                  borderColor: alpha(action.color, 0.4),
                },
                position: "relative",
                overflow: "hidden",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 4,
                  background: action.color,
                  borderRadius: "3px 3px 0 0",
                }
              }}
              component={Link}
              href={action.href}
            >
              <Box sx={{ display: "flex", alignItems: "flex-start", mb: 2 }}>
                <Box sx={{
                  mr: 2,
                  color: action.color
                }}>
                  {action.icon}
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                    {action.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {action.description}
                  </Typography>
                </Box>
                <ArrowRight sx={{
                  color: action.color,
                  opacity: 0.7,
                  transition: "transform 0.2s ease"
                }} />
              </Box>
            </Paper>
          </Fade>
        ))}
      </Box>

      {/* В планах */}
      {/* <Paper
        elevation={0}
        sx={{
          p: 4,
          borderRadius: 3,
          background: theme.palette.mode === 'light'
            ? alpha(theme.palette.grey[100], 0.8)
            : alpha(theme.palette.grey[900], 0.5),
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 4 }}>
          Основные разделы
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
            gap: 3,
          }}
        >
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 2,
              border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
              background: alpha(theme.palette.primary.main, 0.03),
              transition: "all 0.3s ease",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              "&:hover": {
                background: alpha(theme.palette.primary.main, 0.08),
                borderColor: alpha(theme.palette.primary.main, 0.4),
                transform: "translateX(8px)",
              }
            }}
            component={Link}
            href="/dashboard/plans"
          >
            <FileText sx={{
              mr: 2,
              color: theme.palette.primary.main,
              fontSize: 32
            }} />
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Бизнес-планы
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Управление и создание бизнес-планов
              </Typography>
            </Box>
            <ArrowRight sx={{ color: theme.palette.primary.main }} />
          </Paper>

          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 2,
              border: `1px solid ${alpha(theme.palette.success.main, 0.2)}`,
              background: alpha(theme.palette.success.main, 0.03),
              transition: "all 0.3s ease",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              "&:hover": {
                background: alpha(theme.palette.success.main, 0.08),
                borderColor: alpha(theme.palette.success.main, 0.4),
                transform: "translateX(8px)",
              }
            }}
            component={Link}
            href="/dashboard/financial"
          >
            <ChartIcon sx={{
              mr: 2,
              color: theme.palette.success.main,
              fontSize: 32
            }} />
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Финансы
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Финансовый анализ и графики
              </Typography>
            </Box>
            <ArrowRight sx={{ color: theme.palette.success.main }} />
          </Paper>
        </Box>
      </Paper> */}

      {/* Recent Activity (Placeholder for future implementation) */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
          Последняя активность
        </Typography>
        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: 3,
            border: `1px solid ${theme.palette.divider}`,
            background: theme.palette.background.paper,
          }}
        >
          <Typography color="text.secondary" sx={{ textAlign: "center", py: 2 }}>
            Здесь будет отображаться ваша последняя активность
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
}

// Stat Card Component
function StatCard({
  title,
  value,
  icon,
  color,
  description,
  gradient
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
  description: string;
  gradient: string;
}) {
  return (
    <Fade in={true} timeout={500}>
      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 3,
          background: gradient,
          border: `1px solid ${alpha(color, 0.2)}`,
          height: "100%",
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: color,
            borderRadius: "3px 3px 0 0",
          }
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
          <Box>
            <Typography variant="subtitle2" sx={{ color: "text.secondary", fontWeight: 600, mb: 0.5 }}>
              {title}
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 700, color: color }}>
              {value}
            </Typography>
          </Box>
          <Box sx={{
            color: color,
            opacity: 0.8,
            "& .MuiSvgIcon-root": {
              fontSize: 32
            }
          }}>
            {icon}
          </Box>
        </Box>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </Paper>
    </Fade>
  );
}