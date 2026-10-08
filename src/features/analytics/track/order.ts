import { sendGTMEvent } from "@next/third-parties/google";

interface OrderPurchaseInput {
  customer: {
    billing_name: string;
    billing_address: string;
    billing_phone: string;
    order_count: number;
    total_spent: number;
  };
  items: {
    productName: string;
    quantity: number;
    sku: string;
    unitPrice: number;
    variantName: string;
  }[];
  orderNumber: string;
  shippingTotal: number;
  // subtotal: number;
  total: number;
}

type CheckoutItem = OrderPurchaseInput["items"][number];

export function toTrackOrderPurchase({
  items,
  orderNumber,
  shippingTotal,
  // subtotal,
  total,
  customer,
}: OrderPurchaseInput) {
  sendGTMEvent({ ecommerce: null });
  sendGTMEvent({
    ecommerce: {
      currency: "BDT",
      customer,
      items: items.map((item) => ({
        item_id: item.sku,
        item_name: item.productName,
        item_variant: item.variantName,
        price: item.unitPrice,
        quantity: item.quantity,
      })),
      shipping: shippingTotal,
      transaction_id: orderNumber,
      // value: subtotal,
      value: total,
    },
    event: "purchase",
  });
}

export function toTrackPaymentInfo({
  items,
  // subtotal,
  total,
  customer,
}: Omit<OrderPurchaseInput, "orderNumber" | "shippingTotal">) {
  sendGTMEvent({ ecommerce: null });
  sendGTMEvent({
    ecommerce: {
      currency: "BDT",
      customer,
      items: items.map((item) => ({
        item_id: item.sku,
        item_name: item.productName,
        item_variant: item.variantName,
        price: item.unitPrice,
        quantity: item.quantity,
      })),
      // value: subtotal,
      value: total,
    },
    event: "add_payment_info",
  });
}

export function toTrackBeginCheckout({
  items,
  value,
}: {
  items: CheckoutItem[];
  value: number;
}) {
  sendGTMEvent({ ecommerce: null });
  sendGTMEvent({
    ecommerce: {
      currency: "BDT",
      items: items.map((item) => ({
        item_id: item.sku,
        item_name: item.productName,
        item_variant: item.variantName,
        price: item.unitPrice,
        quantity: item.quantity,
      })),
      value,
    },
    event: "begin_checkout",
  });
}
