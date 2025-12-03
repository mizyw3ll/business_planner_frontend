// src/app/dashboard/layout.tsx
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Box from "@mui/material/Box";
import { authOptions } from "@/src/app/api/auth/[...nextauth]/route";
import { AppHeader } from "@/src/components/layout/AppHeader";
import { DashboardSidebar } from "@/src/components/layout/DashboardSidebar";
import { SidebarProvider } from "@/src/components/layout/SidebarContext";
import { DashboardContent } from "@/src/components/layout/DashboardContent";

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
    <SidebarProvider>
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "var(--background)",
          color: "var(--foreground)",
          transition: "background-color 200ms ease, color 200ms ease",
        }}
      >
        <AppHeader
          username={session.user?.username ?? null}
          email={session.user?.email ?? null}
        />

        <DashboardSidebar />
        <DashboardContent>{children}</DashboardContent>
      </Box>
    </SidebarProvider>
  );
}