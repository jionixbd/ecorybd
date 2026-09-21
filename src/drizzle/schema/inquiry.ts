import {
  pgEnum,
  snakeCase,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const inquiryStatusEnum = pgEnum("inquiry_status", [
  "new",
  "reviewing",
  "proposal_sent",
  "negotiation",
  "accepted",
  "in_progress",
  "completed",
  "cancelled",
]);

export const inquiriesServiceEnum = pgEnum("inquiries_service", [
  "frontend",
  "backend",
  "fullstack",
  "ui_ux_design",
  "consulting",
  "maintenance",
  "ai",
]);

export const inquiriesProjectEnum = pgEnum("inquiries_project", [
  "saas",
  "landing_page",
  "business_website",
  "e-commerce",
  "portfolio",
  "blog",
  "web_application",
  "api_development",
  "other",
]);

export const inquiriesBudgetEnum = pgEnum("inquiries_budget", [
  "under_5k",
  "5k_to_10k",
  "10k_to_25k",
  "25k_to_50k",
  "50k_to_100k",
  "above_100k",
  "to_be_discussed",
]);

export const inquiriesTimelineEnum = pgEnum("inquiries_timeline", [
  "urgent_1_month",
  "1_to_3_months",
  "3_to_6_months",
  "6_plus_months",
  "flexible",
]);

export const inquiries = snakeCase.table("inquiries", {
  budget: inquiriesBudgetEnum().notNull(),
  companyName: varchar( { length: 128 }),
  companySize: varchar( { length: 64 }),
  companyWebsite: varchar( { length: 256 }),
  createdAt: timestamp( { withTimezone: true })
    .defaultNow()
    .notNull(),
  email: varchar( { length: 64 }).notNull(),
  inquiryId: uuid().defaultRandom().primaryKey(),
  message: text().notNull(),
  name: varchar( { length: 64 }).notNull(),
  phone: varchar( { length: 32 }),
  project: inquiriesProjectEnum().notNull(),
  service: inquiriesServiceEnum().notNull(),
  status: inquiryStatusEnum().default("new").notNull(),
  timeline: inquiriesTimelineEnum().notNull(),
  updatedAt: timestamp( { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export type Inquiry = typeof inquiries.$inferSelect;
export type InquiryStatus = (typeof inquiries.status.enumValues)[number];
export type InquiryService = (typeof inquiries.service.enumValues)[number];
export type InquiryProject = (typeof inquiries.project.enumValues)[number];
export type InquiryBudget = (typeof inquiries.budget.enumValues)[number];
export type InquiryTimeline = (typeof inquiries.timeline.enumValues)[number];
