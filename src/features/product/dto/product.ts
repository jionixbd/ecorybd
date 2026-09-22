import type { Organization, ProductVariant, User } from "@/drizzle/schema";
import type { Product } from "@/drizzle/schema/product";

interface ProductsRawRows {
  organizations: Organization;
  product_variants: ProductVariant;
  products: Product;
  users: User;
}

export const toProductWithRelation = ({
  rawRows,
}: {
  rawRows: ProductsRawRows[];
}) =>
  rawRows.map(({ products, users, organizations, product_variants }) => ({
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
  }));
