"use client";

import { Button } from "@/components/ui/button";
import type { ProductMediaWithRelations } from "@/features/product/types/product-media";
import { X } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";

import { detachProductMediaAction } from "@/features/product/actions/product-media";
import { useParams } from "next/navigation";

interface ProductMediaDetachProp {
  media: ProductMediaWithRelations;
}

export const ProductMediaDetach = ({ media }: ProductMediaDetachProp) => {
  const params = useParams<{ product: string }>();
  const { executeAsync } = useAction(detachProductMediaAction, {
    onSuccess: () => {
      toast.success("Media detached successfully");
    },
  });

  const handleDetachMedia = async () => {
    await executeAsync({ mediaId: media.mediaId, productSlug: params.product });
  };

  return (
    <Button
      className="hidden group-hover/pmc:flex"
      onClick={handleDetachMedia}
      size="icon"
      variant="ghost"
    >
      <X />
    </Button>
  );
};
