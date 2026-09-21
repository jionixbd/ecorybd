CREATE TYPE "inquiries_budget" AS ENUM('under_5k', '5k_to_10k', '10k_to_25k', '25k_to_50k', '50k_to_100k', 'above_100k', 'to_be_discussed');--> statement-breakpoint
CREATE TYPE "inquiries_project" AS ENUM('saas', 'landing_page', 'business_website', 'e-commerce', 'portfolio', 'blog', 'web_application', 'api_development', 'other');--> statement-breakpoint
CREATE TYPE "inquiries_service" AS ENUM('frontend', 'backend', 'fullstack', 'ui_ux_design', 'consulting', 'maintenance', 'ai');--> statement-breakpoint
CREATE TYPE "inquiries_timeline" AS ENUM('urgent_1_month', '1_to_3_months', '3_to_6_months', '6_plus_months', 'flexible');--> statement-breakpoint
CREATE TYPE "inquiry_status" AS ENUM('new', 'reviewing', 'proposal_sent', 'negotiation', 'accepted', 'in_progress', 'completed', 'cancelled');--> statement-breakpoint
CREATE TABLE "inquiries" (
	"budget" "inquiries_budget" NOT NULL,
	"company_name" varchar(128),
	"company_size" varchar(64),
	"company_website" varchar(256),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"email" varchar(64) NOT NULL,
	"inquiry_id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"message" text NOT NULL,
	"name" varchar(64) NOT NULL,
	"phone" varchar(32),
	"project" "inquiries_project" NOT NULL,
	"service" "inquiries_service" NOT NULL,
	"status" "inquiry_status" DEFAULT 'new'::"inquiry_status" NOT NULL,
	"timeline" "inquiries_timeline" NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
