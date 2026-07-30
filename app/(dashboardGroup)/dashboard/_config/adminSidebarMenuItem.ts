import { LayoutDashboard, Users } from "lucide-react";
import { ISidebarItems } from "./sidebarTypes";

export const ADMIN_MENU_ITEMS: ISidebarItems[] = [
  {
    lebel: "Dashboard",
    href: "/dashboard/admin",
    icon: LayoutDashboard,
  },
  {
    lebel: "Users",
    href: "/dashboard/admin/users",
    icon: Users,
  },
];
