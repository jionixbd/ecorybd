import { UserAvatar } from "@/components/application/user/user-avatar";

interface UserIdentityProps {
  user: { avatar: string | null; email: string; username: string };
}

export const UserIdentity = ({ user }: UserIdentityProps) => (
  <div className="flex items-center gap-2 text-left text-sm">
    <UserAvatar user={user} />
    <div className="grid flex-1 text-left text-sm leading-tight">
      <span className="truncate font-medium">{user.username}</span>
      <span className="truncate text-muted-foreground text-xs">
        {user.email}
      </span>
    </div>
  </div>
);
