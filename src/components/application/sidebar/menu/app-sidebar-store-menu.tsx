import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

import { ChevronRight, Leaf, Truck } from "lucide-react";
import Link from "next/link";

interface AppSidebarStoreMenuProps {
  organization: string;
}

export const AppSidebarStoreMenu = ({
  organization,
}: AppSidebarStoreMenuProps) => (
  <SidebarGroup>
    <SidebarGroupLabel>Store</SidebarGroupLabel>

    <SidebarMenu>
      <Collapsible asChild className="group/collapsible" defaultOpen={true}>
        <SidebarMenuItem>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton tooltip={"Products"}>
              <Truck />
              <span>Order</span>
              <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <SidebarMenuSub>
              <SidebarMenuSubItem>
                <SidebarMenuSubButton asChild>
                  <Link href={`/workspace/${organization}/orders`}>
                    <span>Orders</span>
                  </Link>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
    </SidebarMenu>

    <SidebarMenu>
      <Collapsible asChild className="group/collapsible" defaultOpen={false}>
        <SidebarMenuItem>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton tooltip={"Products"}>
              <Leaf />
              <span>Product</span>
              <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <SidebarMenuSub>
              <SidebarMenuSubItem>
                <SidebarMenuSubButton asChild>
                  <Link href={`/workspace/${organization}/products/create`}>
                    <span>New</span>
                  </Link>
                </SidebarMenuSubButton>
                <SidebarMenuSubButton asChild>
                  <Link href={`/workspace/${organization}/products`}>
                    <span>Products</span>
                  </Link>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
    </SidebarMenu>
  </SidebarGroup>
);
