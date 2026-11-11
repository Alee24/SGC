const fs = require("fs");
const path = require("path");

const pagesDir = path.join(__dirname, "..", "site-crawl-starehegirlscentre.sc.ke-2026-11-11 (1)", "pages");
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith(".md"));

const uniqueFiles = [
  "1-Home_-_Starehe_Girls__Centre.md",
  "4-Story_of_Starehe_Girls_Centre_-_Starehe_.md",
  "5-Board_of_Trustees_-_Starehe_Girls__Centr.md",
  "6-Board_of_Management_-_Starehe_Girls__Cen.md",
  "7-Administration_-_Starehe_Girls__Centre.md",
  "8-Principal_-_Starehe_Girls__Centre.md",
  "9-Students_Life_-_Starehe_Girls__Centre.md",
  "10-School_Performance_-_Starehe_Girls__Cent.md",
  "11-Curriculum___Assessment_-_Starehe_Girls_.md",
  "12-Senior_School_Admission_-_Starehe_Girls_.md",
  "13-Students_Admissions_8_4_4_-_Starehe_Girl.md",
  "14-Support_a_Cause_-_Starehe_Girls__Centre.md",
  "15-Job_Vacancy_-_Starehe_Girls__Centre.md",
  "16-Placement_KUCCPS_-_Starehe_Girls__Centre.md",
  "17-Tenders_-_Starehe_Girls__Centre.md",
  "18-Contact_1_-_Starehe_Girls__Centre.md"
];

for (const f of uniqueFiles) {
  const content = fs.readFileSync(path.join(pagesDir, f), "utf-8");
  console.log(`\n=================== FILE: ${f} ===================`);
  // print non-nav body lines
  const lines = content.split("\n").filter(l => !l.startsWith("* ") && l.trim().length > 0);
  console.log(lines.slice(0, 30).join("\n"));
}

