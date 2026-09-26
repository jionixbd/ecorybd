import type { ProductMedia } from "@/drizzle/schema/product";
import { getSortingStateParser } from "@/features/data-table/lib/parsers";
import {
  createSearchParamsCache,
  parseAsInteger,
  parseAsString,
} from "nuqs/server";

export const productMediaSearchParam = createSearchParamsCache({
  altText: parseAsString.withDefault(""),
  name: parseAsString.withDefault(""),
  page: parseAsInteger.withDefault(1),
  perPage: parseAsInteger.withDefault(20),
  sort: getSortingStateParser<ProductMedia>().withDefault([
    { desc: false, id: "position" },
  ]),
});

export type ProductMediaSearchParam = Awaited<
  ReturnType<typeof productMediaSearchParam.parse>
>;
