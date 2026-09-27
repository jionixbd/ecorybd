CREATE TYPE "order_status" AS ENUM('pending', 'confirmed', 'fulfilled', 'cancelled', 'shipped', 'delivered', 'refunded');--> statement-breakpoint
CREATE TABLE "billing_address" (
	"address" text NOT NULL,
	"billing_address_id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"customer_id" uuid,
	"email" varchar(320),
	"name" varchar(255) NOT NULL,
	"phone" varchar(32) NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "order_items" (
	"order_id" uuid NOT NULL,
	"order_item_id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"product_id" uuid,
	"product_name" varchar(255) NOT NULL,
	"product_variant_id" uuid,
	"product_variant_name" varchar(255) NOT NULL,
	"quantity" integer NOT NULL,
	"sku" varchar(64) NOT NULL,
	"subtotal" numeric(12,2) NOT NULL,
	"total" numeric(12,2) NOT NULL,
	"unit_price" numeric(10,2) NOT NULL,
	"variant_name" varchar(255),
	CONSTRAINT "chk_order_items_quantity" CHECK ("quantity" > 0),
	CONSTRAINT "chk_order_items_unit_price" CHECK ("unit_price" >= 0),
	CONSTRAINT "chk_order_items_subtotal" CHECK ("subtotal" >= 0),
	CONSTRAINT "chk_order_items_total" CHECK ("total" >= 0)
);
--> statement-breakpoint
CREATE TABLE "orders" (
	"billing_address_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"order_id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"order_number" varchar(6) NOT NULL,
	"organization_id" uuid NOT NULL,
	"shipping_method_code" varchar(64) NOT NULL,
	"shipping_method_id" uuid,
	"shipping_method_name" varchar(255) NOT NULL,
	"shipping_total" numeric(12,2) NOT NULL,
	"status" "order_status" DEFAULT 'pending'::"order_status" NOT NULL,
	"subtotal" numeric(12,2) NOT NULL,
	"total" numeric(12,2) NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "unq_orders_org_order_number" UNIQUE("organization_id","order_number"),
	CONSTRAINT "chk_orders_subtotal" CHECK ("subtotal" >= 0),
	CONSTRAINT "chk_orders_shipping_total" CHECK ("shipping_total" >= 0),
	CONSTRAINT "chk_orders_total" CHECK ("total" >= 0),
	CONSTRAINT "chk_orders_total_matches_sum" CHECK ("total" = "subtotal" + "shipping_total")
);
--> statement-breakpoint
CREATE TABLE "product_shipping_methods" (
	"product_variant_id" uuid,
	"shipping_method_id" uuid,
	CONSTRAINT "product_shipping_methods_pkey" PRIMARY KEY("product_variant_id","shipping_method_id")
);
--> statement-breakpoint
CREATE TABLE "shipping_methods" (
	"charge" numeric(10,2) NOT NULL,
	"code" varchar(64) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_by" uuid,
	"description" varchar(512),
	"label" varchar(128),
	"name" varchar(255) NOT NULL,
	"organization_id" uuid NOT NULL,
	"shipping_method_id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "unq_shipping_methods_org_code" UNIQUE("organization_id","code"),
	CONSTRAINT "chk_shipping_methods_charge" CHECK ("charge" >= 0)
);
--> statement-breakpoint
CREATE INDEX "idx_order_items_order_id" ON "order_items" ("order_id");--> statement-breakpoint
CREATE INDEX "idx_orders_organization_id" ON "orders" ("organization_id");--> statement-breakpoint
CREATE INDEX "idx_orders_status" ON "orders" ("status");--> statement-breakpoint
CREATE INDEX "idx_orders_created_at" ON "orders" ("created_at");--> statement-breakpoint
CREATE INDEX "idx_product_shipping_methods_shipping_method_id" ON "product_shipping_methods" ("shipping_method_id");--> statement-breakpoint
CREATE INDEX "idx_shipping_methods_organization_id" ON "shipping_methods" ("organization_id");--> statement-breakpoint
ALTER TABLE "billing_address" ADD CONSTRAINT "billing_address_customer_id_organizations_organization_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "organizations"("organization_id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_order_id_orders_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("order_id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_product_id_products_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("product_id") ON DELETE SET NULL;--> statement-breakpoint
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_gCwjg7fwYRim_fkey" FOREIGN KEY ("product_variant_id") REFERENCES "product_variants"("product_variant_id") ON DELETE SET NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_6wjkU6iI3P6k_fkey" FOREIGN KEY ("billing_address_id") REFERENCES "billing_address"("billing_address_id") ON DELETE RESTRICT;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_organization_id_organizations_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("organization_id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_lHD38Uy9reXJ_fkey" FOREIGN KEY ("shipping_method_id") REFERENCES "shipping_methods"("shipping_method_id") ON DELETE SET NULL;--> statement-breakpoint
ALTER TABLE "product_shipping_methods" ADD CONSTRAINT "product_shipping_methods_5z4npBQbaKro_fkey" FOREIGN KEY ("product_variant_id") REFERENCES "product_variants"("product_variant_id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "product_shipping_methods" ADD CONSTRAINT "product_shipping_methods_DO3GDqArrC5z_fkey" FOREIGN KEY ("shipping_method_id") REFERENCES "shipping_methods"("shipping_method_id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "shipping_methods" ADD CONSTRAINT "shipping_methods_created_by_users_user_id_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("user_id") ON DELETE SET NULL;--> statement-breakpoint
ALTER TABLE "shipping_methods" ADD CONSTRAINT "shipping_methods_CBydk5MH1Moa_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("organization_id") ON DELETE CASCADE;