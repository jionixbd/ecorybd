import { OrderCreatedChart } from "@/features/order/components/chart/order-created-chart";
import { OrderMonetaryChart } from "@/features/order/components/chart/order-monetary-chart";
import { OrderStatusChart } from "@/features/order/components/chart/order-status-chart";
import { orderStatisticsUseCase } from "@/features/order/use-cases/order";

export const OrderCharts = async ({
  organizationId,
}: {
  organizationId: string;
}) => {
  const data = await orderStatisticsUseCase({
    organizationId,
  });

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
      <OrderStatusChart data={data.countByStatus} />
      <OrderCreatedChart data={data.createdByDay} />
      <OrderMonetaryChart data={data.amountByStatus} />
    </div>
  );
};
