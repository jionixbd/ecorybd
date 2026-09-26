"use client";

import { Button } from "@/components/ui/button";
import { updateFeaturedProductMediaAction } from "@/features/product/actions/product-media";
import type { ProductMediaWithRelations } from "@/features/product/types/product-media";
import { Star, StarMinus, StarPlus } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface ProductMediaFeatureProps {
  media: ProductMediaWithRelations;
}

export const ProductMediaFeature = ({ media }: ProductMediaFeatureProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const params = useParams<{ product: string }>();
  const { executeAsync, isPending } = useAction(
    updateFeaturedProductMediaAction,
    {
      onSuccess: () => {
        toast.success("Media featured successfully");
      },
    }
  );

  const handleFeaturedMedia = async () => {
    await executeAsync({
      mediaId: media.mediaId,
      productSlug: params.product,
    });
  };

  let icon = <Star />;

  if (media.isFeatured) {
    icon = isHovered ? (
      <StarMinus className="" />
    ) : (
      <Star className="fill-amber-500 stroke-amber-500" />
    );
  } else {
    icon = isHovered ? (
      <StarPlus className="hidden stroke-amber-500 group-hover/pmc:flex" />
    ) : (
      <Star className="hidden text-muted-foreground transition-colors group-hover/pmc:flex" />
    );
  }

  return (
    <Button
      disabled={isPending}
      onClick={handleFeaturedMedia}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      size={"icon"}
      variant="ghost"
    >
      {icon}
    </Button>
  );
};
