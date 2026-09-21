import type { Locale } from "next-intl";
import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Preview,
  Section,
  Tailwind,
} from "react-email";

interface EmailLayoutProps {
  children: React.ReactNode;
  locale: Locale;
  preview: string;
  unsubscribeUrl?: string;
}

import { EmailFont } from "@/emails/components/email-font";
import { EmailFooter } from "@/emails/components/email-footer";
import { EmailHeader } from "@/emails/components/email-header";
import { emailTailwindConfig } from "@/emails/tailwind-config";

export const EmailLayout = ({
  preview,
  unsubscribeUrl,
  children,
  locale,
}: EmailLayoutProps) => (
  <Html dir="ltr" lang={locale}>
    <Head>
      <meta content="text/html; charset=UTF-8" httpEquiv="Content-Type" />
      <meta content="width=device-width, initial-scale=1.0" name="viewport" />
      <meta content="light" name="color-scheme" />
      <meta content="light" name="supported-color-schemes" />
      <meta name="x-apple-disable-message-reformatting" />
      <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
      <meta
        content="telephone=no, date=no, address=no, email=no"
        name="format-detection"
      />

      <EmailFont />
    </Head>
    <Preview>{preview}</Preview>

    <Tailwind config={emailTailwindConfig}>
      <Body className="bg-background font-sans">
        <Container className="mx-auto rounded-2xl bg-muted p-4">
          <EmailHeader />

          <Section className="my-4 rounded-2xl bg-card px-8 py-12">
            {children}
          </Section>

          <Hr className="my-8 bg-border" />

          <EmailFooter unsubscribeUrl={unsubscribeUrl} />
        </Container>
      </Body>
    </Tailwind>
  </Html>
);
