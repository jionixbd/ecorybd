import { expect, test } from "@playwright/test";

test("loads landing page and displays title", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("h1")).toContainText("Aletheia Spire");
});
