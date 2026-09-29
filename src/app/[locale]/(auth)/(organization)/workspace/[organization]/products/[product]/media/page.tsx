import { ProductMediaPickerRoute } from "@/features/product/components/product-media/product-media-picker-route";
import { Suspense } from "react";

export default function MediaPage(
  props: PageProps<"/[locale]/workspace/[organization]/products/[product]/media">
) {
  return (
    <Suspense fallback={null}>
      <ProductMediaPickerRoute {...props} />
    </Suspense>
  );
}
