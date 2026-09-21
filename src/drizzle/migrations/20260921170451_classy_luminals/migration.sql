CREATE TYPE "inquiry_priority" AS ENUM('low', 'medium', 'high', 'urgent');--> statement-breakpoint
CREATE TYPE "inquiry_status" AS ENUM('pending', 'in_review', 'resolved', 'closed');--> statement-breakpoint
CREATE TYPE "inquiry_type" AS ENUM('general', 'product_question', 'order_issue', 'return_request', 'wholesale');--> statement-breakpoint
CREATE TYPE "newsletter_subscribers_locale" AS ENUM('en', 'fr');--> statement-breakpoint
CREATE TYPE "newsletter_subscribers_source" AS ENUM('resend');--> statement-breakpoint
CREATE TYPE "newsletter_subscribers_status" AS ENUM('pending', 'subscribed', 'unsubscribed');--> statement-breakpoint
CREATE TABLE "inquiries" (
	"admin_notes" jsonb,
	"assigned_to" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"email" varchar(320),
	"inquiry_id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"message" jsonb,
	"name" varchar(64) NOT NULL,
	"order_id" uuid,
	"phone" varchar(32),
	"priority" "inquiry_priority" DEFAULT 'medium'::"inquiry_priority" NOT NULL,
	"product_id" uuid,
	"status" "inquiry_status" DEFAULT 'pending'::"inquiry_status" NOT NULL,
	"subject" varchar(128) NOT NULL,
	"temp_message" text,
	"type" "inquiry_type" DEFAULT 'general'::"inquiry_type" NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"user_id" uuid
);
--> statement-breakpoint
CREATE TABLE "memberships" (
	"clerk_membership_id" varchar(64) NOT NULL CONSTRAINT "unq_memberships_clerk_membership_id" UNIQUE,
	"membership_id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"organization_id" uuid NOT NULL,
	"role" varchar(64) DEFAULT 'org:member' NOT NULL,
	"user_id" uuid NOT NULL,
	CONSTRAINT "unq_memberships_user_id_organization_id" UNIQUE("user_id","organization_id")
);
--> statement-breakpoint
CREATE TABLE "newsletter_subscribers" (
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"email" varchar(255) NOT NULL CONSTRAINT "unq_newsletter_subscribers_email" UNIQUE,
	"first_name" varchar(55),
	"last_name" varchar(55),
	"locale" "newsletter_subscribers_locale" DEFAULT 'en'::"newsletter_subscribers_locale" NOT NULL,
	"resend_contact_id" varchar(55),
	"source" "newsletter_subscribers_source" DEFAULT 'resend'::"newsletter_subscribers_source" NOT NULL,
	"status" "newsletter_subscribers_status" DEFAULT 'pending'::"newsletter_subscribers_status" NOT NULL,
	"subscribed_at" timestamp with time zone,
	"subscriber_id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"unsubscribed_at" timestamp with time zone,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "organizations" (
	"clerk_organization_id" varchar(64) NOT NULL CONSTRAINT "unq_organizations_clerk_organization_id" UNIQUE,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"logo" varchar(2048),
	"name" varchar(255) NOT NULL,
	"organization_id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"slug" varchar(255) NOT NULL CONSTRAINT "unq_organizations_slug" UNIQUE,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"avatar" varchar(2048),
	"banned" boolean DEFAULT false NOT NULL,
	"clerk_user_id" varchar(64) NOT NULL CONSTRAINT "unq_users_clerk_user_id" UNIQUE,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"email" varchar(320) NOT NULL CONSTRAINT "unq_users_email" UNIQUE,
	"first_name" varchar(256),
	"last_name" varchar(256),
	"locked" boolean DEFAULT false NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"user_id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"username" varchar(64) NOT NULL CONSTRAINT "unq_users_username" UNIQUE
);
--> statement-breakpoint
CREATE INDEX "idx_inquiries_user_id" ON "inquiries" ("user_id");--> statement-breakpoint
CREATE INDEX "idx_inquiries_product_id" ON "inquiries" ("product_id");--> statement-breakpoint
CREATE INDEX "idx_inquiries_order_id" ON "inquiries" ("order_id");--> statement-breakpoint
CREATE INDEX "idx_inquiries_assign_to" ON "inquiries" ("assigned_to");--> statement-breakpoint
ALTER TABLE "inquiries" ADD CONSTRAINT "inquiries_assigned_to_users_user_id_fkey" FOREIGN KEY ("assigned_to") REFERENCES "users"("user_id") ON DELETE SET NULL;--> statement-breakpoint
ALTER TABLE "inquiries" ADD CONSTRAINT "inquiries_user_id_users_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE SET NULL;--> statement-breakpoint
ALTER TABLE "memberships" ADD CONSTRAINT "memberships_organization_id_organizations_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("organization_id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "memberships" ADD CONSTRAINT "memberships_user_id_users_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE;