import { OrganizationLogo } from "@/components/application/organization/organization-logo";

interface OrganizationIdentityProps {
  organization: { logo: string | null; name: string; role: string };
}

export const OrganizationIdentity = ({
  organization,
}: OrganizationIdentityProps) => (
  <div className="flex items-center gap-2 text-left text-sm">
    <OrganizationLogo organization={organization} />
    <div className="grid flex-1 text-left text-sm leading-tight">
      <span className="truncate font-medium">{organization.name}</span>
      <span className="truncate text-muted-foreground text-xs">
        {organization.role}
      </span>
    </div>
  </div>
);
