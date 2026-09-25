const MEDIA_CACHE_LIFE = "weeks" as const;

export const mediaCache = {
  profile: {
    detail: { life: MEDIA_CACHE_LIFE },
    list: { life: MEDIA_CACHE_LIFE },
  } as const,

  tags: {
    list: ({ organizationId }: { organizationId: string }) =>
      `organization:${organizationId}:media:list`,
  } as const,
};
