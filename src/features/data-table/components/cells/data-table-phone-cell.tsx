import { Phone } from "lucide-react";

export function DataTablePhoneCell({ value }: { value: unknown }) {
  const phone = String(value);
  const valid = phone.replace(/[^\d+]/g, "");

  return (
    <a
      className="inline-flex max-w-125 items-center gap-1.5 truncate font-mono font-normal text-primary underline-offset-4 hover:underline"
      href={`tel:${valid}`}
    >
      <Phone className="size-3.5 shrink-0 text-muted-foreground" />
      <span className="truncate tabular-nums">{phone}</span>
    </a>
  );
}
