export function DataTableTextCell({ value }: { value: unknown }) {
  return (
    <span className="max-w-125 truncate font-normal">{String(value)}</span>
  );
}
