import Image from "next/image";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function DataTableImageCell({
  value,
  alt = "Image",
}: {
  value: unknown;
  alt?: string;
}) {
  const src = String(value);

  return (
    <Avatar className="size-8">
      <AvatarImage alt={alt} asChild src={src}>
        <Image alt={alt} className="object-cover" fill sizes="32px" src={src} />
      </AvatarImage>
      <AvatarFallback className="text-xs">{getInitials(alt)}</AvatarFallback>
    </Avatar>
  );
}
