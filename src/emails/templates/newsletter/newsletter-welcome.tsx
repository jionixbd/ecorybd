import { EmailLayout } from "@/emails/components/email-layout";
import { getEmailTranslator } from "@/emails/translator";
import { resolvePublicUrl } from "@/lib/resolve-public-url";
import type { Locale } from "next-intl";
import { Button, Heading, Img, Section, Text } from "react-email";

export interface NewsletterWelcomeProps {
  actionUrl: string;
  appName: string;
  locale: Locale;
  unsubscribeUrl: string;
}

export default async function NewsletterWelcome({
  appName,
  actionUrl,
  locale,
  unsubscribeUrl,
}: NewsletterWelcomeProps) {
  const t = await getEmailTranslator(locale, "newsletter-welcome");

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

      <Text className="mx-auto mt-0 mb-8 max-w-96 text-center font-normal font-sans text-base text-card-foreground/70">
        {t.rich("description", {
          appName,
          br: () => <br />,
        })}
      </Text>

      {!!actionUrl && (
        <Section className="mb-6 text-center">
          <Button
            className="inline-block rounded-2xl bg-primary px-8 py-4 text-center font-medium font-sans text-base text-primary-foreground"
            href={actionUrl}
          >
            {t("action", { appName })}
          </Button>
        </Section>
      )}

      <Text className="mx-auto mt-8 mb-0 max-w-100 text-center font-sans text-muted-foreground text-sm">
        {t("note")}
      </Text>
    </EmailLayout>
  );
}

NewsletterWelcome.PreviewProps = {
  actionUrl: "#",
  appName: "AletheiaSpire",
  locale: "en",
  unsubscribeUrl: "#",
} satisfies NewsletterWelcomeProps;
