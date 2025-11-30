// src/providers/Providers.tsx
"use client";

import { SessionProvider } from "next-auth/react";
import QueryProvider from "./QueryProvider";
import ThemeProvider from "./ThemeProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <QueryProvider>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    {children}
                </ThemeProvider>
            </QueryProvider>
        </SessionProvider>
    );
}