import type {
  Media,
  Organization,
  ProductVariant,
  ProductVariantMedia,
  User,
} from "@/drizzle/schema";
import type {
  ProductVariantWithRelations,
  PublicProductVariantWithRelations,
} from "@/features/product/types/product-variant";

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
  badge: product_variants.badge,
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
  offerNote: product_variants.offerNote,
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

type QueryMedia =
  | (ProductVariantMedia & {
      media: Media | null;
    })
  | null;

interface QueryRawRows extends ProductVariant {
  media: QueryMedia;
}

export const toPublicProductVariants = ({
  rawRows,
}: {
  rawRows: QueryRawRows[];
}): PublicProductVariantWithRelations[] =>
  rawRows.map((rawRow) => toPublicProductVariant({ rawRow }));

export const toPublicProductVariant = ({
  rawRow,
}: {
  rawRow: QueryRawRows;
}): PublicProductVariantWithRelations => ({
  badge: rawRow.badge,
  isDefault: rawRow.isDefault,
  media: rawRow.media?.media
    ? {
        altText: rawRow.media.media.altText,
        height: rawRow.media.media.height,
        key: rawRow.media.media.key,
        mimeType: rawRow.media.media.mimeType,
        name: rawRow.media.media.name,
        size: rawRow.media.media.size,
        ufsUrl: rawRow.media.media.ufsUrl,
        width: rawRow.media.media.width,
      }
    : null,
  name: rawRow.name,
  offerNote: rawRow.offerNote,
  price: rawRow.price,
  productId: rawRow.productId,
  productVariantId: rawRow.productVariantId,
  salePrice: rawRow.salePrice,
  sku: rawRow.sku,
  slug: rawRow.slug,
  status: rawRow.status,
  stockQuantity: rawRow.stockQuantity,
});
