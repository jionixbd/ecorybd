import { MediaLibraryGrid } from "@/features/media/components/library/media-library-grid";
import { MediaLibraryPagination } from "@/features/media/components/library/media-library-pagination";
import { MediaLibraryToolbar } from "@/features/media/components/library/media-library-toolbar";
import type { MediaWIthRelations } from "@/features/media/types/media";
import type { ReactNode } from "react";

interface MediaLibraryProps {
  count: number;
  media: MediaWIthRelations[];
  pages: number;
  toolbar?: boolean;
  upload?: ReactNode;
}

export const MediaLibrary = ({
  toolbar,
  media,
  count,
  upload,
  pages,
}: MediaLibraryProps) => {
  const renderToolbar = toolbar ? <MediaLibraryToolbar /> : null;

  return (
    <div className="grid grid-rows-[36px_1fr_36px] gap-4">
      {renderToolbar}

      <MediaLibraryGrid
        count={count}
        loading={false}
        media={media}
        upload={upload}
      />

      <MediaLibraryPagination pages={pages} />
    </div>
  );
};
