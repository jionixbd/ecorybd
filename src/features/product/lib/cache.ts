const PRODUCT_CACHE_LIFE = "weeks" as const;

export const productCache = {
  profile: {
    detail: { life: PRODUCT_CACHE_LIFE },
    list: { life: PRODUCT_CACHE_LIFE },
  } as const,

  tags: {
    detail: ({
      organizationId,
      slug,
    }: {
      organizationId: string;
      slug: string;
    }) => `organization:${organizationId}:product:slug:${slug}`,

    detailId: ({
      productId,
      organizationId,
    }: {
      organizationId: string;
      productId: string;
    }) => `organization:${organizationId}:product:id:${productId}`,

    list: ({ organizationId }: { organizationId: string }) =>
      `organization:${organizationId}:product:list`,

    media: ({
      productSlug,
      organizationId,
    }: {
      organizationId: string;
      productSlug: string;
    }) => `organization:${organizationId}:product:${productSlug}:media`,

    variants: ({
      productSlug,
      organizationId,
    }: {
      organizationId: string;
      productSlug: string;
    }) => `organization:${organizationId}:product:${productSlug}:variants`,
  } as const,
};
