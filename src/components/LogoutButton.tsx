// src/components/LogoutButton.tsx
"use client";

import { Button } from "@mui/material";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { APP_ROUTES } from "@/src/lib/appRoutes";

export default function LogoutButton() {
    const handleLogout = () => {
        signOut({
            callbackUrl: APP_ROUTES.login,
        });
    };

    return (
        <Button
            variant="text"
            size="small"
            onClick={handleLogout}
            startIcon={<LogOut size={18} />}
            sx={{
                color: "text.secondary",
                "&:hover": {
                    bgcolor: "action.hover",
                },
            }}
        >
            Выйти
        </Button>
    );
}
