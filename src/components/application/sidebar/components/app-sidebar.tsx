import { UserAccountMenu } from "@/components/application/account/user-account-menu";
import { OrganizationSwitcher } from "@/components/application/organization/organization-switcher";
import { AppSidebarMenu } from "@/components/application/sidebar/menu/app-sidebar-menu";
import { AppSidebarSecondaryMenu } from "@/components/application/sidebar/menu/app-sidebar-secondary-menu";
import { AppSidebarStoreMenu } from "@/components/application/sidebar/menu/app-sidebar-store-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { getActiveContext } from "@/lib/auth/get-active-context";
import { Suspense } from "react";

export const AppSidebar = async ({
  ...props
}: React.ComponentProps<typeof Sidebar>) => {
  const { user, organization, membership } = await getActiveContext();

  if (!(user && organization && membership)) {
    return null;
  }

  return (
    <Sidebar collapsible="icon" variant="inset" {...props}>
      <SidebarHeader>
        <OrganizationSwitcher
          membership={{
            role: membership?.role,
          }}
          organization={{
            logo: organization.logo,
            name: organization.name,
          }}
        />
      </SidebarHeader>

      <SidebarContent>
        <Suspense>
          <AppSidebarMenu organization={organization.slug} />
        </Suspense>
        <Suspense>
          <AppSidebarStoreMenu organization={organization.slug} />
        </Suspense>
        <AppSidebarSecondaryMenu className="mt-auto" />
      </SidebarContent>

      <SidebarFooter>
        <UserAccountMenu
          user={{
            avatar: user.avatar,
            email: user.email,
            username: user.username,
          }}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};
