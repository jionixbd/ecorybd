"use client";

import { LocaleSwitcher } from "@/components/application/locale/locale-switcher";
import { OrganizationProfileClerk } from "@/components/application/organization/organization-profile-clerk";
import { ThemeSwitcher } from "@/components/application/theme/theme-switcher";
import { UserIdentity } from "@/components/application/user/user-identity";
import { UserProfileClerk } from "@/components/application/user/user-profile-clerk";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Link } from "@/i18n/navigation";
import { normalizeError } from "@/lib/error";
import { useClerk } from "@clerk/nextjs";
import { House, LogOut } from "lucide-react";
import { useTranslations } from "next-intl";

interface UserAccountMenuProps {
  user: { avatar: string | null; email: string; username: string };
}

export const UserAccountMenu = ({ user }: UserAccountMenuProps) => {
  const { isMobile } = useSidebar();
  const { signOut } = useClerk();
  const t = useTranslations("application.account");

  const handleSingOutSelect = async () => {
    try {
      // analytics?.reset();
      await signOut();
    } catch (error) {
      throw normalizeError(error);
    }
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              size="lg"
            >
              <UserIdentity user={user} />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <UserIdentity user={user} />

              <DropdownMenuSeparator />

              <DropdownMenuGroup>
                <UserProfileClerk />
                <OrganizationProfileClerk />
              </DropdownMenuGroup>

              <DropdownMenuSeparator />

              <DropdownMenuGroup>
                <ThemeSwitcher />
                <LocaleSwitcher />
              </DropdownMenuGroup>

              <DropdownMenuSeparator />

              <DropdownMenuItem asChild>
                <Link href="/">
                  <House />
                  {t("homepage")}
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuGroup>
                <DropdownMenuItem onSelect={handleSingOutSelect}>
                  <LogOut />
                  {t("signOut")}
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuLabel>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
