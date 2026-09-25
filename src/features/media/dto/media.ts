import type { Media, Organization, User } from "@/drizzle/schema";
import type { MediaWIthRelations } from "@/features/media/types/media";

interface RawRow {
  media: Media;
  organizations: Organization;
  users: User;
}

export const toMedia = ({
  rawRows,
}: {
  rawRows: RawRow[];
}): MediaWIthRelations[] => rawRows.map((rawRow) => toMediaItem({ rawRow }));

export const toMediaItem = ({
  rawRow: { media, organizations, users },
}: {
  rawRow: RawRow;
}): MediaWIthRelations => ({
  altText: media.altText,
  createdAt: media.createdAt,
  height: media.height,
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
