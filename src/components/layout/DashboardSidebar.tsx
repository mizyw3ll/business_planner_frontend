// src/components/layout/DashboardSidebar.tsx
"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Link from "next/link";
import { APP_ROUTES } from "@/src/lib/appRoutes";
import { useSidebar } from "./SidebarContext";

export function DashboardSidebar() {
  const { collapsed, setCollapsed } = useSidebar();

  const sidebarWidth = collapsed ? 32 : 170;

  return (
    <Box
      component="aside"
      sx={{
        position: "fixed",
        left: 0,
        top: 64,
        height: "calc(100vh - 64px)",
        width: sidebarWidth,
        backgroundColor: "var(--sidebar)",
        borderRight: "1px solid var(--sidebar-border)",
        boxShadow: "0 0 30px rgba(2,6,23,0.15)",
        display: "flex",
        flexDirection: "column",
        transition: "width 0.2s ease",
        zIndex: (theme) => theme.zIndex.appBar,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: collapsed ? "center" : "flex-end",
          px: collapsed ? 0 : 1,
          py: 1,
          borderBottom: "1px solid var(--sidebar-border)",
        }}
      >
        <IconButton
          size="small"
          onClick={() => setCollapsed((prev) => !prev)}
          sx={{ color: "var(--sidebar-foreground)" }}
        >
          {collapsed ? (
            <ChevronRightIcon fontSize="small" />
          ) : (
            <ChevronLeftIcon fontSize="small" />
          )}
        </IconButton>
      </Box>

      {!collapsed && (
        <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
          <List dense sx={{ color: "var(--sidebar-foreground)" }}>
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                href={APP_ROUTES.dashboard.root}
                sx={{
                  "&:hover": {
                    backgroundColor:
                      "color-mix(in srgb, var(--sidebar-foreground) 8%, transparent)",
                  },
                }}
              >
                <ListItemText primary="Дашборд" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                href={APP_ROUTES.dashboard.financial.list}
                sx={{
                  "&:hover": {
                    backgroundColor:
                      "color-mix(in srgb, var(--sidebar-foreground) 8%, transparent)",
                  },
                }}
              >
                <ListItemText primary="Финансы" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                href={APP_ROUTES.dashboard.plans.list}
                sx={{
                  "&:hover": {
                    backgroundColor:
                      "color-mix(in srgb, var(--sidebar-foreground) 8%, transparent)",
                  },
                }}
              >
                <ListItemText primary="Бизнес-планы" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                href={APP_ROUTES.dashboard.profile}
                sx={{
                  "&:hover": {
                    backgroundColor:
                      "color-mix(in srgb, var(--sidebar-foreground) 8%, transparent)",
                  },
                }}
              >
                <ListItemText primary="Профиль" />
              </ListItemButton>
            </ListItem>
          </List>
          <Divider sx={{ borderColor: "var(--sidebar-border)" }} />
        </Box>
      )}
    </Box>
  );
}
