import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/shadcn/utils";

interface OrganizationLogoProps {
  className?: string;
  organization: { logo: string | null; name: string };
}

export const OrganizationLogo = ({
  organization,
  className,
}: OrganizationLogoProps) => (
  <Avatar
    className={cn(
      "max-auto h-8 w-8 self-center justify-self-center overflow-hidden rounded-lg",
      className
    )}
  >
    <AvatarImage
      alt={organization.name}
      className="aspect-square"
      src={organization.logo ?? "/images/placeholder/user-default-avatar.svg"}
    />
    <AvatarFallback className="overflow-hidden">
      {organization.name.slice(0, 2)}
    </AvatarFallback>
  </Avatar>
);
