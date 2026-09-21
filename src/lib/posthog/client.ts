"use client";

import { env } from "@/lib/env";
import { getBaseUrl } from "@/lib/get-base-url";
import { posthogEnabled } from "@/lib/posthog/enabled";
import posthog from "posthog-js";

let initialized = false;

export function initializePostHog() {
  if (initialized) {
    return;
  }

  if (!posthogEnabled) {
    return;
  }

  if (
    !(env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN && env.NEXT_PUBLIC_POSTHOG_HOST)
  ) {
    return;
  }

  posthog.init(env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN, {
    api_host: `${getBaseUrl()}/ingest`,
    autocapture: false,

    capture_dead_clicks: false,
    capture_pageleave: true,

    capture_pageview: false,
    capture_performance: false,

    defaults: "2026-05-30",
    disable_cookie: true,
    disable_persistence: true,

    disable_session_recording: true,
    mask_all_element_attributes: true,

    mask_all_text: true,

    person_profiles: "identified_only",
    ui_host: env.NEXT_PUBLIC_POSTHOG_HOST,
  });

  initialized = true;
}
