import { AppSidebarMenu } from "@/components/application/sidebar/menu/app-sidebar-menu";
import { AppSidebarProductsMenu } from "@/components/application/sidebar/menu/app-sidebar-products-menu";
import { AppSidebarSecondaryMenu } from "@/components/application/sidebar/menu/app-sidebar-secondary-menu";
import { AsyncBoundary } from "@/components/boundaries/async-boundary";

export default function SidebarPage(
  props: PageProps<"/[locale]/workspace/[organization]">
) {
  return (
    <>
      <AsyncBoundary>
        <AppSidebarMenu {...props} />
      </AsyncBoundary>
      <AsyncBoundary>
        <AppSidebarProductsMenu {...props} />
      </AsyncBoundary>
      <AppSidebarSecondaryMenu className="mt-auto" />
    </>
  );
}
