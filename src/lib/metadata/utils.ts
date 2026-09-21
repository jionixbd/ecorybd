import type { Metadata } from "next";

export function logMetadata(metadata: Metadata, pageName: string) {
  if (process.env.NODE_ENV === "development") {
    console.group(`🔍 Metadata Debug: ${pageName}`);
    console.log("Title:", metadata.title);
    console.log("Description:", metadata.description);
    console.log("Open Graph:", metadata.openGraph);
    console.log("Twitter:", metadata.twitter);
    console.groupEnd();
  }
}
