import type {
  BillingAddress,
  Order,
  OrderItem,
  Organization,
} from "@/drizzle/schema";
import type { OrderWithRelations } from "@/features/order/types/order";

interface RawRow {
  billing_address: BillingAddress;
  order_items: OrderItem;
  orders: Order;
  organizations: Organization;
}

export const toOrdersWithRelations = ({
  rawRows,
}: {
  rawRows: RawRow[];
}): OrderWithRelations[] =>
  rawRows.map((rawRow) => toOrderWithRelations({ rawRow }));

export const toOrderWithRelations = ({
  rawRow: { order_items, orders, billing_address, organizations },
}: {
  rawRow: RawRow;
}): OrderWithRelations => ({
  billing: {
    address: billing_address.address,
    billingAddressId: billing_address.billingAddressId,
    createdAt: billing_address.createdAt,
    customerId: billing_address.customerId,
    email: billing_address.email,
    name: billing_address.name,
    phone: billing_address.phone,
    updatedAt: billing_address.updatedAt,
  },
  createdAt: orders.createdAt,
  item: {
    orderItemId: order_items.orderItemId,
    productId: order_items.productId,
    productName: order_items.productName,
    productVariantId: order_items.productVariantId,
    productVariantName: order_items.productVariantName,
    quantity: order_items.quantity,
    sku: order_items.sku,
    subtotal: order_items.subtotal,
    total: order_items.total,
    unitPrice: order_items.unitPrice,
    variantName: order_items.variantName,
  },
  orderId: orders.orderId,
  orderNumber: orders.orderNumber,
  organization: {
    logo: organizations.logo,
    name: organizations.name,
    organizationId: organizations.organizationId,
    slug: organizations.slug,
  },
  organizationId: orders.organizationId,
  shippingMethodCode: orders.shippingMethodCode,
  shippingMethodId: orders.shippingMethodId,
  shippingMethodName: orders.shippingMethodName,
  shippingTotal: orders.shippingTotal,
  status: orders.status,
  subtotal: orders.subtotal,
  total: orders.total,
  updatedAt: orders.updatedAt,
});
