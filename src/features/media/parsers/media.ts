import type { Media } from "@/drizzle/schema/media";
import { getSortingStateParser } from "@/features/data-table/lib/parsers";
import {
  createSearchParamsCache,
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  parseAsStringEnum,
} from "nuqs/server";

export const mediaFilterValues = ["all", "image", "svg", "png"];

export type MediaFilter = (typeof mediaFilterValues)[number];

export const mediaSearchParam = createSearchParamsCache({
  altText: parseAsString.withDefault(""),
  filter: parseAsStringEnum(mediaFilterValues).withDefault("all"),
  mime: parseAsArrayOf(parseAsString).withDefault([]),
  page: parseAsInteger.withDefault(1),
  perPage: parseAsInteger.withDefault(20),
  sort: getSortingStateParser<Media>().withDefault([
    { desc: true, id: "createdAt" },
  ]),
});

export type MediaSearchParams = Awaited<
  ReturnType<typeof mediaSearchParam.parse>
>;
