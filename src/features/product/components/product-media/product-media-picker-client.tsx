"use client";

import { MediaPickerClient } from "@/features/media/components/picker/media-picker-client";
import type { MediaWIthRelations } from "@/features/media/types/media";
import { attachProductMediaAction } from "@/features/product/actions/product-media";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";

interface ProductMediaPickerClientProps {
  media: MediaWIthRelations[];
  pages: number;
  productSlug: string;
}

export function ProductMediaPickerClient({
  media,
  pages,
  productSlug,
}: ProductMediaPickerClientProps) {
  const { executeAsync } = useAction(attachProductMediaAction, {
    onSuccess() {
      toast.success("Product Image added");
    },
  });

  return (
    <MediaPickerClient
      media={media}
      onConfirm={async (mediaId) =>
        await executeAsync({
          mediaId,
          productSlug,
        })
      }
      pages={pages}
    />
  );
}
