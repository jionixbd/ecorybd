export type MediaRouter = "mediaUploader";

export type MediaType = "all" | "image" | "svg";

export interface MediaWIthRelations {
  altText: string | null;
  createdAt: Date;
  height: number | null;
  key: string;
  mediaId: string;
  mimeType: string;
  name: string;
  organization: {
    name: string;
    slug: string;
    organizationId: string;
    logo: string | null;
  };
  size: number | null;
  ufsUrl: string;
  updatedAt: Date;
  uploadedBy: {
    username: string;
    userId: string;
    avatar: string | null;
  } | null;
  width: number | null;
}
