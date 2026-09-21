import { AppSidebarGroupMenu } from "@/components/application/sidebar/menu/app-sidebar-group-menu";
import { AppSidebarMenu } from "@/components/application/sidebar/menu/app-sidebar-menu";
import { AppSidebarSecondaryMenu } from "@/components/application/sidebar/menu/app-sidebar-secondary-menu";

export default function SidebarPage(
  _: PageProps<"/[locale]/workspace/[organization]">
) {
  return (
    <>
      <AppSidebarMenu />
      <AppSidebarGroupMenu />
      <AppSidebarSecondaryMenu className="mt-auto" />
    </>
  );
}
