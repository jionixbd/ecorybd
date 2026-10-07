import { Container } from "@/components/web/pages/layout/container";
import { Section } from "@/components/web/pages/layout/section";
import { OrderFormClient } from "@/components/web/pages/thankuan/order-form-client";
import {
  getProductVariantsUseCase,
  getProductVariantUseCase,
} from "@/features/product/use-cases/storefront/product-variant";
import { getStorefrontContext } from "@/lib/storefront/get-storefront-context";

export async function OrderForm() {
  const { organizationId } = getStorefrontContext();

  const rows = await getProductVariantsUseCase({
    organizationId,
    productSlug: "thankuan",
  });

  const additional = await getProductVariantUseCase({
    organizationId,
    productSlug: "awshashakti",
    productVariantSlug: "awshashakti-t-file",
  });

  return (
    <Section className="bg-web-secondary" id="order-form">
      <Container>
        {!!rows?.product && !!rows.variants && (
          <OrderFormClient
            additional={additional}
            product={rows.product}
            variants={rows.variants}
          />
        )}
      </Container>
    </Section>
  );
}
