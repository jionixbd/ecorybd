"use client";

import { OrganizationIdentity } from "@/components/application/organization/organization-identity";
import { OrganizationListSkeleton } from "@/components/application/organization/organization-skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
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
import { useOrganizationList } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

interface OrganizationSwitcherClerkProps {
  membership: { role: string };
  organization: { logo: string | null; name: string };
}

export const OrganizationSwitcher = ({
  organization,
  membership,
}: OrganizationSwitcherClerkProps) => {
  const { isMobile } = useSidebar();
  const locale = useLocale();
  const router = useRouter();
  const {
    setActive,
    userMemberships: memberships,
    isLoaded,
  } = useOrganizationList({
    userMemberships: { infinite: true },
  });
  const t = useTranslations("application.organization");

  const handleOrganizationSwitch = async (organizationSlug: string | null) => {
    if (!(setActive && organizationSlug)) {
      return;
    }

    await setActive({
      // biome-ignore lint/suspicious/useAwait: Clerk's navigate callback can return a promise.
      navigate: async ({ decorateUrl }) => {
        const url = `/${locale}/workspace/${organizationSlug}`;

        router.push(decorateUrl(url));
      },
      organization: organizationSlug,
    });
  };

  const loaded = isLoaded && memberships.data && memberships.data.length > 1;

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              size="lg"
            >
              <OrganizationIdentity
                organization={{
                  logo: organization.logo,
                  name: organization.name,
                  role: membership.role,
                }}
              />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-muted-foreground text-xs">
              {t("memberships")}
            </DropdownMenuLabel>

            {loaded ? (
              // biome-ignore lint/suspicious/noUnnecessaryConditions: Clerk's data is typed as possibly undefined.
              memberships.data?.map((member) => (
                <DropdownMenuItem
                  className="flex items-center justify-start"
                  key={member.id}
                  // biome-ignore lint/performance/noJsxPropsBind: This is intended.
                  onClick={() =>
                    handleOrganizationSwitch(member.organization.slug)
                  }
                >
                  <OrganizationIdentity
                    key={member.id}
                    organization={{
                      logo: member.organization.imageUrl,
                      name: member.organization.name,
                      role: member.role,
                    }}
                  />
                </DropdownMenuItem>
              ))
            ) : (
              <OrganizationListSkeleton />
            )}

            <DropdownMenuSeparator />

            <DropdownMenuItem asChild>
              <Link href={"/organization/create"}>
                <Plus />
                {t("CreateOrganization")}
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
