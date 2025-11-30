// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { APP_ROUTES } from "@/src/lib/appRoutes";

export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const { pathname } = req.nextUrl;

    // === ПУБЛИЧНЫЕ ПУТИ (разрешаем без токена) ===
    const isPublicPath =
        pathname.startsWith("/auth") ||                    // /auth/login, /auth/register
        pathname.startsWith("/api/auth") ||                // NextAuth API
        pathname === "/" ||                                // главная (редиректит сама)
        pathname.startsWith("/_next") ||                   // статика Next.js
        pathname.startsWith("/favicon.ico");

    if (isPublicPath) {
        return NextResponse.next();
    }

    // === ЗАЩИЩЁННЫЕ ПУТИ (всё под /dashboard) ===
    const isProtectedPath = pathname.startsWith(APP_ROUTES.dashboard.root);

    if (isProtectedPath) {
        if (!token) {
            // Редирект на логин + сохраняем, куда хотел зайти
            const loginUrl = new URL(APP_ROUTES.login, req.url);
            loginUrl.searchParams.set("callbackUrl", pathname);
            return NextResponse.redirect(loginUrl);
        }

        // Опционально: можно проверить роль пользователя
        // if (token.role !== "admin") { ... }
    }

    // Всё остальное — пропускаем (на случай публичных страниц в будущем)
    return NextResponse.next();
}

// === Мэтчер — только нужные пути (быстрее работает) ===
export const config = {
    matcher: [
        // Главная
        "/",

        // Авторизация
        "/auth/:path*",

        // ВСЁ под /dashboard (включая вложенные: /dashboard/plans/123)
        `${APP_ROUTES.dashboard.root}/:path*`,

        // NextAuth API (обязательно!)
        "/api/auth/:path*",
    ],
};