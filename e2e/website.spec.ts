import { test, expect } from "@playwright/test";

test.describe("Starehe Girls' Centre Website Verification", () => {
  test("Homepage loads with institutional branding, motto and statistics", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Starehe Girls' Centre/);

    // Verify School Name & Motto in banner or navigation
    await expect(page.locator("text=Elimu Yetu, Nguvu Yetu").first()).toBeVisible();
    await expect(page.locator("text=National Girls' High School").first()).toBeVisible();

    // Verify Core Statistics
    await expect(page.locator("text=800+").first()).toBeVisible();
    await expect(page.locator("text=8.90 (B)").first()).toBeVisible();
    await expect(page.locator("text=95%").first()).toBeVisible();
  });

  test("Admissions Suite & Form 1 Blue Form are accessible and complete", async ({ page }) => {
    await page.goto("/admissions/form-one");
    await expect(page.locator("h1")).toContainText("Form 1 Admission & The Blue Form");

    // Critical Integrity fraud warning check
    await expect(page.locator("text=CRITICAL NOTICE TO ALL PARENTS & GUARDIANS").first()).toBeVisible();
    await expect(page.locator("text=NEVER SOLD").first()).toBeVisible();
  });

  test("Academic Performance page displays official 2025 KCSE data", async ({ page }) => {
    await page.goto("/academics/performance");
    await expect(page.locator("h1")).toContainText("School Performance & Positive Deviations");

    // Verify 2025 KCSE Mean Score & Operation Plus 5
    await expect(page.locator("text=8.90 (B)").first()).toBeVisible();
    await expect(page.locator("text=Operation Plus 5").first()).toBeVisible();
  });

  test("Board of Trustees and Administration leadership pages load properly", async ({ page }) => {
    await page.goto("/about/trustees");
    await expect(page.locator("h1")).toContainText("The Board of Trustees");
    await expect(page.locator("text=Mrs. Eunice Mathu").first()).toBeVisible();
    await expect(page.locator("text=Dr. Manu Chandaria").first()).toBeVisible();

    await page.goto("/about/administration");
    await expect(page.locator("h1")).toContainText("School Leadership & Administration");
    await expect(page.locator("text=Sister Jane Soita").first()).toBeVisible();
    await expect(page.locator("text=Beatrice Shirao").first()).toBeVisible();
  });

  test("Contact form validates inputs and displays success state", async ({ page }) => {
    await page.goto("/contact");
    await expect(page.locator("h1")).toContainText("Contact Starehe Girls' Centre");

    // Fill form
    await page.fill('input[type="text"]', "Jane Doe");
    await page.fill('input[type="email"]', "jane.doe@example.com");
    await page.fill('input[type="tel"]', "0712345678");
    await page.fill("textarea", "Inquiring about Form 1 admissions requirements.");

    // Submit form
    await page.click('button[type="submit"]');

    // Verify success feedback
    await expect(page.locator("text=Message Received Successfully!")).toBeVisible({ timeout: 5000 });
  });

  test("Photo Gallery and Lightbox modal operate seamlessly", async ({ page }) => {
    await page.goto("/student-life/gallery");
    await expect(page.locator("h1")).toContainText("Campus Photo Gallery");

    // Click first photo card to open lightbox
    const firstCard = page.locator(".cursor-pointer").first();
    await firstCard.click();

    // Verify dialog modal is visible
    const modal = page.locator('div[role="dialog"]');
    await expect(modal).toBeVisible();

    // Close lightbox
    await modal.locator('button[aria-label="Close image lightbox"]').click();
    await expect(modal).not.toBeVisible();
  });
});
