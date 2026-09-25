"use client";

import { MediaGrid } from "@/features/media/components/media-grid";
import { MediaPickerCard } from "@/features/media/components/picker/media-picker-card";
import type { MediaWIthRelations } from "@/features/media/types/media";

interface MediaPickerGridProps {
  loading?: boolean;
  media: MediaWIthRelations[];
}

export const MediaPickerGrid = ({
  media,
  loading = false,
}: MediaPickerGridProps) => (
  <MediaGrid
    config={{
      columns: [1, 2, 4, 6],
      gap: [4, 4, 6, 8],
      media: [480, 768, 1422, 1753],
    }}
    loading={loading}
    media={media}
    renderMedia={(item) => <MediaPickerCard key={item.mediaId} media={item} />}
  />
);
