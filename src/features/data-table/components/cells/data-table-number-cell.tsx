export function DataTableNumberCell({ value }: { value: unknown }) {
  return (
    <span className="max-w-125 truncate font-extralight tabular-nums">
      {String(value)}
    </span>
  );
}
