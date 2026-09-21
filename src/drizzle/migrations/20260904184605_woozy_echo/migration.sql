ALTER TABLE "memberships" ADD COLUMN "role" varchar(64) DEFAULT 'org:member' NOT NULL;--> statement-breakpoint
ALTER TABLE "organizations" ALTER COLUMN "clerk_organization_id" SET DATA TYPE varchar(64) USING "clerk_organization_id"::varchar(64);--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "clerk_user_id" SET DATA TYPE varchar(64) USING "clerk_user_id"::varchar(64);