import { defineRelations } from "drizzle-orm";
import * as schema from "./schema";

export const relations = defineRelations(schema, (r) => ({
  orderItems: {
    order: r.one.orders({
      from: r.orderItems.orderId,
      to: r.orders.orderId,
    }),
  },
  orders: {
    orderItems: r.many.orderItems({
      from: r.orders.orderId,
      to: r.orderItems.orderId,
    }),
    shippingMethod: r.one.shippingMethods({
      from: r.orders.shippingMethodId,
      to: r.shippingMethods.shippingMethodId,
    }),
  },
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
  productShippingMethods: {
    productVariant: r.one.productVariants({
      from: r.productShippingMethods.productVariantId,
      to: r.productVariants.productVariantId,
    }),
    shippingMethod: r.one.shippingMethods({
      from: r.productShippingMethods.shippingMethodId,
      to: r.shippingMethods.shippingMethodId,
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
    productShippingMethods: r.many.productShippingMethods({
      from: r.productVariants.productVariantId,
      to: r.productShippingMethods.productVariantId,
    }),
  },
  shippingMethods: {
    orders: r.many.orders({
      from: r.shippingMethods.shippingMethodId,
      to: r.orders.shippingMethodId,
    }),
    products: r.many.productShippingMethods({
      from: r.shippingMethods.shippingMethodId,
      to: r.productShippingMethods.shippingMethodId,
    }),
  },
}));
