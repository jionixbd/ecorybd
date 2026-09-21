import { resolvePublicUrl } from "@/lib/resolve-public-url";
import { Column, Img, Link, Row, Section, Text } from "react-email";

interface EmailFooterProps {
  unsubscribeUrl?: string;
}

export const EmailFooter = ({ unsubscribeUrl }: EmailFooterProps) => (
  <Section>
    <Row>
      <Column className="px-8 py-4 text-center">
        <Text className="fort-normal mx-auto mt-0 mb-4 max-w-96 text-center font-sans text-muted-foreground text-sm">
          A platform for aspiring developers to learn and grow.
        </Text>

        <Section className="mb-4">
          <Link
            className="inline-block px-2 align-middle"
            href="https://x.com/sizarcorpse"
          >
            <Img
              alt="X"
              className="block"
              src={resolvePublicUrl("/public/images/email/email-x-icon-bg.png")}
              width={32}
            />
          </Link>

          <Link
            className="inline-block px-2 align-middle"
            href="https://github.com/sizarcorpse"
          >
            <Img
              alt="X"
              className="block"
              src={resolvePublicUrl(
                "/public/images/email/email-github-icon-bg.png"
              )}
              width={32}
            />
          </Link>

          <Link className="inline-block px-2 align-middle" href="#">
            <Img
              alt="X"
              className="block"
              src={resolvePublicUrl(
                "/public/images/email/email-discord-icon-bg.png"
              )}
              width={32}
            />
          </Link>

          <Link
            className="inline-block px-2 align-middle"
            href="https://sizar.dev"
          >
            <Img
              alt="X"
              className="block"
              src={resolvePublicUrl(
                "/public/images/email/email-sizario-icon-bg.png"
              )}
              width={32}
            />
          </Link>
        </Section>

        <Text className="fort-normal mx-auto mt-0 mb-4 max-w-96 text-center font-sans text-muted-foreground text-xs">
          123 Market Street, Floor 1
          <br />
          Tech City, SC, 74102
        </Text>

        {!!unsubscribeUrl && (
          <Text className="fort-normal m-0 mx-auto max-w-96 text-center font-sans text-muted-foreground text-xs">
            <Link className="underline" href={unsubscribeUrl}>
              unsubscribe
            </Link>{" "}
            here.
          </Text>
        )}
      </Column>
    </Row>
  </Section>
);
