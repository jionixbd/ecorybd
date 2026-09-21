"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useClerk } from "@clerk/nextjs";
import { UserIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCallback } from "react";

export const UserProfileClerk = () => {
  const { openUserProfile } = useClerk();
  const t = useTranslations("application.user");

  const handleOpenProfile = useCallback(() => {
    openUserProfile();
  }, [openUserProfile]);

  return (
    <DropdownMenuItem onSelect={handleOpenProfile}>
      <UserIcon />
      {t("profile")}
    </DropdownMenuItem>
  );
};
