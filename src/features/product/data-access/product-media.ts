import type { DbClient } from "@/drizzle/db";
import { media, organizations, productMedia, users } from "@/drizzle/schema";
import { buildPagination } from "@/drizzle/utils/pagination";
import { buildOrderBy } from "@/drizzle/utils/sort";
import { and, asc, count, eq, sql } from "drizzle-orm";

export async function existsProductMediaId({
  client,
  productId,
  mediaId,
}: {
  client: DbClient;
  productId: string;
  mediaId: string;
}) {
  const [result] = await client
    .select()
    .from(productMedia)
    .where(
      and(
        eq(productMedia.mediaId, mediaId),
        eq(productMedia.productId, productId)
      )
    );

  return result;
}

export async function nextProductMediaPosition({
  client,
  productId,
}: {
  client: DbClient;
  productId: string;
}) {
  const [result] = await client
    .select({
      nextPosition: sql<number>`COALESCE(MAX(${productMedia.position}), -1) + 1`,
    })
    .from(productMedia)
    .where(eq(productMedia.productId, productId));

  return Number(result?.nextPosition ?? 0);
}

export async function findProductMedia({
  client,
  productId,
}: {
  client: DbClient;
  productId: string;
}) {
  const orderBy = buildOrderBy({
    columns: {
      isDefault: productMedia.position,
    },
    fallback: asc(productMedia.mediaId),
    sort: [],
  });

  const { limit, offset } = buildPagination({
    page: 1,
    perPage: 100,
  });

  return await client
    .select()
    .from(productMedia)
    .innerJoin(media, eq(media.mediaId, productMedia.mediaId))
    .innerJoin(users, eq(users.userId, media.uploadedBy))
    .innerJoin(
      organizations,
      eq(organizations.organizationId, media.organizationId)
    )
    .limit(limit)
    .offset(offset)
    .where(eq(productMedia.productId, productId))
    .orderBy(...orderBy);
}

export async function countProductMedia({
  client,
  productId,
}: {
  client: DbClient;
  productId: string;
}) {
  const [result] = await client
    .select({ count: count() })
    .from(productMedia)
    .where(eq(productMedia.productId, productId));

  return result?.count ?? 0;
}

export async function attachProductMedia({
  client,
  mediaId,
  productId,
  values,
}: {
  client: DbClient;
  productId: string;
  mediaId: string;
  values: {
    position: number;
    isFeatured: boolean;
  };
}) {
  const [result] = await client.insert(productMedia).values({
    ...values,
    mediaId,
    productId,
  });

  return result;
}

export async function detachProductMedia({
  client,
  mediaId,
  productId,
}: {
  client: DbClient;
  productId: string;
  mediaId: string;
}) {
  const [result] = await client
    .delete(productMedia)
    .where(
      and(
        eq(productMedia.mediaId, mediaId),
        eq(productMedia.productId, productId)
      )
    )
    .returning();

  return result;
}

export async function setFeaturedProductMediaFalse({
  client,
  productId,
}: {
  client: DbClient;
  productId: string;
}) {
  const [result] = await client
    .update(productMedia)
    .set({
      isFeatured: false,
    })
    .where(eq(productMedia.productId, productId))
    .returning();

  return result;
}

export async function setFeaturedProductMedia({
  client,
  mediaId,
  productId,
}: {
  client: DbClient;
  productId: string;
  mediaId: string;
}) {
  const [result] = await client
    .update(productMedia)
    .set({
      isFeatured: true,
    })
    .where(
      and(
        eq(productMedia.mediaId, mediaId),
        eq(productMedia.productId, productId)
      )
    )
    .returning();

  return result;
}
