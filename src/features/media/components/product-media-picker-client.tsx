"use client";

import { MediaPickerClient } from "@/features/media/components/picker/media-picker-client";
import type { MediaWIthRelations } from "@/features/media/types/media";
// import { useAction } from "next-safe-action/hook";

interface ProductMediaPickerClientProps {
  media: MediaWIthRelations[];
  pages: number;
  productSlug: string;
}

export function ProductMediaPickerClient({
  media,
  pages,
  // productSlug,
}: ProductMediaPickerClientProps) {
  //   const { executeAsync } = useAction(attachProductMedia);

  return (
    <MediaPickerClient
      media={media}
      onConfirm={async (mediaId) =>
        // executeAsync({
        //   mediaId,
        //   productSlug,
        // })
        await console.log(mediaId)
      }
      pages={pages}
    />
  );
}
