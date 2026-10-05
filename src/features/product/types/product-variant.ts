import type { DataTableFeatures } from "@/features/data-table/lib/table-features";
import type { Row, RowData } from "@tanstack/react-table";

export interface ProductVariantsRowAction<TData extends RowData> {
  row: Row<DataTableFeatures, TData>;
  variant: "open" | "update" | "delete";
}

export interface ProductVariantWithRelations {
  badge: string | null;
  createdAt: Date;
  createdBy: {
    avatar: string | null;
    userId: string;
    username: string;
  } | null;
  isDefault: boolean;
  name: string;
  offerNote: string | null;
  organization: {
    logo: string | null;
    name: string;
    organizationId: string;
    slug: string;
  };
  price: number;
  productId: string;
  productVariantId: string;
  salePrice: number | null;
  sku: string;
  slug: string;
  status: "draft" | "published" | "archived";
  stockQuantity: number;
  updatedAt: Date;
}

export interface PublicProductVariantWithRelations {
  badge: string | null;
  isDefault: boolean;
  media: {
    name: string;
    altText: string | null;
    height: number | null;
    key: string;
    mimeType: string;
    size: number | null;
    ufsUrl: string;
    width: number | null;
  } | null;
  name: string;
  offerNote: string | null;
  price: number;
  productId: string;
  productVariantId: string;
  salePrice: number | null;
  sku: string;
  slug: string;
  status: "draft" | "published" | "archived";
  stockQuantity: number;
}
