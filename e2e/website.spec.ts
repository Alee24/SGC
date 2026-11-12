import fs from "fs";
import path from "path";
import { test, expect } from "@playwright/test";

test.describe("Starehe Girls' Centre Website Verification", () => {
  test("Homepage loads with institutional branding, motto and statistics", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Starehe Girls' Centre/);

    // Verify School Name & Motto in banner or navigation, and confirm subtitle removal
    await expect(page.locator("header").first()).toContainText("Starehe Girls' Centre");
    await expect(page.locator("header").first()).not.toContainText("National Girls' High School");
    await expect(page).not.toHaveTitle(/National Girls' High School/);
    await expect(page.locator("text=Elimu Yetu, Nguvu Yetu").first()).toBeVisible();
    await expect(page.locator("body")).not.toContainText("“Elimu Yetu, Nguvu Yetu”");
    await expect(page.locator("body")).not.toContainText('"Elimu Yetu, Nguvu Yetu"');

    // Verify Core Statistics
    await expect(page.locator("text=800+").first()).toBeVisible();
    await expect(page.locator("text=8.90 (B)").first()).toBeVisible();
    await expect(page.locator("text=95%").first()).toBeVisible();
  });

  test("Board of Management (BOM) page loads with leadership oversight and no errors", async ({ page }) => {
    const response = await page.goto("/about/management");
    expect(response?.status()).toBe(200);

    await expect(page.locator("h1")).toContainText("The Board of Management (BOM)");
    await expect(page.locator("text=Prof. Mary Getui").first()).toBeVisible();
    await expect(page.locator("text=Basic Education Act 2013").first()).toBeVisible();
    await expect(page.locator("text=Internal Server Error")).not.toBeVisible();
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

    // Verify real backend persistence & reference code feedback
    await expect(page.locator("text=Message Received Successfully!")).toBeVisible({ timeout: 5000 });
    await expect(page.locator("text=Reference: SGC-INQ-")).toBeVisible();
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

  test("All Institutional Routes respond with HTTP 200 without crashes", async ({ page }) => {
    const routes = [
      "/about",
      "/about/history",
      "/about/management",
      "/about/trustees",
      "/about/administration",
      "/academics",
      "/academics/curriculum",
      "/academics/departments",
      "/academics/kuccps",
      "/academics/performance",
      "/admissions",
      "/admissions/fees-aid",
      "/admissions/form-one",
      "/admissions/senior-school",
      "/careers-tenders",
      "/giving",
      "/giving/events",
      "/giving/projects",
      "/news",
      "/student-life",
      "/student-life/clubs",
      "/student-life/facilities",
      "/student-life/sports",
    ];

    for (const route of routes) {
      const response = await page.goto(route, { waitUntil: "domcontentloaded" });
      expect(response?.status()).toBe(200);
      await expect(page.locator("text=Internal Server Error")).not.toBeVisible();
    }
  });

  test("Desktop main menu submenus stay open on hover & click and navigate cleanly", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");

    // 1. Hover over "About Us" trigger
    const aboutTrigger = page.locator("nav button", { hasText: "About Us" });
    await aboutTrigger.hover();

    const historyLink = page.locator('nav [role="menuitem"]', { hasText: "Story & Heritage" });
    await expect(historyLink).toBeVisible();

    // Move mouse slowly across seam onto submenu item to verify zero disappear gap
    const box = await historyLink.boundingBox();
    expect(box).not.toBeNull();
    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 10 });
    }
    await expect(historyLink).toBeVisible();
    await historyLink.click();
    await expect(page).toHaveURL(/\/about\/history/);

    // 2. Click-to-open "Academics" menu and click "KCSE Performance"
    const academicsTrigger = page.locator("nav button", { hasText: "Academics" });
    await academicsTrigger.click();
    const kcseLink = page.locator('nav [role="menuitem"]', { hasText: "KCSE Performance" });
    await expect(kcseLink).toBeVisible();
    await kcseLink.click();
    await expect(page).toHaveURL(/\/academics\/performance/);
  });

  test("Admin portal login works with configured admin credentials", async ({ page }) => {
    let adminEmail = process.env.ADMIN_SEED_EMAIL || "";
    let adminPass = process.env.ADMIN_SEED_PASSWORD || "";

    const envLocalPath = path.join(process.cwd(), ".env.local");
    if ((!adminEmail || !adminPass) && fs.existsSync(envLocalPath)) {
      const envText = fs.readFileSync(envLocalPath, "utf8");
      for (const line of envText.split(/\r?\n/)) {
        const [k, ...rest] = line.split("=");
        const val = rest.join("=").trim();
        if (k?.trim() === "ADMIN_SEED_EMAIL" && !adminEmail) adminEmail = val;
        if (k?.trim() === "ADMIN_SEED_PASSWORD" && !adminPass) adminPass = val;
      }
    }

    test.skip(!adminEmail || !adminPass, "Admin credentials not configured in env");

    await page.goto("/admin/login");
    await page.fill("#username", adminEmail);
    await page.fill("#password", adminPass);
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL(/\/admin$/, { timeout: 10000 });
    await expect(page.locator("body")).not.toContainText("Sign-in failed");

    // Verify Form & Contact Submissions log tab loads logged entries cleanly
    await page.getByRole("button", { name: /Form & Contact Submissions/i }).click();
    await expect(page.locator("text=jane.doe@example.com").first()).toBeVisible({ timeout: 5000 });
  });

  test("Layout spans 90% width on desktop with zero horizontal overflow or clipped buttons across viewports", async ({ page }) => {
    const viewports = [
      { width: 375, height: 812 },
      { width: 768, height: 1024 },
      { width: 1024, height: 768 },
      { width: 1280, height: 800 },
      { width: 1440, height: 900 },
    ];

    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.waitForSelector("header");
    await expect(page.locator("header")).not.toContainText("Careers & Tenders");
    await expect(page.locator('a[href="/careers-tenders"]', { hasText: "Careers & Tenders" }).first()).toBeVisible();

    for (const vp of viewports) {
      await page.setViewportSize(vp);
      await page.waitForTimeout(150);

      const audit = await page.evaluate(() => {
        const vw = window.innerWidth;
        const docScrollWidth = document.documentElement.scrollWidth;
        const headerEl = document.querySelector("header > div");
        const headerContainerWidth = headerEl ? headerEl.getBoundingClientRect().width : 0;

        const clippedItems: string[] = [];
        const visibleBoxes: { label: string; left: number; right: number }[] = [];
        const controls = document.querySelectorAll("header a, header button");
        controls.forEach((el) => {
          const rect = el.getBoundingClientRect();
          if (rect.width === 0 || rect.height === 0) return;
          const label = el.textContent?.trim() || "icon";
          if (rect.left < -1 || rect.right > vw + 1) {
            clippedItems.push(`${label}: left=${Math.round(rect.left)}, right=${Math.round(rect.right)}, vw=${vw}`);
          }
          visibleBoxes.push({ label, left: rect.left, right: rect.right });
        });

        const overlaps: string[] = [];
        for (let i = 0; i < visibleBoxes.length - 1; i++) {
          const curr = visibleBoxes[i];
          const next = visibleBoxes[i + 1];
          if (curr.right > next.left + 1) {
            overlaps.push(`${curr.label} (right=${Math.round(curr.right)}) overlaps ${next.label} (left=${Math.round(next.left)})`);
          }
        }

        return { vw, docScrollWidth, headerContainerWidth, clippedItems, overlaps };
      });

      expect(audit.docScrollWidth).toBeLessThanOrEqual(audit.vw);
      expect(audit.clippedItems).toEqual([]);
      expect(audit.overlaps).toEqual([]);
      if (vp.width >= 1280) {
        const ratio = audit.headerContainerWidth / audit.vw;
        expect(ratio).toBeGreaterThanOrEqual(0.88);
        expect(ratio).toBeLessThanOrEqual(0.92);
      }
    }
  });

  test("Editorial page content spreads across full width below the Campus Help Desk sidebar", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/about/history", { waitUntil: "domcontentloaded" });
    await page.waitForSelector("aside");

    const layoutAudit = await page.evaluate(() => {
      const aside = document.querySelector("aside");
      const main = document.querySelector("main.editorial-main");
      if (!aside || !main) return null;

      const asideRect = aside.getBoundingClientRect();
      const mainRect = main.getBoundingClientRect();

      // Check sections inside main whose top is below aside.bottom
      const sectionsBelowSidebar: number[] = [];
      main.querySelectorAll("section").forEach((sec) => {
        const r = sec.getBoundingClientRect();
        if (r.top >= asideRect.bottom) {
          sectionsBelowSidebar.push(r.width / mainRect.width);
        }
      });

      return {
        mainWidth: mainRect.width,
        asideBottom: asideRect.bottom,
        sectionsBelowSidebar,
      };
    });

    expect(layoutAudit).not.toBeNull();
    expect(layoutAudit!.sectionsBelowSidebar.length).toBeGreaterThan(0);
    for (const widthRatio of layoutAudit!.sectionsBelowSidebar) {
      expect(widthRatio).toBeGreaterThan(0.95);
    }

    // Verify authentic Heritage Timeline cards render without placeholder text or overflow
    await expect(page.locator("text=Conception of the Dream")).toBeVisible();
    await expect(page.getByText("February 12, 2005", { exact: true })).toBeVisible();
    await expect(page.locator("body")).not.toContainText("Lorem");
    await expect(page.locator("body")).not.toContainText("Mario");

    await page.setViewportSize({ width: 375, height: 812 });
    const mobileOverflow = await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth);
    expect(mobileOverflow).toBe(true);
  });

  test("Board of Trustees and Board of Management render hierarchy chart with centered circular portraits", async ({ page }) => {
    const pages = [
      {
        url: "/about/trustees",
        sectionLabel: "Distinguished Trustees",
        chair: "Mrs. Eunice Mathu",
        clickMember: "Dr. Manu Chandaria, OBE, EBS",
        expectedBioSnippet: "55-acre Limuru Girls",
      },
      {
        url: "/about/management",
        sectionLabel: "Board of Management Members",
        chair: "Prof. Mary Getui",
        clickMember: "Sister Jane Soita",
        expectedBioSnippet: "Executive custodian of school strategy",
      },
    ];

    for (const p of pages) {
      await page.setViewportSize({ width: 1280, height: 800 });
      await page.goto(p.url, { waitUntil: "domcontentloaded" });

      const section = page.locator(`section[aria-label="${p.sectionLabel}"]`);
      await expect(section).toBeVisible();

      // Verify centered circular images inside hierarchy nodes
      const imgs = section.locator("img");
      const imgCount = await imgs.count();
      expect(imgCount).toBeGreaterThanOrEqual(6);
      const firstImgClass = await imgs.first().getAttribute("class");
      expect(firstImgClass).toContain("object-center");

      // Click another member node and verify the bio panel updates
      await section.getByRole("button", { name: new RegExp(p.clickMember) }).click();
      await expect(section).toContainText(p.expectedBioSnippet);

      // Verify no horizontal overflow on desktop and mobile
      const desktopNoOverflow = await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth);
      expect(desktopNoOverflow).toBe(true);

      await page.setViewportSize({ width: 375, height: 812 });
      const mobileNoOverflow = await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth);
      expect(mobileNoOverflow).toBe(true);
    }
  });
});
