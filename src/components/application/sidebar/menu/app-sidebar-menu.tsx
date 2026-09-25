import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { Home, Library } from "lucide-react";
import Link from "next/link";

export const AppSidebarMenu = async (
  props: PageProps<"/[locale]/workspace/[organization]">
) => {
  const { organization } = await props.params;

  return (
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
};
