ALTER TABLE "users" DROP COLUMN "email_verification_status";--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "avatar" SET DATA TYPE varchar(2048) USING "avatar"::varchar(2048);--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "first_name" SET DATA TYPE varchar(256) USING "first_name"::varchar(256);--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "last_name" SET DATA TYPE varchar(256) USING "last_name"::varchar(256);--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "username" SET DATA TYPE varchar(64) USING "username"::varchar(64);--> statement-breakpoint
DROP TYPE "email_verification_status";