// src/app/auth/login/page.tsx
import React from "react";
import LoginForm from "@/src/features/auth/components/LoginForm";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function LoginPage(): React.JSX.Element {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Вход в аккаунт</CardTitle>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
}