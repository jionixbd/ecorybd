import { MediaPickerRoute } from "@/features/media/components/picker/media-picker-route";
import { ProductMediaPickerClient } from "@/features/product/components/product-media/product-media-picker-client";

interface ProductMediaPickerRouteProps {
  modal?: boolean;
  params: Promise<{ product: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export async function ProductMediaPickerRoute({
  modal = false,
  params,
  searchParams,
}: ProductMediaPickerRouteProps) {
  const { product } = await params;

  return (
    <MediaPickerRoute
      modal={modal}
      renderPicker={({ media, pages }) => (
        <ProductMediaPickerClient
          media={media}
          pages={pages}
          productSlug={product}
        />
      )}
      searchParams={searchParams}
    />
  );
}
