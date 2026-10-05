import type { InsertProductVariantInput } from "@/features/product/validations/product-variant";

export const generateDefaultVariant = ({
  productId,
}: {
  productId: string;
}): InsertProductVariantInput => ({
  badge: null,
  isDefault: true,
  name: "Default",
  offerNote: null,
  price: 0,
  salePrice: null,
  sku: `default-${productId}`,
  slug: `default-${productId}`,
  status: "draft",
  stockQuantity: 0,
});
