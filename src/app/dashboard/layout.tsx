// src/app/dashboard/layout.tsx
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/src/app/api/auth/[...nextauth]/route";
import LogoutButton from "@/src/components/LogoutButton";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/login");
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="container flex justify-between items-center py-4">
          <h1 className="text-2xl font-bold">Финансовый дашборд</h1>
          <LogoutButton />
        </div>
      </div>
      <div className="container py-8">
        {children}
      </div>
    </div>
  );
}