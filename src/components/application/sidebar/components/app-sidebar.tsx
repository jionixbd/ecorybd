import { UserAccountMenu } from "@/components/application/account/user-account-menu";
import { OrganizationSwitcher } from "@/components/application/organization/organization-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { getActiveContext } from "@/lib/auth/get-active-context";

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

      <SidebarContent>{props.children}</SidebarContent>

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
