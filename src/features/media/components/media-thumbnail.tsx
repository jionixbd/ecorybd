import type { MediaWIthRelations } from "@/features/media/types/media";
import { cn } from "cn";
import Image from "next/image";

interface MediaThumbnailProps {
  className?: string;
  media: MediaWIthRelations;
  selected?: boolean;
}

export function MediaThumbnail({
  media,
  selected = false,
  className,
}: MediaThumbnailProps) {
  return (
    <Image
      alt={media.name}
      className={cn(
        "size-full rounded-2xl object-cover",
        selected && "ring-2 ring-primary",
        className
      )}
      height={media.height ?? 200}
      src={media.ufsUrl}
      width={media.width ?? 200}
    />
  );
}
