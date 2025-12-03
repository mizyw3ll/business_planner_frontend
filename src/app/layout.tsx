// src/app/layout.tsx
"use client";

import * as React from "react";
import "@/src/globals.css";
import Providers from "@/src/providers/Providers";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";

function ClientOnly({ children }: { children: React.ReactNode }) {
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return <>{children}</>;
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ru" suppressHydrationWarning>
            <body>
                <AppRouterCacheProvider>
                    <ClientOnly>
                        <Providers>{children}</Providers>
                    </ClientOnly>
                </AppRouterCacheProvider>
            </body>
        </html>
    );
}
