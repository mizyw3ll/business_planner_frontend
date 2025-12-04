// src/components/layout/AppHeader.tsx
"use client";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import Link from "next/link";
import { APP_ROUTES } from "@/src/lib/appRoutes";
import { useTheme } from "next-themes";
import { useMediaQuery } from "@mui/material";

interface AppHeaderProps {
    username?: string | null;
    email?: string | null;
}

export function AppHeader({ username, email }: AppHeaderProps) {
    const { setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);
    const isMobile = useMediaQuery("(max-width: 900px)");
    const isVerySmall = useMediaQuery("(max-width: 500px)");

    React.useEffect(() => setMounted(true), []);

    const displayName = username ?? email?.split("@")[0] ?? "Профиль";
    const isDark = resolvedTheme === "dark";

    const siteName = isVerySmall 
        ? "Конструктор бизнеса"                                          
        : isMobile 
            ? "Конструктор бизнеса"                               
            : "Конструктор бизнес планов";         


    return (
        <AppBar
            position="fixed"
            sx={{
                zIndex: (theme) => theme.zIndex.drawer + 1,
                backdropFilter: "blur(12px)",
                backgroundColor: "background.paper",
                borderBottom: 1,
                borderColor: "divider",
                boxShadow: isDark 
                    ? "0 8px 32px rgba(0,0,0,0.4)"
                    : "0 4px 20px rgba(0,0,0,0.08)",
            }}
        >
            <Toolbar sx={{ px: { xs: 1.5, sm: 3 }, minHeight: { xs: 64, sm: 64 } }}>
                {/* Логотип + название */}
                <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1, gap: 1.5 }}>
                    <IconButton
                        component={Link}
                        href={APP_ROUTES.dashboard.root}
                        sx={{ color: "primary.main" }}
                    >
                        <DashboardIcon />
                    </IconButton>

                    <Typography
                        variant={isMobile ? "subtitle1" : "h6"}
                        sx={{
                            fontWeight: 700,
                            color: "text.primary",
                            letterSpacing: "-0.5px",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            maxWidth: { xs: 180, sm: 300, md: 400 },
                        }}
                    >
                        {siteName}
                    </Typography>
                </Box>

                {/* Кнопка Дашборд — скрываем текст на мобильных */}
                {!isVerySmall && (
                    <Tooltip title="Перейти на дашборд">
                        <Button
                            component={Link}
                            href={APP_ROUTES.dashboard.root}
                            startIcon={<DashboardIcon />}
                            sx={{
                                textTransform: "none",
                                fontWeight: 500,
                                display: { xs: "none", md: "flex" }, // полностью скрываем на мобильных
                            }}
                        >
                            Дашборд
                        </Button>
                    </Tooltip>
                )}

                {/* Тема */}
                <IconButton onClick={() => setTheme(isDark ? "light" : "dark")}>
                    {mounted && (isDark ? <LightModeIcon /> : <DarkModeIcon />)}
                </IconButton>

                {/* Профиль */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Tooltip title="Личный кабинет">
                        <IconButton component={Link} href={APP_ROUTES.dashboard.profile}>
                            <AccountCircle />
                        </IconButton>
                    </Tooltip>

                    {/* Имя пользователя — скрываем на маленьких экранах */}
                    {!isMobile && (
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {displayName}
                        </Typography>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
}