import { OrderFormClient } from "@/components/web/pages/landing/sections/order-form-client";
import { Container } from "@/components/web/pages/layout/container";
import { Section } from "@/components/web/pages/layout/section";
import { getProductVariantsUseCase } from "@/features/product/use-cases/storefront/product-variant";
import { getStorefrontContext } from "@/lib/storefront/get-storefront-context";
import { connection } from "next/server";

export async function OrderForm() {
  await connection();

  const { organizationId } = getStorefrontContext();

  const rows = await getProductVariantsUseCase({
    organizationId,
    productSlug: "methimix",
  });

  return (
    <Section className="bg-[#edf1e8]" id="order-form">
      <Container>
        {!rows.product || rows.variants ? (
          <div>No product been set</div>
        ) : (
          <OrderFormClient product={rows.product} variants={rows.variants} />
        )}
      </Container>
    </Section>
  );
}
