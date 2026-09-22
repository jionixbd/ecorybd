import { type Product, products } from "@/drizzle/schema/product";
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

export const productSearchParam = createSearchParamsCache({
  advanced: parseAsBoolean.withDefault(false),
  filters: getFiltersStateParser().withDefault([]),
  joinOperator: parseAsStringEnum(["and", "or"]).withDefault("and"),
  name: parseAsString.withDefault(""),
  page: parseAsInteger.withDefault(1),
  perPage: parseAsInteger.withDefault(20),
  sort: getSortingStateParser<Product>().withDefault([
    { desc: true, id: "createdAt" },
  ]),
  status: parseAsArrayOf(
    parseAsStringEnum(products.status.enumValues)
  ).withDefault([]),
});

export type ProductSearchParam = Awaited<
  ReturnType<typeof productSearchParam.parse>
>;
