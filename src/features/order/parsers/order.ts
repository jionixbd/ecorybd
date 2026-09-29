import { type Order, orders } from "@/drizzle/schema/order";
import {
  getFiltersStateParser,
  getSortingStateParser,
} from "@/features/data-table/lib/parsers";
import {
  createSearchParamsCache,
  parseAsArrayOf,
  parseAsBoolean,
  parseAsInteger,
  parseAsString,
  parseAsStringEnum,
} from "nuqs/server";

export const orderSearchParam = createSearchParamsCache({
  advanced: parseAsBoolean.withDefault(false),
  filters: getFiltersStateParser().withDefault([]),
  joinOperator: parseAsStringEnum(["and", "or"]).withDefault("and"),
  page: parseAsInteger.withDefault(1),
  perPage: parseAsInteger.withDefault(20),
  search: parseAsString.withDefault(""),
  sort: getSortingStateParser<Order>().withDefault([
    { desc: true, id: "createdAt" },
  ]),
  status: parseAsArrayOf(
    parseAsStringEnum(orders.status.enumValues)
  ).withDefault([]),
});

export type OrderSearchParam = Awaited<
  ReturnType<typeof orderSearchParam.parse>
>;
