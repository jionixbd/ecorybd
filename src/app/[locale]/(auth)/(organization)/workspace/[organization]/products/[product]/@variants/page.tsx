import { AsyncBoundary } from "@/components/boundaries/async-boundary";
import { DataTableAdvancedFilterProvider } from "@/features/data-table/components/advanced/data-table-advanced-filter-provider";
import { ProductVariantsTable } from "@/features/product/components/product-variants/table/product-variants-table";
import { productVariantSearchParam } from "@/features/product/parsers/product-variant";
import { getProductVariantsUseCase } from "@/features/product/use-cases/product-variant";

export default async function ProductVariantsPage(
  props: PageProps<"/[locale]/workspace/[organization]/products/[product]">
) {
  return (
    <div>
      <AsyncBoundary>
        <DataTableAdvancedFilterProvider>
          <ProductVariantsPageWrapper {...props} />
        </DataTableAdvancedFilterProvider>
      </AsyncBoundary>
    </div>
  );
}

const ProductVariantsPageWrapper = async (
  props: PageProps<"/[locale]/workspace/[organization]/products/[product]">
) => {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const search = productVariantSearchParam.parse(searchParams);

  const promises = Promise.all([
    getProductVariantsUseCase({
      search,
      slug: params.product,
    }),
  ]);

  return (
    <div className="flex w-full justify-center">
      <ProductVariantsTable promises={promises} />
    </div>
  );
};
