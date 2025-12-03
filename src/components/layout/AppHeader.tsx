// src/components/layout/AppHeader.tsx
"use client";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import Link from "next/link";
import { APP_ROUTES } from "@/src/lib/appRoutes";
import { useTheme } from "next-themes";

interface AppHeaderProps {
    username?: string | null;
    email?: string | null;
}

export function AppHeader({ username, email }: AppHeaderProps) {
    const { resolvedTheme, theme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);
    const [domTheme, setDomTheme] = React.useState<"light" | "dark">("light");

    React.useEffect(() => {
        setMounted(true);
        if (typeof document === "undefined") return;
        const root = document.documentElement;
        const updateTheme = () => {
            setDomTheme(root.classList.contains("dark") ? "dark" : "light");
        };
        updateTheme();
        const observer = new MutationObserver(updateTheme);
        observer.observe(root, { attributes: true, attributeFilter: ["class"] });
        return () => observer.disconnect();
    }, []);

    React.useEffect(() => {
        if (resolvedTheme === "dark" || resolvedTheme === "light") {
            setDomTheme(resolvedTheme);
        } else if (theme === "dark" || theme === "light") {
            setDomTheme(theme);
        }
    }, [resolvedTheme, theme]);

    const currentTheme = domTheme;
    const isDark = currentTheme === "dark";
    const displayName = username ?? email ?? "Мой профиль";

    const handleToggleTheme = () => {
        setTheme(isDark ? "light" : "dark");
    };

    return (
        <AppBar
            position="fixed"
            sx={(theme) => ({
                top: 0,
                backgroundColor: theme.palette.primary.main, 
                color: theme.palette.primary.contrastText,
                backdropFilter: "blur(12px)",
                borderBottom: `1px solid ${theme.palette.divider}`,
                boxShadow: isDark
                    ? "0 10px 30px rgba(2,6,23,0.5)"
                    : "0 6px 20px rgba(15,23,42,0.12)",
                zIndex: theme.zIndex.appBar + 1,
                transition: "background-color 200ms ease, color 200ms ease, box-shadow 200ms ease",
            })}
        >
            <Toolbar sx={{ px: 3, gap: 1 }}>
                <Typography
                    variant="h6"
                    sx={{
                        flexGrow: 1,
                        fontWeight: 600,
                        color: "var(--sidebar-foreground)",
                    }}
                >
                    Финансовый дашборд
                </Typography>

                <Button
                    component={Link}
                    href={APP_ROUTES.dashboard.root}
                    startIcon={<DashboardIcon />}
                    sx={{
                        color: "var(--sidebar-foreground)",
                        textTransform: "none",
                        fontWeight: 500,
                        "&:hover": {
                            backgroundColor: "color-mix(in srgb, var(--sidebar-foreground) 6%, transparent)",
                        },
                    }}
                >
                    Dashboard
                </Button>

                <IconButton
                    onClick={handleToggleTheme}
                    sx={{
                        ml: 1,
                        color: "var(--sidebar-foreground)",
                        "&:hover": {
                            backgroundColor: "color-mix(in srgb, var(--sidebar-foreground) 10%, transparent)",
                        },
                    }}
                >
                    {mounted && (isDark ? <LightModeIcon /> : <DarkModeIcon />)}
                </IconButton>

                <IconButton
                    component={Link}
                    href={APP_ROUTES.dashboard.profile}
                    sx={{
                        ml: 1,
                        color: "var(--sidebar-foreground)",
                        "&:hover": {
                            backgroundColor: "color-mix(in srgb, var(--sidebar-foreground) 10%, transparent)",
                        },
                    }}
                >
                    <AccountCircle />
                </IconButton>

                <Typography
                    variant="body2"
                    sx={{ ml: 1, color: "var(--sidebar-foreground)", fontWeight: 500 }}
                >
                    {displayName}
                </Typography>
            </Toolbar>
        </AppBar>
    );
}


