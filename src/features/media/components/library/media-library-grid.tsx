"use client";

import { MediaLibraryCard } from "@/features/media/components/library/media-library-card";
import { MediaGrid } from "@/features/media/components/media-grid";
import type { MediaWIthRelations } from "@/features/media/types/media";
import type { ReactNode } from "react";

interface MediaLibraryGridProps {
  count: number;
  loading?: boolean;
  media: MediaWIthRelations[];
  upload?: ReactNode;
}

export const MediaLibraryGrid = ({
  media,
  loading = false,
  upload,
}: MediaLibraryGridProps) => (
  <MediaGrid
    loading={loading}
    media={media}
    renderMedia={(item) => <MediaLibraryCard key={item.mediaId} media={item} />}
    upload={upload}
  />
);
