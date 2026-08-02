"use client";

import { Fragment, useState } from "react";
import Link from "next/link";
import {
  CreditCardIcon,
  LayoutDashboard,
  LogOutIcon,
  Menu,
  SettingsIcon,
  UserIcon,
  X,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { IUser } from "@/lib/types";
import { getAvatarNameFromFullName } from "@/service/appHelper";
import { logout } from "@/service/logout";

const menuItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Properties", href: "/properties" },
  { label: "Contact", href: "/contact" },
] as const;

const profileMenuSections = [
  {
    id: "account",
    items: [
      { label: "Profile", href: "#profile", icon: UserIcon },
      { label: "Dashboard", href: "#dashboard", icon: LayoutDashboard },
      { label: "Billing", href: "#billing", icon: CreditCardIcon },
      { label: "Settings", href: "#settings", icon: SettingsIcon },
    ],
  },
  {
    id: "session",
    items: [{ label: "Log out", href: "#logout", icon: LogOutIcon }],
  },
] as const;

export function AppNavBar({ user }: { user: IUser }) {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleUserMenuAction = async (action: string) => {
    if (action === "Dashboard") {
      if (user?.data?.role === "TENANT") {
        router.push("/dashboard/tenant");
      } else if (user?.data?.role === "LANDLORD") {
        router.push("/dashboard/landlord");
      } else if (user?.data?.role === "ADMIN") {
        router.push("/dashboard/admin");
      }
    }

    if (action === "Log out") {
      await logout();
      toast.success("User logged out successfully!");
      router.push("/auth/login");
    }
  };

  return (
    <header className="sticky top-0 border-b bg-background/95 backdrop-blur z-50">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
        <Link
          href="/"
          className="font-sans text-lg font-semibold tracking-tight"
          aria-label="Northstar home"
        >
          RENT 🏠 NEST
        </Link>

        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            {menuItems.map((item) => (
              <NavigationMenuItem key={item.href}>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link href={item.href}>{item.label}</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-2">
          {user.success ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                  aria-label="Open profile menu"
                >
                  <Avatar className="size-8">
                    <AvatarFallback>
                      {user && getAvatarNameFromFullName(user?.data?.name)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuGroup>
                  <DropdownMenuLabel>
                    <span className="flex flex-col gap-0.5">
                      <span>{user?.data?.name}</span>
                      <span className="text-xs font-normal text-muted-foreground">
                        {user?.data?.email}
                      </span>
                      <span className="text-xs font-normal text-muted-foreground">
                        {user?.data?.role}
                      </span>
                    </span>
                  </DropdownMenuLabel>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                {profileMenuSections.map((section, index) => (
                  <Fragment key={section.id}>
                    {index > 0 && <DropdownMenuSeparator />}
                    <DropdownMenuGroup>
                      {section.items.map((item) => {
                        const Icon = item.icon;

                        return (
                          <DropdownMenuItem
                            key={item.href}
                            variant={
                              section.id === "session"
                                ? "destructive"
                                : "default"
                            }
                            onClick={async () =>
                              await handleUserMenuAction(item.label)
                            }
                          >
                            <Icon />
                            {item.label}
                          </DropdownMenuItem>
                        );
                      })}
                    </DropdownMenuGroup>
                  </Fragment>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/auth/login">
              <Button>Log in</Button>
            </Link>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="Toggle mobile menu"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
          >
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background px-4 py-3 flex flex-col gap-1">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}


function ProfileMenu({ user }: { user: IUser }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          aria-label="Open profile menu"
        >
          <Avatar className="size-8">
            <AvatarFallback>
              {user && getAvatarNameFromFullName(user?.data?.name)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuGroup>
          <DropdownMenuLabel>
            <span className="flex flex-col gap-0.5">
              <span>{user?.data?.name}</span>
              <span className="text-xs font-normal text-muted-foreground">
                {user?.data?.email}
              </span>
            </span>
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        {profileMenuSections.map((section, index) => (
          <Fragment key={section.id}>
            {index > 0 && <DropdownMenuSeparator />}
            <DropdownMenuGroup>
              {section.items.map((item) => {
                const Icon = item.icon;

                return (
                  <DropdownMenuItem
                    key={item.href}
                    asChild
                    variant={
                      section.id === "session" ? "destructive" : "default"
                    }
                    // onClick={() => handleUserMenuAction("logout")}
                  >
                    <Icon />
                    {item.label}
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuGroup>
          </Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
