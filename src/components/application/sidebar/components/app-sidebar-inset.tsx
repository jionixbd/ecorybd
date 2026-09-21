import { SidebarInset } from "@/components/ui/sidebar";
import type { PropsWithChildren } from "react";

export const AppSidebarInset = (props: PropsWithChildren) => (
  <SidebarInset className="overflow-hidden! relative gap-2 p-2 md:peer-data-[variant=inset]:my-3 md:peer-data-[variant=inset]:mr-3">
    {props.children}
  </SidebarInset>
);
