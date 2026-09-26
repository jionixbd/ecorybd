import { ProductMediaDetach } from "@/features/product/components/product-media/product-media-detach";
import { ProductMediaFeature } from "@/features/product/components/product-media/product-media-featured";
import type { ProductMediaWithRelations } from "@/features/product/types/product-media";
import Image from "next/image";

interface ProductMediaCardProp {
  media: ProductMediaWithRelations;
}

export const ProductMediaCard = ({ media }: ProductMediaCardProp) => (
  <div
    className="group/pmc relative aspect-square overflow-hidden rounded-2xl bg-muted"
    key={media.mediaId}
  >
    <div className="absolute top-0 flex w-full justify-between p-1">
      <ProductMediaFeature media={media} />
      <ProductMediaDetach media={media} />
    </div>
    <Image
      alt={media.altText ?? "Product image"}
      className="aspect-square object-cover"
      height={media.height ?? 200}
      src={media.ufsUrl}
      width={media.width ?? 200}
    />
  </div>
);
