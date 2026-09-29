import { ProductImagesSkeleton } from "@/features/product/components/product-media/product-images-skeleton";
import { ProductMediaGrid } from "@/features/product/components/product-media/product-media-grid";
import { getProductMediaUseCase } from "@/features/product/use-cases/product-media";
import { getActiveContext } from "@/lib/auth/get-active-context";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export default async function ProductImagesPage(
  props: PageProps<"/[locale]/workspace/[organization]/products/[product]">
) {
  return (
    <div className="flex w-full justify-center">
      <Suspense fallback={<ProductImagesSkeleton />}>
        <ProductImagesWrapper {...props} />
      </Suspense>
    </div>
  );
}

async function ProductImagesWrapper(
  props: PageProps<"/[locale]/workspace/[organization]/products/[product]">
) {
  const params = await props.params;
  const context = await getActiveContext();

  if (!context.organization) {
    return null;
  }

  const media = await getProductMediaUseCase({
    organizationId: context.organization.organizationId,
    productSlug: params.product,
  });

  if (!media) {
    return notFound();
  }

  return (
    <div className="flex w-full max-w-5xl justify-center">
      <ProductMediaGrid
        media={media.rows}
        organization={context.organization.slug}
        productSlug={params.product}
      />
    </div>
  );
}
