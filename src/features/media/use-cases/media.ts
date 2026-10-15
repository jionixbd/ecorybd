"use server";

import { db } from "@/drizzle/db";
import { buildPaginationMeta } from "@/drizzle/utils/pagination";
import {
  countMedia,
  deleteMedia,
  existsMediaOrganizationId,
  findMedia,
  insertMedia,
} from "@/features/media/data-access/media";
import { toMedia } from "@/features/media/dto/media";
import { mediaCache } from "@/features/media/lib/cache";
import type { MediaSearchParams } from "@/features/media/parsers/media";
import type { InsertMediaInput } from "@/features/media/validations/media";
import { InternalError, normalizeError, NotFoundError } from "@/lib/error";
import { cacheLife, cacheTag, updateTag } from "next/cache";

export async function getMediaUseCase({
  organizationId,
  search,
}: {
  organizationId: string;
  search: MediaSearchParams;
}) {
  "use cache";

  cacheLife(mediaCache.profile.list.life);
  cacheTag(
    mediaCache.tags.list({
      organizationId,
    })
  );

  try {
    const rawRows = await findMedia({
      client: db,
      organizationId,
      search,
    });

    const rowCount = await countMedia({
      client: db,
      organizationId,
      search,
    });

    return {
      meta: buildPaginationMeta({
        page: search.page,
        perPage: search.perPage,
        rowCount,
      }),
      rows: toMedia({ rawRows }),
    };
  } catch (error) {
    throw normalizeError(error);
  }
}

export async function insertMediaUserCase({
  input,
  organizationId,
  userId,
}: {
  organizationId: string;
  userId: string;
  input: InsertMediaInput;
}) {
  try {
    const row = await db.transaction(async (trx) => {
      const result = await insertMedia({
        client: trx,
        organizationId,
        userId,
        values: input,
      });

      if (!result) {
        throw new InternalError("Failed to insert media");
      }

      return result;
    });

    updateTag(mediaCache.tags.list({ organizationId }));

    return row;
  } catch (error) {
    throw normalizeError(error);
  }
}

export async function deleteMediaUserCase({
  organizationId,
  mediaId,
}: {
  organizationId: string;
  mediaId: string;
}) {
  try {
    const row = await db.transaction(async (trx) => {
      const existing = await existsMediaOrganizationId({
        client: trx,
        mediaId,
        organizationId,
      });

      if (!existing) {
        throw new NotFoundError(
          "Media not found or you do not have permission"
        );
      }

      const result = await deleteMedia({
        client: trx,
        mediaId,
        organizationId,
      });

      if (!result) {
        throw new InternalError("Failed to insert media");
      }

      return result;
    });

    updateTag(mediaCache.tags.list({ organizationId }));

    return row;
  } catch (error) {
    throw normalizeError(error);
  }
}
