import {
  Building,
  Handshake,
  LayoutDashboard,
  List,
  Users,
} from "lucide-react";
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
  {
    lebel: "All Rental Requests",
    href: "/dashboard/admin/requests",
    icon: Handshake,
  },
  {
    lebel: "All Properties",
    href: "/dashboard/admin/properties",
    icon: Building,
  },
  {
    lebel: "All Properties Categories",
    href: "/dashboard/admin/categories",
    icon: List,
  },
];
