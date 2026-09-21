import { EmailLayout } from "@/emails/components/email-layout";
import { getEmailTranslator } from "@/emails/translator";
import { resolvePublicUrl } from "@/lib/resolve-public-url";
import type { Locale } from "next-intl";
import { Button, Heading, Img, Section, Text } from "react-email";

export interface NewsletterConfirmationProps {
  appName: string;
  confirmUrl: string;
  locale: Locale;
  unsubscribeUrl?: string;
}

export default async function NewsletterConfirmation({
  appName,
  confirmUrl,
  locale,
  unsubscribeUrl,
}: NewsletterConfirmationProps) {
  const t = await getEmailTranslator(locale, "newsletter-confirmation");

  return (
    <EmailLayout
      locale={locale}
      preview={t("preview", { appName })}
      unsubscribeUrl={unsubscribeUrl}
    >
      <Section className="mb-4">
        <Img
          alt="Logo"
          className="mx-auto mb-4 block"
          src={resolvePublicUrl("/public/images/app.png")}
          width={48}
        />

        <Heading
          as="h1"
          className="m-0 text-center font-medium font-sans text-3xl text-card-foreground"
        >
          {t("title")}
        </Heading>
      </Section>

      <Text className="fort-normal mx-auto mt-0 mb-8 max-w-96 text-center font-sans text-base text-card-foreground/70">
        {t.rich("description", {
          appName,
          br: () => <br />,
        })}
      </Text>

      <Section className="mb-6 text-center">
        <Button
          className="inline-block rounded-2xl bg-primary px-8 py-4 text-center font-medium font-sans text-base text-primary-foreground"
          href={confirmUrl}
        >
          {t("confirm")}
        </Button>
      </Section>

      <Text className="mx-auto mt-8 mb-0 max-w-100 text-center font-sans text-muted-foreground text-sm">
        {t("confirmDescription")}
      </Text>
    </EmailLayout>
  );
}

NewsletterConfirmation.PreviewProps = {
  appName: "AletheiaSpire",
  confirmUrl: "#",
  locale: "en",
  unsubscribeUrl: "#",
} satisfies NewsletterConfirmationProps;
