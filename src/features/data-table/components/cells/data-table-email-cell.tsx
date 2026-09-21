import { Mail } from "lucide-react";
import Link from "next/link";

export function DataTableEmailCell({ value }: { value: unknown }) {
  const email = String(value);

  return (
    <Link
      className="inline-flex max-w-125 items-center gap-1.5 truncate text-primary underline-offset-4 hover:underline"
      href={`mailto:${email}`}
    >
      <Mail className="size-3.5 shrink-0 text-muted-foreground" />
      <span className="truncate">{email}</span>
    </Link>
  );
}
