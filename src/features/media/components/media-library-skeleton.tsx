import { Skeleton } from "@/components/ui/skeleton";
import { list } from "radash";
import { useCallback } from "react";
import { Masonry } from "react-plock";

export const MediaLibrarySkeleton = ({
  itemCount = 6,
}: {
  itemCount?: number;
}) => {
  const masonryConfig = {
    columns: [1, 2, 3],
    gap: [4, 6, 8],
    media: [768, 1422, 1753],
  };

  const renderItem = useCallback(
    (item: number, idx: number) => (
      <Skeleton className="h-40 w-full" key={item || idx} />
    ),
    []
  );

  return (
    <Masonry
      config={masonryConfig}
      items={list(0, itemCount)}
      render={renderItem}
    />
  );
};
