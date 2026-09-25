import type { DbClient } from "@/drizzle/db";
import { media } from "@/drizzle/schema/media";
import { organizations } from "@/drizzle/schema/organization";
import { users } from "@/drizzle/schema/user";
import {
  buildMultiSelectFilter,
  buildTextSearchFilter,
} from "@/drizzle/utils/filters";
import { buildPagination } from "@/drizzle/utils/pagination";
import { buildOrderBy } from "@/drizzle/utils/sort";
import type { MediaSearchParams } from "@/features/media/parsers/media";
import type { InsertMediaInput } from "@/features/media/validations/media";
import { and, asc, count, eq } from "drizzle-orm";

function buildMediaWhere({
  search,
  organizationId,
}: {
  organizationId: string;
  search: MediaSearchParams;
}) {
  return and(
    eq(media.organizationId, organizationId),
    buildTextSearchFilter({
      columns: [media.altText],
      value: search.altText,
    }),
    buildMultiSelectFilter({
      column: media.mimeType,
      values: search.mime,
    })
  );
}

export async function existsMediaOrganizationId({
  client,
  organizationId,
  mediaId,
}: {
  client: DbClient;
  organizationId: string;
  mediaId: string;
}) {
  const [result] = await client
    .select({ mediaId: media.mediaId })
    .from(media)
    .where(
      and(eq(media.organizationId, organizationId), eq(media.mediaId, mediaId))
    );

  return result;
}

export async function insertMedia({
  values,
  client,
  userId,
  organizationId,
}: {
  userId: string;
  organizationId: string;
  values: InsertMediaInput;
  client: DbClient;
}) {
  const [result] = await client
    .insert(media)
    .values({ ...values, organizationId, uploadedBy: userId })
    .returning();

  return result;
}

export async function findMedia({
  client,
  search,
  organizationId,
}: {
  client: DbClient;
  organizationId: string;
  search: MediaSearchParams;
}) {
  const where = buildMediaWhere({ organizationId, search });

  const orderBy = buildOrderBy({
    columns: {
      createdAt: media.createdAt,
    },
    fallback: asc(media.createdAt),
    sort: search.sort,
  });

  const { limit, offset } = buildPagination({
    page: search.page,
    perPage: search.perPage,
  });

  return await client
    .select()
    .from(media)
    .innerJoin(users, eq(users.userId, media.uploadedBy))
    .innerJoin(
      organizations,
      eq(organizations.organizationId, media.organizationId)
    )
    .limit(limit)
    .offset(offset)
    .where(where)
    .orderBy(...orderBy);
}

export async function countMedia({
  client,
  search,
  organizationId,
}: {
  client: DbClient;
  organizationId: string;
  search: MediaSearchParams;
}) {
  const [result] = await client
    .select({ count: count() })
    .from(media)
    .where(buildMediaWhere({ organizationId, search }));

  return result?.count ?? 0;
}

export async function deleteMedia({
  client,
  organizationId,
  mediaId,
}: {
  client: DbClient;
  organizationId: string;
  mediaId: string;
}) {
  const [result] = await client
    .delete(media)
    .where(
      and(eq(media.organizationId, organizationId), eq(media.mediaId, mediaId))
    )
    .returning();

  return result;
}
