const PRODUCT_CACHE_LIFE = "minutes" as const;

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
    }) => `org:${organizationId}:product:slug:${slug}`,

    detailId: ({
      productId,
      organizationId,
    }: {
      organizationId: string;
      productId: string;
    }) => `org:${organizationId}:product:id:${productId}`,

    list: () => "organization:product:list",
  } as const,
};
