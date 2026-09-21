CREATE TYPE "email_verification_status" AS ENUM('unverified', 'verified', 'failed', 'expired');--> statement-breakpoint
CREATE TABLE "users" (
	"avatar" varchar(255),
	"banned" boolean DEFAULT false NOT NULL,
	"clerk_user_id" varchar(32) NOT NULL CONSTRAINT "unq_users_clerk_user_id" UNIQUE,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"email" varchar(320) NOT NULL CONSTRAINT "unq_users_email" UNIQUE,
	"email_verification_status" "email_verification_status" DEFAULT 'unverified'::"email_verification_status",
	"first_name" varchar(64),
	"last_name" varchar(64),
	"locked" boolean DEFAULT false NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"user_id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"username" varchar(32) NOT NULL CONSTRAINT "unq_users_username" UNIQUE
);
--> statement-breakpoint
CREATE INDEX "idx_users_clerk_user_id" ON "users" ("clerk_user_id");