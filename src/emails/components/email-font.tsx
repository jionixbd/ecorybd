import { Font } from "react-email";

export const EmailFont = () => (
  <Font
    fallbackFontFamily="sans-serif"
    fontFamily="Geist"
    fontStyle="normal"
    fontWeight={400}
    webFont={{
      format: "woff2",
      url: "https://fonts.gstatic.com/s/geist/v5/gyBhhwUxId8gMGYQMKR3pzfaWI_RnOMIlJna-1Q.woff2",
    }}
  />
);
