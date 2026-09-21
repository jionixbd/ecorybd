import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config({
  override: true,
  path: ".env.test",
});

const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? "http://127.0.0.1:3000";

export default defineConfig({
  expect: {
    timeout: 10_000,
  },

  forbidOnly: !!process.env.CI,

  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        // HACK: `launchOptions.executablePath` do not need to defined. This is just temporary because `npx playwright install chromium` do not installing chromium
        launchOptions: {
          executablePath: process.env.CHROME_PATH || undefined,
        },
      },
    },
  ],

  reporter: process.env.CI ? "dot" : "html",
  testDir: "./tests/e2e",

  testMatch: "*.@(spec|e2e).?(c|m)[jt]s?(x)",

  timeout: 30_000,

  use: {
    actionTimeout: 10_000,
    baseURL,
    navigationTimeout: 15_000,
    screenshot: "only-on-failure",

    trace: "retain-on-failure",
    video: "retain-on-failure",

    viewport: {
      height: 720,
      width: 1280,
    },
  },

  webServer: {
    command: process.env.CI ? "npm run build && npm run start" : "npm run dev",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    url: baseURL,
  },
});
