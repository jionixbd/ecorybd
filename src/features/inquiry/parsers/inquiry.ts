import { type Inquiry, inquiries } from "@/drizzle/schema/inquiry";
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

export const inquirySearchParamCache = createSearchParamsCache({
  // advance filter only
  advanced: parseAsBoolean.withDefault(false),
  createdAt: parseAsArrayOf(parseAsInteger).withDefault([]),
  filters: getFiltersStateParser().withDefault([]),
  joinOperator: parseAsStringEnum(["and", "or"]).withDefault("and"),
  //
  name: parseAsString.withDefault(""),
  page: parseAsInteger.withDefault(1),
  perPage: parseAsInteger.withDefault(10),
  project: parseAsArrayOf(
    parseAsStringEnum(inquiries.project.enumValues)
  ).withDefault([]),
  service: parseAsArrayOf(
    parseAsStringEnum(inquiries.service.enumValues)
  ).withDefault([]),
  sort: getSortingStateParser<Inquiry>().withDefault([
    { desc: true, id: "createdAt" },
  ]),
  status: parseAsArrayOf(
    parseAsStringEnum(inquiries.status.enumValues)
  ).withDefault([]),
});

export type InquirySearchParam = Awaited<
  ReturnType<typeof inquirySearchParamCache.parse>
>;
