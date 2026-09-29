"use client";

import {
  CheckCircle2,
  ChevronDownIcon,
  Clock,
  type LucideIcon,
  Package,
  PackageCheck,
  RotateCcw,
  TrashIcon,
  Truck,
  XCircle,
} from "lucide-react";
import { capitalize } from "radash";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { orders, type OrderStatus } from "@/drizzle/schema/order";
import {
  deleteOrderAction,
  updateOrderStatusAction,
} from "@/features/order/actions/order";
import { useAction } from "next-safe-action/hooks";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

interface OrderDetailStatusProps {
  orderId: string;
  status: OrderStatus;
}

export const orderStatusIcons: Record<OrderStatus, LucideIcon> = {
  cancelled: XCircle,
  confirmed: CheckCircle2,
  delivered: PackageCheck,
  fulfilled: Package,
  pending: Clock,
  refunded: RotateCcw,
  shipped: Truck,
};

export const OrderDetailStatus = ({
  orderId,
  status,
}: OrderDetailStatusProps) => {
  const params = useParams();
  const router = useRouter();

  const { executeAsync: updateOrder, isPending: isUpdating } = useAction(
    updateOrderStatusAction,
    {
      onError({ error }) {
        toast.error(
          `[${error.serverError?.code}]: ${error.serverError?.message}`
        );
      },
      onSuccess() {
        toast.success("Order Updated");
      },
    }
  );
  const { executeAsync: deleteOrder, isPending: isDeleting } = useAction(
    deleteOrderAction,
    {
      onError({ error }) {
        toast.error(
          `[${error.serverError?.code}]: ${error.serverError?.message}`
        );
      },

      onSuccess() {
        toast.success("Order Deleted");

        router.replace(`/workspace/${params.organization}/orders`);
      },
    }
  );

  return (
    <ButtonGroup>
      <Button className="pointer-events-none" variant="outline">
        {capitalize(status)}
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="pl-2!" variant="outline">
            <ChevronDownIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-44">
          <DropdownMenuGroup>
            <DropdownMenuLabel>Order Status</DropdownMenuLabel>

            {orders.status.enumValues.map((s) => {
              const Icon = orderStatusIcons[s];

              return (
                <DropdownMenuItem
                  disabled={isUpdating || isDeleting}
                  key={s}
                  onSelect={async () =>
                    await updateOrder({
                      input: {
                        status: s,
                      },
                      orderId,
                    })
                  }
                >
                  <Icon />
                  {capitalize(s)}
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuLabel>Order Action</DropdownMenuLabel>

            <DropdownMenuItem
              disabled={isUpdating || isDeleting}
              onSelect={async () => await deleteOrder({ orderId })}
              variant="destructive"
            >
              <TrashIcon />
              Delete
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </ButtonGroup>
  );
};
