import { confirmNewsletterSubscriptionUseCase } from "@/features/newsletter/use-cases/subscription";
import { normalizeError } from "@/lib/error";

export async function GET(req: Request) {
  const token = new URL(req.url).searchParams.get("token");

  if (!token) {
    return new Response("Missing token", { status: 400 });
  }
  try {
    const { status } = await confirmNewsletterSubscriptionUseCase({ token });

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
