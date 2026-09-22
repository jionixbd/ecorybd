import { defineRelations } from "drizzle-orm";
import * as schema from "./schema";

export const relations = defineRelations(schema, (r) => ({
  productMedia: {
    media: r.one.media({
      from: r.productMedia.mediaId,
      to: r.media.mediaId,
    }),
    product: r.one.products({
      from: r.productMedia.productId,
      to: r.products.productId,
    }),
  },
  products: {
    media: r.many.productMedia({
      from: r.products.productId,
      to: r.productMedia.productId,
    }),
    variants: r.many.productVariants({
      from: r.products.productId,
      to: r.productVariants.productId,
    }),
  },
  productVariantMedia: {
    media: r.one.media({
      from: r.productVariantMedia.mediaId,
      to: r.media.mediaId,
    }),
    variant: r.one.productVariants({
      from: r.productVariantMedia.productVariantId,
      to: r.productVariants.productVariantId,
    }),
  },
  productVariants: {
    media: r.one.productVariantMedia({
      from: r.productVariants.productVariantId,
      to: r.productVariantMedia.productVariantId,
    }),
    product: r.one.products({
      from: r.productVariants.productId,
      to: r.products.productId,
    }),
  },
}));
