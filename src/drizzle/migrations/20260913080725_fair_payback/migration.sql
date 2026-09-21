CREATE TYPE "newsletter_subscribers_locale" AS ENUM('en', 'fr');--> statement-breakpoint
CREATE TYPE "newsletter_subscribers_source" AS ENUM('resend');--> statement-breakpoint
CREATE TYPE "newsletter_subscribers_status" AS ENUM('pending', 'subscribed', 'unsubscribed');--> statement-breakpoint
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
