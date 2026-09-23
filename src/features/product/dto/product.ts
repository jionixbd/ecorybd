import type { Organization, ProductVariant, User } from "@/drizzle/schema";
import type { Product } from "@/drizzle/schema/product";
import type { ProductWithRelations } from "@/features/product/types/product";

interface ProductsRawRows {
  organizations: Organization;
  product_variants: ProductVariant;
  products: Product;
  users: User;
}

export const toProductsWithRelation = ({
  rawRows,
}: {
  rawRows: ProductsRawRows[];
}): ProductWithRelations[] =>
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

interface ProductRawRow {
  organizations: Organization;
  product_variants: ProductVariant;
  products: Product;
  users: User;
}

export const toProductWithRelation = ({
  rawRow,
}: {
  rawRow: ProductRawRow;
}): ProductWithRelations => ({
  badge: rawRow.products.badge,
  createdAt: rawRow.products.createdAt,
  createdBy: rawRow.products.createdBy
    ? {
        avatar: rawRow.users.avatar ?? null,
        userId: rawRow.users.userId,
        username: rawRow.users.username,
      }
    : null,
  description: rawRow.products.description,
  isFeatured: rawRow.products.isFeatured,
  metaDescription: rawRow.products.metaDescription,
  metaTitle: rawRow.products.metaTitle,
  name: rawRow.products.name,
  organization: {
    logo: rawRow.organizations.logo,
    name: rawRow.organizations.name,
    organizationId: rawRow.organizations.organizationId,
    slug: rawRow.organizations.slug,
  },
  price: rawRow.product_variants.price,
  productId: rawRow.products.productId,
  salePrice: rawRow.product_variants.salePrice,
  shortDescription: rawRow.products.shortDescription,
  sku: rawRow.product_variants.sku,
  slug: rawRow.products.slug,
  status: rawRow.products.status,
  stockQuantity: rawRow.product_variants.stockQuantity,
  tempDescription: rawRow.products.tempDescription,
  tempShortDescription: rawRow.products.tempShortDescription,
  updatedAt: rawRow.products.updatedAt,
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
