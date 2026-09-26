import { AsyncBoundary } from "@/components/boundaries/async-boundary";
import { DataTableAdvancedFilterProvider } from "@/features/data-table/components/advanced/data-table-advanced-filter-provider";
import { ProductVariantsSkeleton } from "@/features/product/components/product-variants/product-variants-skeleton";
import { ProductVariantsTable } from "@/features/product/components/product-variants/table/product-variants-table";
import { productVariantSearchParam } from "@/features/product/parsers/product-variant";
import { getProductVariantsUseCase } from "@/features/product/use-cases/product-variant";
import { getActiveContext } from "@/lib/auth/get-active-context";

export default async function ProductVariantsPage(
  props: PageProps<"/[locale]/workspace/[organization]/products/[product]">
) {
  return (
    <div className="flex w-full justify-center">
      <AsyncBoundary suspenseFallback={<ProductVariantsSkeleton />}>
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
  const context = await getActiveContext();

  if (!context.organization) {
    return null;
  }

  const promises = Promise.all([
    getProductVariantsUseCase({
      organizationId: context.organization.organizationId,
      productSlug: params.product,
      search,
    }),
  ]);

  return (
    <div className="flex w-full max-w-5xl justify-center">
      <ProductVariantsTable promises={promises} />
    </div>
  );
};
