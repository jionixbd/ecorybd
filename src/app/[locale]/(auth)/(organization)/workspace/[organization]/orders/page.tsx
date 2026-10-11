import { DataTableAdvancedFilterProvider } from "@/features/data-table/components/advanced/data-table-advanced-filter-provider";
import { DataTableSkeleton } from "@/features/data-table/components/common/data-table-skeleton";
import { getValidFilters } from "@/features/data-table/lib/valid-filters";
import { OrderCharts } from "@/features/order/components/chart/order-charts";

import { OrdersTable } from "@/features/order/components/table/orders-table";
import { orderSearchParam } from "@/features/order/parsers/order";
import { getOrdersUseCase } from "@/features/order/use-cases/order";
import { getActiveContext } from "@/lib/auth/get-active-context";
import { orderChartsFlag } from "@/lib/feature-flags";
import { Suspense } from "react";

export default async function OrdersPage(
  props: PageProps<"/[locale]/workspace/[organization]/orders">
) {
  return (
    <div>
      <Suspense
        fallback={<DataTableSkeleton columnCount={20} filterCount={1} />}
      >
        <DataTableAdvancedFilterProvider>
          <OrdersPageWrapper {...props} />
        </DataTableAdvancedFilterProvider>
      </Suspense>
    </div>
  );
}

const OrdersPageWrapper = async (
  props: PageProps<"/[locale]/workspace/[organization]/orders">
) => {
  const [searchParams, context, showChart] = await Promise.all([
    props.searchParams,
    getActiveContext(),
    orderChartsFlag(),
  ]);
  const search = orderSearchParam.parse(searchParams);
  const filters = getValidFilters(search.filters);

  if (!context.organization) {
    return null;
  }

  const promises = Promise.all([
    getOrdersUseCase({
      organizationId: context.organization?.organizationId,
      search: {
        ...search,
        filters,
      },
    }),
  ]);

  return (
    <div className="grid grid-cols-1 gap-4">
      {!!showChart && (
        <Suspense>
          <OrderCharts organizationId={context.organization?.organizationId} />
        </Suspense>
      )}
      <OrdersTable promises={promises} />
    </div>
  );
};
