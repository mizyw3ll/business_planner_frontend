// src/app/layout.tsx
import "@/src/globals.css";
import Providers from "@/src/providers/Providers";

export const metadata = {
    title: "Business Plans & Cashflow",
    description: "Твой финансовый дашборд",
};

export default function RootLayout(
    {
        children,
    }: {
        children: React.ReactNode;
    }) {
    return (
        <html lang="ru" suppressHydrationWarning>
            <body>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}