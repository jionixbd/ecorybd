import type { Media, Organization, ProductMedia, User } from "@/drizzle/schema";
import type { ProductMediaWithRelations } from "@/features/product/types/product-media";

interface RawRow {
  media: Media;
  organizations: Organization;
  product_media: ProductMedia;
  users: User;
}

export const toProductMedia = ({
  rawRows,
}: {
  rawRows: RawRow[];
}): ProductMediaWithRelations[] =>
  rawRows.map((rawRow) => toProductMediaItem({ rawRow }));

export const toProductMediaItem = ({
  rawRow: { media, product_media, organizations, users },
}: {
  rawRow: RawRow;
}) => ({
  altText: media.altText,
  createdAt: media.createdAt,
  height: media.height,
  isFeatured: product_media.isFeatured,
  key: media.key,
  mediaId: media.mediaId,
  mimeType: media.mimeType,
  name: media.name,
  organization: {
    logo: organizations.logo,
    name: organizations.name,
    organizationId: organizations.organizationId,
    slug: organizations.slug,
  },
  position: product_media.position,
  productMediaId: product_media.productMediaId,
  size: media.size,
  ufsUrl: media.ufsUrl,
  updatedAt: media.updatedAt,
  uploadedBy: users
    ? {
        avatar: users.avatar,
        userId: users.userId,
        username: users.username,
      }
    : null,
  width: media.width,
});
