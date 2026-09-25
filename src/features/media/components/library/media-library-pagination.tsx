"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { parseAsInteger, useQueryState } from "nuqs";

interface MediaLibraryPaginationProps {
  pages: number;
}

const pageSizeOptions = [10, 20, 30, 40];

export const MediaLibraryPagination = ({
  pages,
}: MediaLibraryPaginationProps) => {
  const [page, setPage] = useQueryState(
    "page",
    parseAsInteger.withDefault(1).withOptions({
      shallow: false,
    })
  );

  const [perPage, setPerPage] = useQueryState(
    "perPage",
    parseAsInteger.withDefault(20).withOptions({
      shallow: false,
    })
  );

  const hasPreviousPage = page > 1;
  const hasNextPage = pages > 0 && page < pages;

  const changePerPage = async (value: string) => {
    await setPerPage(Number(value));
    await setPage(1);
  };

  return (
    <div className="flex items-center justify-end gap-2">
      <Select onValueChange={changePerPage} value={String(perPage)}>
        <SelectTrigger aria-label="Items per page">
          <SelectValue placeholder={perPage} />
        </SelectTrigger>

        <SelectContent align="end">
          {pageSizeOptions.map((size) => (
            <SelectItem key={size} value={String(size)}>
              {size}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button
        aria-label="Previous page"
        disabled={!hasPreviousPage}
        onClick={() => {
          setPage(page - 1);
        }}
        size="icon"
        variant="outline"
      >
        <ChevronLeft />
      </Button>

      <Button
        aria-label="Next page"
        disabled={!hasNextPage}
        onClick={() => {
          setPage(page + 1);
        }}
        size="icon"
        variant="outline"
      >
        <ChevronRight />
      </Button>
    </div>
  );
};
