import { AsyncBoundary } from "@/components/boundaries/async-boundary";
import { ProductDetailCard } from "@/features/product/components/details/product-detail-card";
import { ProductDetailSkeleton } from "@/features/product/components/details/product-details-skeleton";
import { getProductUseCase } from "@/features/product/use-cases/product";

export default async function ProductDetailPage(
  props: PageProps<"/[locale]/workspace/[organization]/products/[product]">
) {
  return (
    <div className="flex w-full justify-center">
      <AsyncBoundary suspenseFallback={<ProductDetailSkeleton />}>
        <ProductDetailWrapper {...props} />
      </AsyncBoundary>
    </div>
  );
}

async function ProductDetailWrapper(
  props: PageProps<"/[locale]/workspace/[organization]/products/[product]">
) {
  const params = await props.params;

  const product = await getProductUseCase({ slug: params.product });

  return (
    <div className="flex w-full max-w-5xl justify-center">
      <ProductDetailCard product={product} />
    </div>
  );
}
