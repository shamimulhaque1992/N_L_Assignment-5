import { Handshake, House, LayoutDashboard, User } from "lucide-react";
import { ISidebarItems } from "./sidebarTypes";

export const LANDLORD_MENU_ITEMS: ISidebarItems[] = [
  {
    lebel: "Dashboard",
    href: "/dashboard/landlord",
    icon: LayoutDashboard,
  },
  {
    lebel: "Properties",
    href: "/dashboard/landlord/properties",
    icon: House,
  },
  {
    lebel: "Rental Requests",
    href: "/dashboard/landlord/requests",
    icon: Handshake,
  },
  {
    lebel: "Profile",
    href: "/dashboard/landlord/me",
    icon: User,
  },
];
