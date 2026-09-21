import { SignUp as ClerkSignUp } from "@clerk/nextjs";
import type { ComponentProps } from "react";

export const SignUp = (props: ComponentProps<typeof ClerkSignUp>) => (
  <ClerkSignUp {...props} />
);
