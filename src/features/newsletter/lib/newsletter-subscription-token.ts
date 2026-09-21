import { env } from "@/lib/env";
import { InvalidTokenError } from "@/lib/error";
import { jwtVerify, SignJWT } from "jose";

const secret = new TextEncoder().encode(
  env.NEWSLETTER_SUBSCRIPTION_TOKEN_SECRET
);

type Purpose = "confirm" | "unsubscribe";

export async function createSubscriptionToken(
  subscriptionId: string,
  purpose: Purpose
) {
  const expiresIn = purpose === "confirm" ? "48h" : "2y";

  return await new SignJWT({ purpose, subscriptionId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(secret);
}

export async function verifySubscriptionToken(
  token: string,
  expectedPurpose: Purpose
): Promise<string> {
  const { payload } = await jwtVerify(token, secret);

  if (payload.purpose !== expectedPurpose) {
    throw new InvalidTokenError("Token purpose mismatch.");
  }

  return payload.subscriptionId as string;
}
