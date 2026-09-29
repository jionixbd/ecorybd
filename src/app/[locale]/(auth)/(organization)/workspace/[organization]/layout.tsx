import { AppSidebar } from "@/components/application/sidebar/components/app-sidebar";
import { AppSidebarInset } from "@/components/application/sidebar/components/app-sidebar-inset";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { requireOrganization } from "@/lib/auth/require-organization";

export const instant = false;

export default async function OrganizationLayout({
  children,
  params,
}: LayoutProps<"/[locale]/workspace/[organization]">) {
  const { organization } = await params;

  await requireOrganization({ organization });

  return (
    <>
      <AppSidebar />
      <AppSidebarInset>
        <header className="sticky top-0 flex h-12 shrink-0 items-center gap-2 rounded-md bg-sidebar px-4 py-2">
          <SidebarTrigger className="cursor-pointer" />
        </header>
        <ScrollArea className="h-[calc(100vh-72px)] rounded-lg bg-sidebar/50 p-4 md:h-[calc(100vh-96px)]">
          {children}
        </ScrollArea>
      </AppSidebarInset>
    </>
  );
}
