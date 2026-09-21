"use client";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "@/i18n/navigation";
import { CircleQuestionMark, Search, Settings } from "lucide-react";
import { useTranslations } from "next-intl";
import type * as React from "react";

const items = [
  {
    icon: Settings,
    id: "settings",
    title: "Settings",
    url: "#",
  },
  {
    icon: CircleQuestionMark,
    id: "help",
    title: "Get Help",
    url: "#",
  },
  {
    icon: Search,
    id: "search",
    title: "Search",
    url: "#",
  },
] as const;

export const AppSidebarSecondaryMenu = (
  props: React.ComponentPropsWithoutRef<typeof SidebarGroup>
) => {
  const t = useTranslations("application.secondaryMenu");

  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <Link href={"/"}>
                  <item.icon />
                  {t(item.id)}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};
