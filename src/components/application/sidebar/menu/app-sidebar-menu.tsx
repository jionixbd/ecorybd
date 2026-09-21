"use client";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "@/i18n/navigation";
import { Crown, Home, Library } from "lucide-react";
import { useTranslations } from "next-intl";

const navigation = [
  {
    href: "/",
    icon: Home,
    id: "home",
    isActive: false,
    label: "Home",
  },
  {
    href: "/library",
    icon: Library,
    id: "library",
    label: "Library",
  },
  {
    href: "/favorites",
    icon: Crown,
    id: "favorites",
    label: "Favorites",
  },
] as const;

export const AppSidebarMenu = () => {
  const t = useTranslations("application.menu");
  return (
    <SidebarGroup>
      <SidebarMenu>
        {navigation.map((item) => (
          <SidebarMenuItem key={item.id}>
            <SidebarMenuButton asChild>
              <Link href={"/"}>
                {!!item.icon && <item.icon />}
                {t(item.id)}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
};
