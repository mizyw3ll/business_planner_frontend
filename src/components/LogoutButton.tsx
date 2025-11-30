// src/components/LogoutButton.tsx
"use client";

import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { APP_ROUTES } from "@/src/lib/appRoutes";

export default function LogoutButton() {
    const handleLogout = () => {
        signOut({
            callbackUrl: APP_ROUTES.login // ← сразу на логин
        });
    };

    return (
        <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Выйти
        </Button>
    );
}