import { AppNavBar } from "@/components/shared/AppNavBar";
import { getMyProfile } from "../(authGroup)/auth/_actions/getMyProfile";
import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "./dashboard/_components/DashboardSidebar";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getMyProfile();
  return (
    <div className="min-h-screen bg-muted/40">
      <AppNavBar user={user} />

      <SidebarProvider className="flex-1">
        <DashboardSidebar user={user} />
        <main className="flex-1 min-w-0">{children}</main>
      </SidebarProvider>
    </div>
  );
};

export default DashboardLayout;
