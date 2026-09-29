import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { Home, Library } from "lucide-react";
import Link from "next/link";

interface AppSidebarMenuProps {
  organization: string;
}

export const AppSidebarMenu = ({ organization }: AppSidebarMenuProps) => (
  <SidebarGroup>
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton asChild>
          <Link href={`/workspace/${organization}`}>
            <Home />
            Home
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <SidebarMenuButton asChild>
          <Link href={`/workspace/${organization}/library`}>
            <Library />
            Library
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarGroup>
);
