import type { DbClient } from "@/drizzle/db";
import { organizations, productVariants, users } from "@/drizzle/schema";
import {
  buildMultiSelectFilter,
  buildTextSearchFilter,
} from "@/drizzle/utils/filters";
import { buildPagination } from "@/drizzle/utils/pagination";
import { buildOrderBy } from "@/drizzle/utils/sort";
import type { ProductVariantSearchParam } from "@/features/product/parsers/product-variant";
import type {
  InsertProductVariantInput,
  UpdateProductVariantInput,
} from "@/features/product/validations/product-variant";
import { and, asc, count, eq } from "drizzle-orm";

function buildProductVariantsWhere({
  search,
  productId,
}: {
  productId: string;
  search: ProductVariantSearchParam;
}) {
  return and(
    eq(productVariants.productId, productId),
    buildTextSearchFilter({
      columns: [productVariants.name],
      value: search.name,
    }),
    buildMultiSelectFilter({
      column: productVariants.status,
      values: search.status,
    })
  );
}

export async function existsProductVariantSlugOrganizationId({
  client,
  organizationId,
  slug,
}: {
  client: DbClient;
  organizationId: string;
  slug: string;
}) {
  const [result] = await client
    .select({ productVariantId: productVariants.productVariantId })
    .from(productVariants)
    .where(
      and(
        eq(productVariants.organizationId, organizationId),
        eq(productVariants.slug, slug)
      )
    );

  return result;
}

export async function existsProductVariantProductId({
  client,
  productId,
  productVariantId,
}: {
  client: DbClient;
  productId: string;
  productVariantId: string;
}) {
  const [result] = await client
    .select({ productVariantId: productVariants.productVariantId })
    .from(productVariants)
    .where(
      and(
        eq(productVariants.productVariantId, productVariantId),
        eq(productVariants.productId, productId)
      )
    );

  return result;
}

export async function existsProductVariantSlugProductId({
  client,
  productId,
  productVariantSlug,
}: {
  client: DbClient;
  productId: string;
  productVariantSlug: string;
}) {
  const [result] = await client
    .select({ productVariantId: productVariants.productVariantId })
    .from(productVariants)
    .where(
      and(
        eq(productVariants.slug, productVariantSlug),
        eq(productVariants.productId, productId)
      )
    );

  return result;
}

export async function insertProductVariant({
  client,
  organizationId,
  userId,
  productId,
  values,
}: {
  client: DbClient;
  organizationId: string;
  userId: string;
  productId: string;
  values: InsertProductVariantInput;
}) {
  const [result] = await client
    .insert(productVariants)
    .values({
      ...values,
      createdBy: userId,
      organizationId,
      price: values.price,
      productId,
      salePrice: values.salePrice,
    })
    .returning();

  return result;
}

export async function findProductVariants({
  client,
  search,
  productId,
}: {
  client: DbClient;
  productId: string;
  search: ProductVariantSearchParam;
}) {
  const where = buildProductVariantsWhere({ productId, search });

  const orderBy = buildOrderBy({
    columns: {
      createdAt: productVariants.createdAt,
      isDefault: productVariants.isDefault,
      name: productVariants.name,
    },
    fallback: asc(productVariants.createdAt),
    sort: search.sort,
  });

  const { limit, offset } = buildPagination({
    page: search.page,
    perPage: search.perPage,
  });

  return await client
    .select()
    .from(productVariants)
    .innerJoin(users, eq(users.userId, productVariants.createdBy))
    .innerJoin(
      organizations,
      eq(organizations.organizationId, productVariants.organizationId)
    )
    .limit(limit)
    .offset(offset)
    .where(where)
    .orderBy(...orderBy);
}

export async function countProductVariants({
  client,
  search,
  productId,
}: {
  client: DbClient;
  productId: string;
  search: ProductVariantSearchParam;
}) {
  const [result] = await client
    .select({ count: count() })
    .from(productVariants)
    .where(buildProductVariantsWhere({ productId, search }));

  return result?.count ?? 0;
}

export async function updateProductVariant({
  client,
  organizationId,
  productId,
  productVariantId,
  values,
}: {
  client: DbClient;
  organizationId: string;
  userId: string;
  productId: string;
  productVariantId: string;
  values: UpdateProductVariantInput;
}) {
  const [result] = await client
    .update(productVariants)
    .set({
      ...values,
      organizationId,
      price: values.price,
      productId,
      salePrice: values.salePrice,
    })
    .where(
      and(
        eq(productVariants.productVariantId, productVariantId),
        eq(productVariants.productId, productId),
        eq(productVariants.organizationId, organizationId)
      )
    )
    .returning();

  return result;
}

export async function findPublicProductVariants({
  client,
  productId,
  organizationId,
}: {
  client: DbClient;
  productId: string;
  organizationId: string;
}) {
  return await client.query.productVariants.findMany({
    where: {
      AND: [{ organizationId }, { productId }, { status: "published" }],
    },
    with: {
      media: {
        with: {
          media: true,
        },
      },
    },
  });
}
