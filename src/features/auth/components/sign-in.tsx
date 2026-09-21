import { SignIn as ClerkSignIn } from "@clerk/nextjs";
import type { ComponentProps } from "react";

export const SignIn = (props: ComponentProps<typeof ClerkSignIn>) => (
  <ClerkSignIn {...props} />
);
