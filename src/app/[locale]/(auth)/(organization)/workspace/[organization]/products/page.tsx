import { AsyncBoundary } from "@/components/boundaries/async-boundary";
import { DataTableAdvancedFilterProvider } from "@/features/data-table/components/advanced/data-table-advanced-filter-provider";
import { DataTableSkeleton } from "@/features/data-table/components/common/data-table-skeleton";
import { getValidFilters } from "@/features/data-table/lib/valid-filters";
import { ProductsTable } from "@/features/product/components/products/table/products-table";
import { productSearchParam } from "@/features/product/parsers/product";
import { getProductsUseCase } from "@/features/product/use-cases/product";

export default async function ProductsPage(
  props: PageProps<"/[locale]/workspace/[organization]/products">
) {
  return (
    <div>
      <AsyncBoundary
        suspenseFallback={
          <DataTableSkeleton columnCount={20} filterCount={1} />
        }
      >
        <DataTableAdvancedFilterProvider>
          <ProductsPageWrapper {...props} />
        </DataTableAdvancedFilterProvider>
      </AsyncBoundary>
    </div>
  );
}

const ProductsPageWrapper = async (
  props: PageProps<"/[locale]/workspace/[organization]/products">
) => {
  const searchParams = await props.searchParams;
  const search = productSearchParam.parse(searchParams);
  const filters = getValidFilters(search.filters);

  const promises = Promise.all([
    getProductsUseCase({
      search: {
        ...search,
        filters,
      },
    }),
  ]);

  return (
    <div className="">
      <ProductsTable promises={promises} />
    </div>
  );
};
