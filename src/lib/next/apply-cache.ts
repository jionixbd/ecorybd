import { cacheLife, cacheTag } from "next/cache";

export function applyCache(
  life: Parameters<typeof cacheLife>[0],
  tags: string[]
) {
  cacheLife(life);
  cacheTag(...tags);
}
