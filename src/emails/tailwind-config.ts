import type { TailwindConfig } from "react-email";

export const emailTailwindConfig: TailwindConfig = {
  theme: {
    extend: {
      borderRadius: {
        "2xl": "18px",
        "3xl": "22px",
        "4xl": "26px",
        lg: "10px",
        md: "8px",
        sm: "6px",
        xl: "14px",
      },

      colors: {
        accent: {
          DEFAULT: "#e8eded",
          foreground: "#161b1d",
        },
        background: "#ffffff",
        border: "#dfe4e5",
        card: {
          DEFAULT: "#ffffff",
          foreground: "#090b0c",
        },
        chart: {
          1: "#161b1d",
          2: "#4b585b",
          3: "#67787c",
          4: "#8f9b9e",
          5: "#b8c1c3",
        },
        destructive: {
          DEFAULT: "#dc2626",
          foreground: "#ffffff",
        },
        foreground: "#090b0c",
        input: "#dfe4e5",
        muted: {
          DEFAULT: "#f5f7f7",
          foreground: "#67787c",
        },
        popover: {
          DEFAULT: "#ffffff",
          foreground: "#090b0c",
        },
        primary: {
          DEFAULT: "#161b1d",
          foreground: "#f9fbfb",
        },
        ring: "#8f9b9e",
        secondary: {
          DEFAULT: "#eef1f1",
          foreground: "#161b1d",
        },
      },
      fontFamily: {
        sans: [
          "Geist",
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },
      fontSize: {
        "2xl": [
          "1.5rem",
          {
            lineHeight: "2rem",
          },
        ],
        "3xl": [
          "1.875rem",
          {
            lineHeight: "2.25rem",
          },
        ],
        base: [
          "1rem",
          {
            lineHeight: "1.5rem",
          },
        ],
        lg: [
          "1.125rem",
          {
            lineHeight: "1.75rem",
          },
        ],
        sm: [
          "0.875rem",
          {
            lineHeight: "1.25rem",
          },
        ],
        xl: [
          "1.25rem",
          {
            lineHeight: "1.75rem",
          },
        ],
        xs: [
          "0.75rem",
          {
            lineHeight: "1rem",
          },
        ],
      },
      fontWeight: {
        bold: "700",
        medium: "500",
        normal: "400",
        semibold: "600",
      },
      letterSpacing: {
        normal: "0em",
        tight: "-0.015em",
        wide: "0.025em",
      },
    },
  },
};
