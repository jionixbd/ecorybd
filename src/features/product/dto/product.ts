import type { Organization, ProductVariant, User } from "@/drizzle/schema";
import type { Product } from "@/drizzle/schema/product";
import type { ProductWithRelations } from "@/features/product/types/product";

interface ProductRawRow {
  organizations: Organization;
  product_variants: ProductVariant;
  products: Product;
  users: User;
}

export const toProductsWithRelation = ({
  rawRows,
}: {
  rawRows: ProductRawRow[];
}): ProductWithRelations[] =>
  rawRows.map((rawRow) => toProductWithRelation({ rawRow }));

export const toProductWithRelation = ({
  rawRow: { products, users, organizations, product_variants },
}: {
  rawRow: ProductRawRow;
}): ProductWithRelations => ({
  badge: products.badge,
  createdAt: products.createdAt,
  createdBy: products.createdBy
    ? {
        avatar: users.avatar ?? null,
        userId: users.userId,
        username: users.username,
      }
    : null,
  description: products.description,
  isFeatured: products.isFeatured,
  metaDescription: products.metaDescription,
  metaTitle: products.metaTitle,
  name: products.name,
  organization: {
    logo: organizations.logo,
    name: organizations.name,
    organizationId: organizations.organizationId,
    slug: organizations.slug,
  },
  price: product_variants.price,
  productId: products.productId,
  salePrice: product_variants.salePrice,
  shortDescription: products.shortDescription,
  sku: product_variants.sku,
  slug: products.slug,
  status: products.status,
  stockQuantity: product_variants.stockQuantity,
  tempDescription: products.tempDescription,
  tempShortDescription: products.tempShortDescription,
  updatedAt: products.updatedAt,
});

export const toProduct = ({
  product,
}: {
  product: ProductWithRelations;
}): Product => ({
  badge: product.badge,
  createdAt: product.createdAt,
  createdBy: product.createdBy ? product.createdBy.userId : null,
  description: product.description,
  isFeatured: product.isFeatured,
  metaDescription: product.metaDescription,
  metaTitle: product.metaTitle,
  name: product.name,
  organizationId: product.organization.organizationId,
  productId: product.productId,
  shortDescription: product.shortDescription,
  slug: product.slug,
  status: product.status,
  tempDescription: product.tempDescription,
  tempShortDescription: product.tempShortDescription,
  updatedAt: product.updatedAt,
});
