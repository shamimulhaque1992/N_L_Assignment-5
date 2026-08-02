"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { IUser } from "@/lib/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ISidebarItems } from "../_config/sidebarTypes";
import { sidebarMenuItems } from "../_config/sidebarMenuItems";

export default function DashboardSidebar({ user }: { user: IUser }) {
  const pathname = usePathname();

  let navItems: ISidebarItems[] = [];
  if (user?.data?.role === "ADMIN") {
    navItems = sidebarMenuItems.ADMIN;
  } else if (user?.data?.role === "LANDLORD") {
    navItems = sidebarMenuItems.LANDLORD;
  } else if (user?.data?.role === "TENANT") {
    navItems = sidebarMenuItems.TENANT;
  }

  const roleLabel =
    user?.data?.role === "ADMIN"
      ? "Admin Panel"
      : user?.data?.role === "LANDLORD"
        ? "Landlord Panel"
        : "Tenant Panel";

  return (
    <Sidebar collapsible="offcanvas">
      <SidebarHeader className="px-4 py-3 border-b border-sidebar-border">
        <p className="text-xs font-semibold uppercase tracking-widest text-sidebar-foreground/50">
          {roleLabel}
        </p>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild isActive={pathname === item.href}>
                    <Link href={item.href}>
                      <item.icon />
                      <span>{item.lebel}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

export function MobileSidebarTrigger() {
  return (
    <div className="flex items-center md:hidden px-4 py-2 border-b">
      <SidebarTrigger />
    </div>
  );
}

