import { AsyncBoundary } from "@/components/boundaries/async-boundary";
import { OderDetailCard } from "@/features/order/components/details/order-detail-card";
import { findOrderUseCase } from "@/features/order/use-cases/order";
import { getActiveContext } from "@/lib/auth/get-active-context";

export default async function OrderDetailPage(
  props: PageProps<"/[locale]/workspace/[organization]/orders/[order]">
) {
  return (
    <div className="flex w-full justify-center">
      <AsyncBoundary>
        <OrderDetailWrapper {...props} />
      </AsyncBoundary>
    </div>
  );
}

async function OrderDetailWrapper(
  props: PageProps<"/[locale]/workspace/[organization]/orders/[order]">
) {
  const params = await props.params;
  const context = await getActiveContext();

  if (!context.organization) {
    return null;
  }

  const order = await findOrderUseCase({
    orderId: params.order,
    organizationId: context.organization.organizationId,
  });

  return (
    <div className="flex w-full max-w-5xl justify-center">
      <OderDetailCard order={order.row} />
    </div>
  );
}
