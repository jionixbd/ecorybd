import type { InsertProductVariantInput } from "@/features/product/validations/product-variant";

export const generateDefaultVariant = ({
  productId,
}: {
  productId: string;
}): InsertProductVariantInput => ({
  isDefault: true,
  name: "Default",
  price: 0,
  salePrice: null,
  sku: `default-${productId}`,
  slug: `default-${productId}`,
  status: "draft",
  stockQuantity: 0,
});
