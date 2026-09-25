"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Media } from "@/drizzle/schema/media";
import { getSortingStateParser } from "@/features/data-table/lib/parsers";
import { useQueryState } from "nuqs";

const sortParser = getSortingStateParser<Media>(["createdAt"])
  .withDefault([{ desc: true, id: "createdAt" }])
  .withOptions({
    clearOnDefault: true,
    shallow: false,
  });

const options = [
  { desc: true, label: "Newest", value: "newest" },
  { desc: false, label: "Oldest", value: "oldest" },
] as const;

export const MediaSort = () => {
  const [sort, setSort] = useQueryState("sort", sortParser);

  const value = sort[0]?.desc ? "newest" : "oldest";

  return (
    <Select
      onValueChange={(nextValue) => {
        const option = options.find((item) => item.value === nextValue);

        if (!option) {
          return;
        }

        setSort([
          {
            desc: option.desc,
            id: "createdAt",
          },
        ]);
      }}
      value={value}
    >
      <SelectTrigger className="w-full max-w-28">
        <SelectValue placeholder="Sort" />
      </SelectTrigger>

      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
