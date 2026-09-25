import { AsyncBoundary } from "@/components/boundaries/async-boundary";
import { ProductDetailCard } from "@/features/product/components/details/product-detail-card";
import { getProductUseCase } from "@/features/product/use-cases/product";
import Link from "next/link";

export default async function ProductDetailPage(
  props: PageProps<"/[locale]/workspace/[organization]/products/[product]">
) {
  return (
    <div className="flex">
      <AsyncBoundary>
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
    <div className="flex w-full justify-center">
      <ProductDetailCard product={product} />

      <Link href={`/en/workspace/ecorybd/products/${product.slug}/media`}>
        Upload image
      </Link>
    </div>
  );
}
