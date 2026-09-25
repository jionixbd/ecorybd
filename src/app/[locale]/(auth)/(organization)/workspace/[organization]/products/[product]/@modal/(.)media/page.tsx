import { AsyncBoundary } from "@/components/boundaries/async-boundary";
import { ProductMediaPickerRoute } from "@/features/media/components/product-media-picker-route";

export default function MediaModalPage(
  props: PageProps<"/[locale]/workspace/[organization]/products/[product]/media">
) {
  return (
    <AsyncBoundary>
      <ProductMediaPickerRoute {...props} modal />
    </AsyncBoundary>
  );
}
