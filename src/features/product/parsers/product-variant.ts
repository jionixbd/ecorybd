import {
  type ProductVariant,
  productVariants,
} from "@/drizzle/schema/product-variant";
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

export const productVariantSearchParam = createSearchParamsCache({
  advanced: parseAsBoolean.withDefault(false),
  filters: getFiltersStateParser().withDefault([]),
  joinOperator: parseAsStringEnum(["and", "or"]).withDefault("and"),
  name: parseAsString.withDefault(""),
  page: parseAsInteger.withDefault(1),
  perPage: parseAsInteger.withDefault(20),
  sort: getSortingStateParser<ProductVariant>().withDefault([
    { desc: true, id: "createdAt" },
  ]),
  status: parseAsArrayOf(
    parseAsStringEnum(productVariants.status.enumValues)
  ).withDefault([]),
});

export type ProductVariantSearchParam = Awaited<
  ReturnType<typeof productVariantSearchParam.parse>
>;
