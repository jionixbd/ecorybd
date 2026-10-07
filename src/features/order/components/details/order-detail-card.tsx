import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/features/data-table/lib/format-date";
import { OrderDetailEntity } from "@/features/order/components/details/order-detail-entity";
import { OrderDetailStatus } from "@/features/order/components/details/order-detail-status";
import type {
  OrderDetailsWithRelations,
  OrderWithRelations,
} from "@/features/order/types/order";
import { formatBDT } from "@/lib/format-bdt";
import { PhoneForwarded } from "lucide-react";
import Link from "next/link";

interface OderDetailCardProps {
  order: OrderDetailsWithRelations;
}

export const OderDetailCard = ({ order }: OderDetailCardProps) => (
  <div className="grid w-full grid-cols-1 gap-4">
    <Card className="w-full">
      <CardHeader className="gap-0">
        <CardTitle>#{order.orderNumber}</CardTitle>
        <CardDescription>{formatDate(order.createdAt)}</CardDescription>
        <CardAction>
          <OrderDetailStatus orderId={order.orderId} status={order.status} />
        </CardAction>
      </CardHeader>
    </Card>

    <Card className="w-full">
      <CardHeader className="gap-0">
        <CardTitle>Summary</CardTitle>
      </CardHeader>

      <CardContent>
        {order.items.map((item) => (
          <OrderItem {...item} key={item.productVariantId} />
        ))}

        <Separator />

        <OrderDetailEntity
          hind
          label="Item Subtotal"
          value={formatBDT(order.subtotal)}
        />

        <OrderDetailEntity
          hind
          label="Shipping Subtotal"
          value={formatBDT(order.shippingTotal)}
        />

        <Separator />

        <OrderDetailEntity
          hind
          label="Order Total"
          value={formatBDT(order.total)}
        />
      </CardContent>
    </Card>

    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <OderBilling {...order.billing} />
      <OderShipping
        shippingMethodCode={order.shippingMethodCode}
        shippingMethodName={order.shippingMethodName}
      />
    </div>
  </div>
);

const OrderItem = ({
  productName,
  productVariantName,
  unitPrice,
  quantity,
  subtotal,
}: OrderDetailsWithRelations["items"][number]) => (
  <Item className="w-full px-0" size={"sm"}>
    <ItemMedia className="size-15! bg-muted" variant="image" />
    <ItemContent className="grid w-full grid-cols-3">
      <div className="flex flex-col items-start justify-center">
        <ItemTitle className="line-clamp-1">{productName}</ItemTitle>
        <ItemDescription>{productVariantName}</ItemDescription>
      </div>

      <div className="flex items-center justify-end gap-4">
        <ItemDescription className="font-hind font-normal text-base">
          {formatBDT(unitPrice)}
        </ItemDescription>
        <ItemDescription>x{quantity}</ItemDescription>
      </div>

      <div className="flex items-center justify-end">
        <ItemDescription className="font-hind font-normal text-base">
          {" "}
          {formatBDT(subtotal)}
        </ItemDescription>
      </div>
    </ItemContent>
  </Item>
);

const OderBilling = ({
  name,
  phone,
  address,
}: OrderWithRelations["billing"]) => (
  <Card className="w-full">
    <CardHeader className="gap-0">
      <CardTitle>Customer</CardTitle>
    </CardHeader>

    <CardContent>
      <OrderDetailEntity label="Name" middle value={name} />
      <OrderDetailEntity
        label="Phone"
        middle
        value={
          <Link className="flex items-center gap-2" href={`tel:${phone}`}>
            <PhoneForwarded className="size-4" />
            {phone}
          </Link>
        }
      />
      <OrderDetailEntity label="Address" middle value={address} />
    </CardContent>
  </Card>
);

const OderShipping = ({
  shippingMethodCode,
  shippingMethodName,
}: {
  shippingMethodName: string;
  shippingMethodCode: string;
}) => (
  <Card className="w-full">
    <CardHeader className="gap-0">
      <CardTitle>Shipping</CardTitle>
    </CardHeader>

    <CardContent>
      <OrderDetailEntity label="Name" middle value={shippingMethodCode} />
      <OrderDetailEntity label="Address" middle value={shippingMethodName} />
    </CardContent>
  </Card>
);
