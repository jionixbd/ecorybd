CREATE TABLE "memberships" (
	"clerk_membership_id" varchar(64) NOT NULL CONSTRAINT "unq_memberships_clerk_membership_id" UNIQUE,
	"membership_id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"organization_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	CONSTRAINT "unq_memberships_user_id_organization_id" UNIQUE("user_id","organization_id")
);
--> statement-breakpoint
ALTER TABLE "memberships" ADD CONSTRAINT "memberships_organization_id_organizations_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("organization_id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "memberships" ADD CONSTRAINT "memberships_user_id_users_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE;