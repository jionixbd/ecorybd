const DEFAULT_CURRENCY = "USD";
const DEFAULT_LOCALE = "en-US";

export function DataTablePriceCell({
  value,
  currency = DEFAULT_CURRENCY,
  locale = DEFAULT_LOCALE,
}: {
  value: unknown;
  currency?: string;
  locale?: string;
}) {
  const amount = Number(value);

  if (Number.isNaN(amount)) {
    return (
      <code className="max-w-125 truncate font-medium tabular-nums">
        {String(value)}
      </code>
    );
  }

  const formatted = new Intl.NumberFormat(locale, {
    currency,
    style: "currency",
  }).format(amount);

  return (
    <code className="max-w-125 truncate font-medium tabular-nums">
      {formatted}
    </code>
  );
}
