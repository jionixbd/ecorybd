import type { Organization, ProductVariant, User } from "@/drizzle/schema";
import type { ProductVariantWithRelations } from "@/features/product/types/product-variant";

interface RawRows {
  organizations: Organization;
  product_variants: ProductVariant;
  users: User;
}

export const toProductVariants = ({
  rawRows,
}: {
  rawRows: RawRows[];
}): ProductVariantWithRelations[] =>
  rawRows.map((rawRow) => toProductVariant({ rawRow }));

export const toProductVariant = ({
  rawRow: { organizations, product_variants, users },
}: {
  rawRow: RawRows;
}): ProductVariantWithRelations => ({
  createdAt: product_variants.createdAt,
  createdBy: product_variants.createdBy
    ? {
        avatar: users.avatar ?? null,
        userId: users.userId,
        username: users.username,
      }
    : null,
  isDefault: product_variants.isDefault,
  name: product_variants.name,
  organization: {
    logo: organizations.logo,
    name: organizations.name,
    organizationId: organizations.organizationId,
    slug: organizations.slug,
  },
  price: product_variants.price,
  productId: product_variants.productId,
  productVariantId: product_variants.productVariantId,
  salePrice: product_variants.salePrice,
  sku: product_variants.sku,
  slug: product_variants.slug,
  status: product_variants.status,
  stockQuantity: product_variants.stockQuantity,
  updatedAt: product_variants.updatedAt,
});
