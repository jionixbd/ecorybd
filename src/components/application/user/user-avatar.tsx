import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/shadcn/utils";

interface UserAvatarProps {
  className?: string;
  user: { avatar: string | null; username: string };
}

export const UserAvatar = ({ user, className }: UserAvatarProps) => (
  <Avatar className={cn("h-8 w-8 overflow-hidden rounded-lg", className)}>
    <AvatarImage
      alt={user.username}
      src={user.avatar ?? "/images/placeholder/user-default-avatar.svg"}
    />
    <AvatarFallback className="overflow-hidden">
      {user.username.slice(0, 2)}
    </AvatarFallback>
  </Avatar>
);
