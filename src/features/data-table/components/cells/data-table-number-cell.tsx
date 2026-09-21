export function DataTableNumberCell({ value }: { value: unknown }) {
  return (
    <span className="max-w-125 truncate font-mono font-normal tabular-nums">
      {String(value)}
    </span>
  );
}
