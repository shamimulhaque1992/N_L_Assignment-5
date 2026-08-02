import {
  LayoutDashboard,
  LucideCircleDollarSign,
  Send,
  User,
} from "lucide-react";
import { ISidebarItems } from "./sidebarTypes";

export const TENANT_MENU_ITEMS: ISidebarItems[] = [
  {
    lebel: "Dashboard",
    href: "/dashboard/tenant",
    icon: LayoutDashboard,
  },
  {
    lebel: "Rental Requests",
    href: "/dashboard/tenant/requests",
    icon: Send,
  },
  {
    lebel: "Payment History",
    href: "/dashboard/tenant/payment-history",
    icon: LucideCircleDollarSign,
  },
  {
    lebel: "Profile",
    href: "/dashboard/tenant/me",
    icon: User,
  },
];
