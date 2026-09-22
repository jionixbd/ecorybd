CREATE TYPE "product_status" AS ENUM('draft', 'published', 'archived');--> statement-breakpoint
CREATE TABLE "media" (
	"alt_text" varchar(255),
	"height" integer,
	"key" varchar(512) NOT NULL CONSTRAINT "unq_media_key" UNIQUE,
	"media_id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"mime_type" varchar(64) NOT NULL,
	"name" varchar(255) NOT NULL,
	"organization_id" uuid NOT NULL,
	"size" integer,
	"ufs_url" varchar NOT NULL,
	"user_id" uuid,
	"width" integer
);
--> statement-breakpoint
CREATE TABLE "product_media" (
	"is_featured" boolean DEFAULT false NOT NULL,
	"media_id" uuid NOT NULL,
	"position" integer NOT NULL,
	"product_id" uuid NOT NULL,
	"product_media_id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	CONSTRAINT "unq_product_media" UNIQUE("product_id","media_id")
);
--> statement-breakpoint
CREATE TABLE "products" (
	"badge" varchar(64),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_by" uuid,
	"description" jsonb,
	"is_featured" boolean DEFAULT false NOT NULL,
	"meta_description" text,
	"meta_title" varchar(255),
	"name" varchar(255) NOT NULL,
	"organization_id" uuid NOT NULL,
	"product_id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"short_description" jsonb,
	"slug" varchar(255) NOT NULL CONSTRAINT "unq_product_slug" UNIQUE,
	"status" "product_status" DEFAULT 'draft'::"product_status" NOT NULL,
	"temp_description" text NOT NULL,
	"temp_short_description" text NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "product_variant_media" (
	"media_id" uuid NOT NULL,
	"position" integer NOT NULL,
	"product_variant_id" uuid NOT NULL,
	"product_variant_media_id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	CONSTRAINT "unq_product_variant_media" UNIQUE("product_variant_id","media_id")
);
--> statement-breakpoint
CREATE TABLE "product_variants" (
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_by" uuid,
	"is_default" boolean DEFAULT true NOT NULL,
	"name" varchar(255) NOT NULL,
	"organization_id" uuid NOT NULL,
	"price" numeric(10,2) NOT NULL,
	"product_id" uuid NOT NULL,
	"product_variant_id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"sale_price" numeric(10,2),
	"sku" varchar(64) NOT NULL CONSTRAINT "unq_product_variant_sku" UNIQUE,
	"slug" varchar(255) NOT NULL CONSTRAINT "unq_product_variant_slug" UNIQUE,
	"status" "product_status" DEFAULT 'draft'::"product_status" NOT NULL,
	"stock_quantity" integer NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "chk_product_variants_price" CHECK ("price" >= 0),
	CONSTRAINT "chk_product_variants_sale_price" CHECK ("sale_price" IS NULL OR "sale_price" >= 0),
	CONSTRAINT "chk_product_variants_sale_price_less_than_price" CHECK ("sale_price" IS NULL OR "sale_price" < "price"),
	CONSTRAINT "chk_product_variants_stock_quantity" CHECK ("stock_quantity" >= 0)
);
--> statement-breakpoint
CREATE INDEX "idx_media_organization_id" ON "media" ("organization_id");--> statement-breakpoint
CREATE INDEX "idx_media_user_id" ON "media" ("user_id");--> statement-breakpoint
CREATE INDEX "idx_product_media_product_id" ON "product_media" ("product_id");--> statement-breakpoint
CREATE INDEX "idx_product_media_media_id" ON "product_media" ("media_id");--> statement-breakpoint
CREATE UNIQUE INDEX "unq_product_featured_media" ON "product_media" ("product_id") WHERE "is_featured" = true;--> statement-breakpoint
CREATE INDEX "idx_products_organization_id" ON "products" ("organization_id");--> statement-breakpoint
CREATE INDEX "idx_products_created_by" ON "products" ("created_by");--> statement-breakpoint
CREATE INDEX "idx_product_variant_media_product_variant_id" ON "product_variant_media" ("product_variant_id");--> statement-breakpoint
CREATE INDEX "idx_product_variant_media_media_id" ON "product_variant_media" ("media_id");--> statement-breakpoint
CREATE UNIQUE INDEX "unq_product_default_variant" ON "product_variants" ("product_id") WHERE "is_default" = true;--> statement-breakpoint
ALTER TABLE "media" ADD CONSTRAINT "media_organization_id_organizations_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("organization_id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "media" ADD CONSTRAINT "media_user_id_users_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE SET NULL;--> statement-breakpoint
ALTER TABLE "product_media" ADD CONSTRAINT "product_media_media_id_media_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "media"("media_id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "product_media" ADD CONSTRAINT "product_media_product_id_products_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("product_id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_created_by_users_user_id_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("user_id") ON DELETE SET NULL;--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_organization_id_organizations_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("organization_id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "product_variant_media" ADD CONSTRAINT "product_variant_media_media_id_media_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "media"("media_id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "product_variant_media" ADD CONSTRAINT "product_variant_media_CR6e750aFbqZ_fkey" FOREIGN KEY ("product_variant_id") REFERENCES "product_variants"("product_variant_id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "product_variants" ADD CONSTRAINT "product_variants_created_by_users_user_id_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("user_id") ON DELETE SET NULL;--> statement-breakpoint
ALTER TABLE "product_variants" ADD CONSTRAINT "product_variants_0MhgTCcGUABL_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("organization_id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "product_variants" ADD CONSTRAINT "product_variants_product_id_products_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("product_id") ON DELETE CASCADE;