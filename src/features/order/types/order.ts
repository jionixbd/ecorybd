import type { DataTableFeatures } from "@/features/data-table/lib/table-features";
import type { Row, RowData } from "@tanstack/react-table";

export interface OrdersTableRowAction<TData extends RowData> {
  row: Row<DataTableFeatures, TData>;
  type: "open" | "edit";
}

export interface OrderWithRelations {
  billing: {
    address: string;
    billingAddressId: string;
    createdAt: Date;
    customerId: string | null;
    email: string | null;
    name: string;
    phone: string;
    updatedAt: Date;
  };
  createdAt: Date;
  // item: {
  //   subtotal: number;
  //   total: number;
  //   orderItemId: string;
  //   productId: string | null;
  //   productName: string;
  //   productVariantId: string | null;
  //   sku: string;
  //   productVariantName: string;
  //   quantity: number;
  //   unitPrice: number;
  //   variantName: string | null;
  // };
  orderId: string;
  orderNumber: string;
  organization: {
    name: string;
    slug: string;
    organizationId: string;
    logo: string | null;
  };
  organizationId: string;
  shippingMethodCode: string;
  shippingMethodId: string | null;
  shippingMethodName: string;
  shippingTotal: number;
  status:
    | "pending"
    | "confirmed"
    | "fulfilled"
    | "cancelled"
    | "shipped"
    | "delivered"
    | "refunded";
  subtotal: number;
  total: number;
  updatedAt: Date;
}

export interface OrderDetailsWithRelations {
  billing: {
    address: string;
    billingAddressId: string;
    createdAt: Date;
    customerId: string | null;
    email: string | null;
    name: string;
    phone: string;
    updatedAt: Date;
  };
  createdAt: Date;
  items: {
    subtotal: number;
    total: number;
    orderItemId: string;
    productId: string | null;
    productName: string;
    productVariantId: string | null;
    sku: string;
    productVariantName: string;
    quantity: number;
    unitPrice: number;
    variantName: string | null;
  }[];
  orderId: string;
  orderNumber: string;
  organization: {
    name: string;
    slug: string;
    organizationId: string;
    logo: string | null;
  };
  organizationId: string;
  shippingMethodCode: string;
  shippingMethodId: string | null;
  shippingMethodName: string;
  shippingTotal: number;
  status:
    | "pending"
    | "confirmed"
    | "fulfilled"
    | "cancelled"
    | "shipped"
    | "delivered"
    | "refunded";
  subtotal: number;
  total: number;
  updatedAt: Date;
}
