"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import { useSidebar } from "./SidebarContext";

export function DashboardContent({ children }: { children: React.ReactNode }) {
    const { collapsed } = useSidebar();

    const sidebarWidth = collapsed ? 32 : 170;

    return (
        <Box
            component="main"
            sx={{
                position: "relative",
                mt: 8,
                py: 4,
                px: 3,
                ml: `${sidebarWidth}px`,
                width: `calc(100% - ${sidebarWidth}px)`,
                maxWidth: "100vw",
                transition: "margin-left 0.2s ease, width 0.2s ease",
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
                backgroundColor: "var(--background)",
                color: "var(--foreground)",
                minHeight: "calc(100vh - 64px)",
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    maxWidth: 1400,
                }}
            >
                {children}
            </Box>
        </Box>
    );
}

