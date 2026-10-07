import { Skeleton } from "@/components/ui/skeleton";
import { OderDetailCard } from "@/features/order/components/details/order-detail-card";
import { findOrderUseCase } from "@/features/order/use-cases/order";
import { getActiveContext } from "@/lib/auth/get-active-context";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export default async function OrderDetailPage(
  props: PageProps<"/[locale]/workspace/[organization]/orders/[order]">
) {
  return (
    <div className="flex w-full justify-center">
      <Suspense fallback={<OrderDetailPageSkeleton />}>
        <OrderDetailWrapper {...props} />
      </Suspense>
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

  if (!order) {
    notFound();
  }

  return (
    <div className="flex w-full max-w-5xl justify-center">
      {/* <pre>
        <code>{JSON.stringify(order, null, 2)}</code>
      </pre> */}
      <OderDetailCard order={order.row} />
    </div>
  );
}

const OrderDetailPageSkeleton = () => (
  <div className="flex w-full max-w-5xl flex-col justify-center gap-4">
    <div className="flex w-full justify-between gap-2 rounded-2xl border p-4">
      <div className="space-y-2">
        <Skeleton className="h-6 w-50" />
        <Skeleton className="h-4 w-20" />
      </div>
      <div>
        <Skeleton className="h-9 w-30" />
      </div>
    </div>

    <div className="min-h-60 space-y-3 rounded-2xl border p-4 pt-4">
      <div className="flex justify-between gap-2">
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-5 w-40" />
      </div>
      <div className="flex justify-between gap-2">
        <Skeleton className="h-5 w-30" />
        <Skeleton className="h-5 w-40" />
      </div>
      <div className="flex justify-between gap-2">
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-5 w-36" />
      </div>
      <div className="flex justify-between gap-2">
        <Skeleton className="h-5 w-30" />
        <Skeleton className="h-5 w-20" />
      </div>
      <div className="flex justify-between gap-2">
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-5 w-40" />
      </div>
    </div>

    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div className="min-h-40 space-y-3 rounded-2xl border p-4 pt-4">
        <div className="flex justify-between gap-2">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-5 w-40" />
        </div>
        <div className="flex justify-between gap-2">
          <Skeleton className="h-5 w-30" />
          <Skeleton className="h-5 w-40" />
        </div>
        <div className="flex justify-between gap-2">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-5 w-36" />
        </div>
      </div>
      <div className="min-h-40 space-y-3 rounded-2xl border p-4 pt-4">
        <div className="flex justify-between gap-2">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-5 w-40" />
        </div>
        <div className="flex justify-between gap-2">
          <Skeleton className="h-5 w-30" />
          <Skeleton className="h-5 w-40" />
        </div>
      </div>
    </div>
  </div>
);
