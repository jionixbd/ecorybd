import { unsubscribeNewsletterUseCase } from "@/features/newsletter/use-cases/subscription";
import { normalizeError } from "@/lib/error";

export async function GET(req: Request) {
  const token = new URL(req.url).searchParams.get("token");

  if (!token) {
    return new Response("Missing token", { status: 400 });
  }
  try {
    const { status } = await unsubscribeNewsletterUseCase({ token });

    return Response.redirect(
      new URL(`/newsletter/subscribed?status=${status}`, req.url)
    );
  } catch (error) {
    const normalizedError = normalizeError(error);

    if (normalizedError.code === "INVALID_TOKEN") {
      return Response.redirect(
        new URL("/newsletter/subscribed?status=invalid", req.url)
      );
    }

    throw normalizedError;
  }
}

// NOTE: RFC 8058 One-Click Unsubscribe
export async function POST(req: Request) {
  const token = new URL(req.url).searchParams.get("token");

  if (!token) {
    return new Response(null, { status: 400 });
  }

  try {
    await unsubscribeNewsletterUseCase({ token });
    return new Response(null, { status: 200 });
  } catch (error) {
    const normalizedError = normalizeError(error);

    console.error("RFC 8058 One-Click Unsubscribe Error:", error);

    if (
      normalizedError.code === "VALIDATION_ERROR" ||
      normalizedError.code === "INVALID_TOKEN"
    ) {
      return new Response(null, { status: 200 });
    }

    return new Response(null, { status: 500 });
  }
}
