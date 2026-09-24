import type { DataTableFeatures } from "@/features/data-table/lib/table-features";
import type { Row, RowData } from "@tanstack/react-table";

export interface ProductVariantsRowAction<TData extends RowData> {
  row: Row<DataTableFeatures, TData>;
  type: "open" | "edit";
}

export interface ProductVariantWithRelations {
  createdAt: Date;
  createdBy: {
    avatar: string | null;
    userId: string;
    username: string;
  } | null;
  isDefault: boolean;
  name: string;
  organization: {
    logo: string | null;
    name: string;
    organizationId: string;
    slug: string;
  };
  price: string;
  productId: string;
  productVariantId: string;
  salePrice: string | null;
  sku: string;
  slug: string;
  status: "draft" | "published" | "archived";
  stockQuantity: number;
  updatedAt: Date;
}
