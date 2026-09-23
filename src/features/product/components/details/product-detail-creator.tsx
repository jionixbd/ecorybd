import { Avatar, AvatarImage } from "@/components/ui/avatar";
import type { ProductWithRelations } from "@/features/product/types/product";
import Image from "next/image";

interface ProductDetailCreatorProps {
  user?: ProductWithRelations["createdBy"];
}

export const ProductDetailCreator = ({ user }: ProductDetailCreatorProps) => {
  if (!user) {
    return;
  }

  return (
    <div className="flex items-center gap-2">
      {!!user.avatar && (
        <Avatar className="size-8">
          <AvatarImage alt={user.username} asChild src={user.avatar}>
            <Image
              alt={user.username}
              className="object-cover"
              fill
              sizes="32px"
              src={user.avatar}
            />
          </AvatarImage>
        </Avatar>
      )}
      <span>{user.username}</span>
    </div>
  );
};
