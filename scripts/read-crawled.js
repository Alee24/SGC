const fs = require("fs");
const path = require("path");

const siteDataPath = path.join(__dirname, "..", "site-crawl-starehegirlscentre.sc.ke-2026-11-11 (1)", "site-data.json");
const data = JSON.parse(fs.readFileSync(siteDataPath, "utf-8"));

console.log("Keys in site-data.json:", Object.keys(data));
if (data.pages) {
  console.log("Total crawled pages:", data.pages.length);
  const uniqueUrls = new Set();
  data.pages.forEach(p => {
    const cleanUrl = p.url.split("#")[0];
    if (!uniqueUrls.has(cleanUrl)) {
      uniqueUrls.add(cleanUrl);
      console.log(`- ${cleanUrl} -> "${p.title}" (length: ${p.content ? p.content.length : 0})`);
    }
  });
}

