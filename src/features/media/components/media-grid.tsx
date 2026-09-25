"use client";

import { Skeleton } from "@/components/ui/skeleton";
import type { MediaWIthRelations } from "@/features/media/types/media";
import { type ReactNode, useCallback, useMemo } from "react";
import { Masonry } from "react-plock";

type GridItem =
  | {
      type: "media";
      media: MediaWIthRelations;
    }
  | {
      type: "upload";
      id: string;
    }
  | {
      type: "skeleton";
      id: string;
    };

interface MediaGridProps {
  config?: {
    columns: number | number[];
    gap: number | number[];
    media?: number[];
    useBalancedLayout?: boolean;
  };
  loading?: boolean;
  media: MediaWIthRelations[];
  renderMedia: (media: MediaWIthRelations) => ReactNode;
  upload?: ReactNode;
}

export function MediaGrid({
  media,
  loading = false,
  upload,
  renderMedia,
  config = {
    columns: [1, 2, 3],
    gap: [4, 6, 8],
    media: [768, 1422, 1753],
  },
}: MediaGridProps) {
  const items = useMemo<GridItem[]>(() => {
    const mediaItems: GridItem[] = media.map((item) => ({
      media: item,
      type: "media",
    }));

    const uploadItems: GridItem[] = upload
      ? [{ id: "upload-slot", type: "upload" }]
      : [];

    const skeletonItems: GridItem[] = loading
      ? Array.from({ length: 6 }, (_, index) => ({
          id: `skeleton-${index}`,
          type: "skeleton",
        }))
      : [];

    return [...uploadItems, ...mediaItems, ...skeletonItems];
  }, [loading, media, upload]);

  const renderItem = useCallback(
    (item: GridItem) => {
      if (item.type === "upload") {
        return upload;
      }

      if (item.type === "skeleton") {
        return <Skeleton className="h-40 w-full" />;
      }

      return renderMedia(item.media);
    },
    [renderMedia, upload]
  );

  return (
    <div className="w-full space-y-4 self-center p-px">
      <Masonry config={config} items={items} render={renderItem} />
    </div>
  );
}
