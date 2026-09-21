import { sql, type AnyColumn } from "drizzle-orm";

export function isEmpty<TColumn extends AnyColumn>(column: TColumn) {
  return sql<boolean>`
    case
      when ${column} is null then true
      when ${column}::text in ('', '[]', '{}') then true
      else false
    end
  `;
}
