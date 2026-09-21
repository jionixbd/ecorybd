"use client";

import { initializePostHog } from "@/lib/posthog/client";
import { useEffect } from "react";

export const PostHogProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  useEffect(() => {
    initializePostHog();
  }, []);

  return children;
};
