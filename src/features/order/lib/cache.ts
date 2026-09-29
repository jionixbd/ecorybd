const ORDER_CACHE_LIFE = "weeks" as const;

export const orderCache = {
  profile: {
    detail: { life: ORDER_CACHE_LIFE },
    list: { life: ORDER_CACHE_LIFE },
  } as const,

  tags: {
    detailId: ({
      orderId,
      organizationId,
    }: {
      organizationId: string;
      orderId: string;
    }) => `organization:${organizationId}:order:id:${orderId}`,

    list: ({ organizationId }: { organizationId: string }) =>
      `organization:${organizationId}:order:list`,
  },
};
