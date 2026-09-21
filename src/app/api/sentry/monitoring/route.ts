import type { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const envelope = await req.text();

    if (!envelope) {
      return Response.json({ error: "Empty Sentry envelope" }, { status: 400 });
    }

    const newlineIndex = envelope.indexOf("\n");

    if (newlineIndex === -1) {
      return Response.json(
        { error: "Invalid Sentry envelope format" },
        { status: 400 }
      );
    }

    const header = JSON.parse(envelope.slice(0, newlineIndex));

    if (!header.dsn || typeof header.dsn !== "string") {
      return Response.json(
        { error: "Missing DSN in Sentry envelope" },
        { status: 400 }
      );
    }

    const sentryHost = process.env.SENTRY_HOST;
    const projectId = process.env.SENTRY_PROJECT_ID;

    if (!(sentryHost && projectId)) {
      return Response.json(
        { error: "Incomplete Sentry configuration" },
        { status: 500 }
      );
    }

    const dsn = new URL(header.dsn);

    if (!["http:", "https:"].includes(dsn.protocol)) {
      return Response.json(
        { error: "Invalid Sentry DSN protocol" },
        { status: 400 }
      );
    }

    if (dsn.hostname !== sentryHost) {
      return Response.json({ error: "Invalid Sentry host" }, { status: 400 });
    }
    // biome-ignore lint/performance/useTopLevelRegex: ok
    const incomingProjectId = dsn.pathname.replace(/^\/+/, "");

    if (incomingProjectId !== projectId) {
      return Response.json(
        { error: "Invalid Sentry project ID" },
        { status: 400 }
      );
    }

    const response = await fetch(
      `https://${sentryHost}/api/${projectId}/envelope/`,
      {
        body: envelope,
        headers: {
          "Content-Type": "application/x-sentry-envelope",
        },
        method: "POST",
      }
    );

    return new Response(response.body, {
      headers: {
        "Content-Type": response.headers.get("Content-Type") ?? "text/plain",
      },
      status: response.status,
    });
  } catch (error) {
    console.error(" 🚀 Sentry tunnel failed:", error);

    return Response.json(
      {
        error: "Failed to forward Sentry event",
      },
      { status: 500 }
    );
  }
}

export function GET() {
  return Response.json({
    status: "healthy",
  });
}
