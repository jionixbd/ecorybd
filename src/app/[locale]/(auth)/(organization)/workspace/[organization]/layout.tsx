import { AppSidebar } from "@/components/application/sidebar/components/app-sidebar";
import { AppSidebarInset } from "@/components/application/sidebar/components/app-sidebar-inset";
import { ScrollArea } from "@/components/ui/scroll-area";
import { requireOrganization } from "@/lib/auth/require-organization";

export const instant = false;

export default async function OrganizationLayout({
  children,
  sidebar,
  header,
  params,
}: LayoutProps<"/[locale]/workspace/[organization]">) {
  const { organization } = await params;

  await requireOrganization({ organization });

  return (
    <>
      <AppSidebar>{sidebar}</AppSidebar>
      <AppSidebarInset>
        {header}
        <ScrollArea className="h-[calc(100vh-72px)] rounded-lg bg-sidebar/50 p-4 md:h-[calc(100vh-96px)]">
          {children}
        </ScrollArea>
      </AppSidebarInset>
    </>
  );
}
