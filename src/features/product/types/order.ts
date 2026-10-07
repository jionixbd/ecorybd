export interface OrderableProductVariant {
  price: number;
  productId: string;
  productName: string;
  productSlug: string;
  productVariantId: string;
  salePrice: number | null;
  sku: string;
  stockQuantity: number;
  variantName: string;
  variantSlug: string;
}
