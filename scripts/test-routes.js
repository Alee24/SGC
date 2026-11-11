const { chromium } = require("@playwright/test");

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const errors = [];
  page.on("pageerror", err => errors.push({ type: "pageerror", msg: err.message, stack: err.stack }));
  page.on("console", msg => {
    if (msg.type() === "error") errors.push({ type: "console.error", text: msg.text() });
  });

  const routes = [
    "/", "/about", "/about/history", "/about/trustees", "/about/management", "/about/administration", "/about/principal",
    "/academics", "/academics/curriculum", "/academics/departments", "/academics/performance", "/academics/kuccps",
    "/admissions", "/admissions/form-one", "/admissions/senior-school", "/admissions/fees-aid",
    "/careers-tenders", "/contact", "/giving", "/giving/events", "/giving/projects", "/news",
    "/student-life", "/student-life/clubs", "/student-life/facilities", "/student-life/gallery", "/student-life/sports",
    "/principal", "/our-history", "/board-of-trustees", "/board-of-management", "/administration",
    "/school-performance", "/curriculum-assessment", "/cbc-transition", "/students-admissions",
    "/support-a-cause", "/placement-kuccps", "/tenders", "/job-vacancy", "/contact-1", "/students-life"
  ];

  for (const r of routes) {
    try {
      const res = await page.goto("http://localhost:3001" + r, { waitUntil: "networkidle" });
      const text = await page.content();
      const hasError = text.includes("Portal Temporarily Offline") || text.includes("Internal Server Error");
      console.log(`${r} -> ${res.status()} ${hasError ? "[ERROR DISPLAYED!]" : "[OK]"}`);
    } catch (e) {
      console.log(`${r} -> FAILED: ${e.message}`);
    }
  }

  if (errors.length) {
    console.log("Recorded errors:", JSON.stringify(errors, null, 2));
  } else {
    console.log("No console or page errors recorded across all routes!");
  }
  await browser.close();
})();

