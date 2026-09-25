"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  parseAsArrayOf,
  parseAsString,
  parseAsStringEnum,
  useQueryState,
} from "nuqs";

const filterValues = ["all", "image", "svg", "png"];

const options = [
  { label: "All", value: "all" },
  { label: "Image", value: "image" },
  { label: "Svg", value: "svg" },
  { label: "Png", value: "png" },
] as const;

const mimeByFilter = {
  all: [],
  image: ["image/jpeg", "image/png", "image/gif", "image/webp"],
  png: ["image/png"],
  svg: ["image/svg+xml"],
} as const;

export const MediaFilter = () => {
  const [filter, setFilter] = useQueryState(
    "filter",
    parseAsStringEnum(filterValues)
      .withDefault("all")
      .withOptions({ shallow: false })
  );

  const [, setMime] = useQueryState(
    "mime",
    parseAsArrayOf(parseAsString)
      .withDefault([])
      .withOptions({ shallow: false })
  );

  const handleFilterChange = async (value: string) => {
    if (!(value in mimeByFilter)) {
      return;
    }

    const nextFilter = value as keyof typeof mimeByFilter;

    await setFilter(nextFilter);
    await setMime([...mimeByFilter[nextFilter]]);
  };

  return (
    <Tabs onValueChange={handleFilterChange} value={filter}>
      <TabsList className="gap-1 bg-muted/50">
        {options.map((option) => (
          <TabsTrigger key={option.value} value={option.value}>
            {option.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};
