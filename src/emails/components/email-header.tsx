import { resolvePublicUrl } from "@/lib/resolve-public-url";
import { Column, Img, Row, Section, Text } from "react-email";

export const EmailHeader = () => (
  <Section className="px-8">
    <Row>
      <Column className="w-1/2 py-2 align-middle">
        <Row>
          <Column className="w-8 align-middle">
            <Img
              alt=""
              className="block"
              src={resolvePublicUrl("/public/images/app.png")}
              width={23}
            />
          </Column>
        </Row>
      </Column>
      <Column align="right" className="w-1/2 py-2 align-middle">
        <Text className="m-0 text-right font-medium font-sans text-base text-muted-foreground">
          <span className="text-fg-3">Aletheiaspire</span>
        </Text>
      </Column>
    </Row>
  </Section>
);
