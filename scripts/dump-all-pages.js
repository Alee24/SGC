const fs = require("fs");
const path = require("path");

const pagesDir = path.join(__dirname, "..", "site-crawl-starehegirlscentre.sc.ke-2026-11-11 (1)", "pages");

const list = [
  { file: "5-Board_of_Trustees_-_Starehe_Girls__Centr.md", title: "Board of Trustees" },
  { file: "6-Board_of_Management_-_Starehe_Girls__Cen.md", title: "Board of Management" },
  { file: "7-Administration_-_Starehe_Girls__Centre.md", title: "Administration" },
  { file: "8-Principal_-_Starehe_Girls__Centre.md", title: "Principal" },
  { file: "9-Students_Life_-_Starehe_Girls__Centre.md", title: "Students Life" },
  { file: "10-School_Performance_-_Starehe_Girls__Cent.md", title: "School Performance" },
  { file: "11-Curriculum___Assessment_-_Starehe_Girls_.md", title: "Curriculum & Assessment" },
  { file: "12-Senior_School_Admission_-_Starehe_Girls_.md", title: "Senior School Admission" },
  { file: "13-Students_Admissions_8_4_4_-_Starehe_Girl.md", title: "Students Admissions 8.4.4" },
  { file: "14-Support_a_Cause_-_Starehe_Girls__Centre.md", title: "Support a Cause" },
  { file: "15-Job_Vacancy_-_Starehe_Girls__Centre.md", title: "Job Vacancy" },
  { file: "16-Placement_KUCCPS_-_Starehe_Girls__Centre.md", title: "Placement KUCCPS" },
  { file: "17-Tenders_-_Starehe_Girls__Centre.md", title: "Tenders" },
  { file: "18-Contact_1_-_Starehe_Girls__Centre.md", title: "Contact 1" },
];

for (const item of list) {
  const content = fs.readFileSync(path.join(pagesDir, item.file), "utf-8");
  console.log(`\n################### ${item.title} (${item.file}) ###################`);
  // clean out repetitive nav lines
  const clean = content.split("\n")
    .filter(line => !line.trim().startsWith("* ") && line.trim().length > 0)
    .join("\n");
  console.log(clean);
}

