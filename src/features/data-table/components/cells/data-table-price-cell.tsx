import { cn } from "cn";

const DEFAULT_CURRENCY = "USD";
const DEFAULT_LOCALE = "en-US";

export function DataTablePriceCell({
  value,
  currency = DEFAULT_CURRENCY,
  locale = DEFAULT_LOCALE,
  className,
}: {
  value: unknown;
  currency?: string;
  locale?: string;
  className?: string;
}) {
  const amount = Number(value);

  if (Number.isNaN(amount)) {
    return (
      <code
        className={cn("max-w-125 truncate font-medium tabular-nums", className)}
      >
        {String(value)}
      </code>
    );
  }

  const formatted = new Intl.NumberFormat(locale, {
    currency,
    style: "currency",
  }).format(amount);

  return (
    <code
      className={cn("max-w-125 truncate font-medium tabular-nums", className)}
    >
      {formatted}
    </code>
  );
}
