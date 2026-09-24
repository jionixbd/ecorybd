export function DataTableBooleanCell({ value }: { value: unknown }) {
  const booleanValue = Boolean(value);

  return (
    <span className="max-w-125 truncate font-mono font-normal tabular-nums">
      {booleanValue === true ? <code>True</code> : <code>False</code>}
    </span>
  );
}
