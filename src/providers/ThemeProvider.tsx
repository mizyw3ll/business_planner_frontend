// src/providers/ThemeProvider.tsx
"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { getAppTheme } from "@/src/theme";

type Props = React.ComponentProps<typeof NextThemesProvider>;

// Внутренний компонент, который использует тему из NextThemesProvider
function MuiThemeWrapper({ children }: { children: React.ReactNode }) {
    const { resolvedTheme } = useTheme();
    const mode = (resolvedTheme ?? "light") as "light" | "dark";
    const muiTheme = React.useMemo(() => getAppTheme(mode), [mode]);

    return (
        <MuiThemeProvider theme={muiTheme}>
            <CssBaseline />
            {children}
        </MuiThemeProvider>
    );
}

export default function ThemeProvider({ children, ...props }: Props) {
    return (
        <NextThemesProvider {...props}>
            <MuiThemeWrapper>{children}</MuiThemeWrapper>
        </NextThemesProvider>
    );
}