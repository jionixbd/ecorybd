"use client";

import { Button } from "@/components/ui/button";
import { posthogEnabled } from "@/lib/posthog/enabled";
import { posthog } from "posthog-js";

export const PostHogCapture = ({ label }: { label: string }) => {
  const handleClick = () => {
    if (!posthogEnabled) {
      console.warn("PostHog is disabled.");
      return;
    }

    posthog.capture("posthog_test_event", {
      source: "PostHogCapture",
      test: true,
    });
  };

  return (
    <Button
      className="cursor-pointer font-extralight text-lg"
      onClick={handleClick}
      variant="link"
    >
      {label}
    </Button>
  );
};
