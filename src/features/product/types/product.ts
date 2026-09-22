import type { DataTableFeatures } from "@/features/data-table/lib/table-features";
import type { Row, RowData } from "@tanstack/react-table";

export interface ProductsTableRowAction<TData extends RowData> {
  row: Row<DataTableFeatures, TData>;
  type: "open" | "edit";
}

export interface ProductWithRelations {
  badge: string | null;
  createdAt: Date;
  createdBy: {
    username: string;
    userId: string;
    avatar: string | null;
  } | null;
  description: unknown;
  isFeatured: boolean;
  metaDescription: string | null;
  metaTitle: string | null;
  name: string;
  organization: {
    name: string;
    slug: string;
    organizationId: string;
    logo: string | null;
  };
  price: string;
  productId: string;
  salePrice: string | null;
  shortDescription: unknown;
  sku: string;
  slug: string;
  status: "draft" | "published" | "archived";
  stockQuantity: number;
  tempDescription: string;
  tempShortDescription: string;
  updatedAt: Date;
}
