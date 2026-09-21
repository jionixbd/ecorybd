"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useClerk } from "@clerk/nextjs";
import { Building2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCallback } from "react";

export const OrganizationProfileClerk = () => {
  const { openOrganizationProfile } = useClerk();
  const t = useTranslations("application.organization");

  const handleProfileSelect = useCallback(() => {
    openOrganizationProfile();
  }, [openOrganizationProfile]);

  return (
    <DropdownMenuItem onSelect={handleProfileSelect}>
      <Building2 />
      {t("organization")}
    </DropdownMenuItem>
  );
};
