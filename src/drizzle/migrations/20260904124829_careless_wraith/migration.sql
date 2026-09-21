CREATE TABLE "organizations" (
	"clerk_organization_id" varchar(32) NOT NULL CONSTRAINT "unq_organizations_clerk_organization_id" UNIQUE,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"logo" varchar(2048),
	"name" varchar(255) NOT NULL,
	"organization_id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"slug" varchar(255) NOT NULL CONSTRAINT "unq_organizations_slug" UNIQUE,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
DROP INDEX "idx_users_clerk_user_id";