/**
 * Senior School (Grade 10) application PDF engine.
 *
 * Uses the school's official 4-page form (public/docs/SGC-Senior-School-Blue-Form.pdf)
 * as the base so the output is identical to the printed form. Applicant data is
 * overlaid at coordinates measured from the official document (A4, 595.32 x 841.92pt).
 * All coordinates below are expressed as "top" offsets (distance from the top edge)
 * to match the measurements, then converted to PDF space by `y()`.
 */
import fs from "fs";
import path from "path";
import { PDFDocument, PDFFont, PDFPage, StandardFonts, rgb } from "pdf-lib";
import type { SeniorSchoolApplicationData, StoredApplication } from "@/types/application";

export const TEMPLATE_PATH = path.join(
  process.cwd(),
  "public",
  "docs",
  "SGC-Senior-School-Blue-Form.pdf"
);

const PAGE_H = 841.92;
const INK = rgb(0.04, 0.13, 0.45); // blue "pen" ink
const TICK = rgb(0.05, 0.1, 0.35);
const y = (top: number) => PAGE_H - top;

const STATUS_LABELS: Record<string, string> = {
  PENDING: "Pending review",
  UNDER_REVIEW: "Under review",
  SHORTLISTED: "Shortlisted",
  HOME_VISIT_REQUIRED: "Home visit required",
  APPROVED: "Approved",
  WAITLISTED: "Waitlisted",
  REJECTED: "Not successful",
};

let templateCache: Uint8Array | null = null;

async function loadTemplate(): Promise<Uint8Array> {
  if (templateCache) return templateCache;
  if (!fs.existsSync(TEMPLATE_PATH)) {
    throw new Error(
      `Official application form template missing at ${TEMPLATE_PATH}. Restore public/docs/SGC-Senior-School-Blue-Form.pdf.`
    );
  }
  templateCache = new Uint8Array(fs.readFileSync(TEMPLATE_PATH));
  return templateCache;
}

/** Returns the untouched official blank form for print-and-fill. */
export async function getBlankApplicationPdf(): Promise<Uint8Array> {
  return loadTemplate();
}

interface Ctx {
  font: PDFFont;
  bold: PDFFont;
}

/** Strip characters the standard (WinAnsi) font cannot encode. */
function clean(font: PDFFont, value: unknown): string {
  const text = String(value ?? "")
    .replace(/[\r\t]/g, " ")
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/[\u2013\u2014]/g, "-");
  let out = "";
  for (const ch of text) {
    if (ch === "\n") {
      out += ch;
      continue;
    }
    try {
      font.encodeText(ch);
      out += ch;
    } catch {
      out += "";
    }
  }
  return out;
}

/** Single-line text that shrinks to fit `maxWidth`. */
function field(
  page: PDFPage,
  ctx: Ctx,
  value: unknown,
  x: number,
  baselineTop: number,
  maxWidth: number,
  size = 9,
  bold = false
) {
  const f = bold ? ctx.bold : ctx.font;
  let text = clean(f, value).replace(/\n+/g, " ").trim();
  if (!text) return;
  let s = size;
  while (s > 5.5 && f.widthOfTextAtSize(text, s) > maxWidth) s -= 0.25;
  while (text.length > 1 && f.widthOfTextAtSize(text, s) > maxWidth) {
    text = text.slice(0, -1);
  }
  page.drawText(text, { x, y: y(baselineTop), size: s, font: f, color: INK });
}

function wrap(font: PDFFont, text: string, size: number, maxWidth: number): string[] {
  const lines: string[] = [];
  for (const para of text.split(/\n/)) {
    const words = para.split(/\s+/).filter(Boolean);
    let line = "";
    for (const word of words) {
      const candidate = line ? `${line} ${word}` : word;
      if (font.widthOfTextAtSize(candidate, size) <= maxWidth) {
        line = candidate;
      } else {
        if (line) lines.push(line);
        // hard-break very long words
        let w = word;
        while (font.widthOfTextAtSize(w, size) > maxWidth && w.length > 1) {
          let cut = w.length - 1;
          while (cut > 1 && font.widthOfTextAtSize(w.slice(0, cut), size) > maxWidth) cut--;
          lines.push(w.slice(0, cut));
          w = w.slice(cut);
        }
        line = w;
      }
    }
    if (line) lines.push(line);
  }
  return lines;
}

/** Multi-line text inside a rectangle; font shrinks until it fits. */
function block(
  page: PDFPage,
  ctx: Ctx,
  value: unknown,
  box: { x: number; top: number; width: number; height: number },
  size = 8.5,
  minSize = 5.5
) {
  const text = clean(ctx.font, value).trim();
  if (!text) return;
  let s = size;
  let lines = wrap(ctx.font, text, s, box.width);
  while (s > minSize && lines.length * s * 1.18 > box.height) {
    s -= 0.25;
    lines = wrap(ctx.font, text, s, box.width);
  }
  const lineH = s * 1.18;
  const maxLines = Math.max(1, Math.floor(box.height / lineH));
  if (lines.length > maxLines) {
    lines = lines.slice(0, maxLines);
    lines[maxLines - 1] = `${lines[maxLines - 1].slice(0, -12)} ...(see portal)`;
  }
  lines.forEach((ln, i) => {
    page.drawText(ln, {
      x: box.x,
      y: y(box.top + s + i * lineH),
      size: s,
      font: ctx.font,
      color: INK,
    });
  });
}

/** Writes text across the printed ruled lines (page 3 explanation, etc.). */
function ruled(
  page: PDFPage,
  ctx: Ctx,
  value: unknown,
  opts: { x: number; firstBaseline: number; pitch: number; lines: number; width: number; size?: number }
) {
  const text = clean(ctx.font, value).trim();
  if (!text) return;
  let s = opts.size ?? 9.5;
  let lines = wrap(ctx.font, text, s, opts.width);
  while (s > 6 && lines.length > opts.lines) {
    s -= 0.25;
    lines = wrap(ctx.font, text, s, opts.width);
  }
  lines.slice(0, opts.lines).forEach((ln, i) => {
    page.drawText(ln, {
      x: opts.x,
      y: y(opts.firstBaseline + i * opts.pitch),
      size: s,
      font: ctx.font,
      color: INK,
    });
  });
}

/** Tick inside a printed checkbox (box coordinates in top-space). */
function tick(page: PDFPage, box: [number, number, number, number]) {
  const [x0, t0, x1, t1] = box;
  const w = x1 - x0;
  const h = t1 - t0;
  page.drawLine({
    start: { x: x0 + w * 0.18, y: y(t0 + h * 0.55) },
    end: { x: x0 + w * 0.42, y: y(t0 + h * 0.82) },
    thickness: 1.6,
    color: TICK,
  });
  page.drawLine({
    start: { x: x0 + w * 0.42, y: y(t0 + h * 0.82) },
    end: { x: x0 + w * 0.86, y: y(t0 + h * 0.16) },
    thickness: 1.6,
    color: TICK,
  });
}

function formatDate(value: string): string {
  if (!value) return "";
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(value);
  return m ? `${m[3]}/${m[2]}/${m[1]}` : value;
}

async function embedPhoto(doc: PDFDocument, page: PDFPage, dataUrl?: string) {
  if (!dataUrl) return;
  const m = /^data:image\/(png|jpe?g);base64,(.+)$/i.exec(dataUrl);
  if (!m) return;
  try {
    const bytes = Buffer.from(m[2], "base64");
    const img = m[1].toLowerCase() === "png" ? await doc.embedPng(bytes) : await doc.embedJpg(bytes);
    // Official passport box: x 50.75–151.5, top 329.7–439.3
    const box = { x: 51.5, top: 330.5, w: 99.2, h: 108 };
    const scale = Math.min(box.w / img.width, box.h / img.height);
    const w = img.width * scale;
    const h = img.height * scale;
    page.drawRectangle({
      x: box.x,
      y: y(box.top + box.h),
      width: box.w,
      height: box.h,
      color: rgb(1, 1, 1),
    });
    page.drawImage(img, {
      x: box.x + (box.w - w) / 2,
      y: y(box.top + box.h) + (box.h - h) / 2,
      width: w,
      height: h,
    });
  } catch (err) {
    console.error("[pdf] passport photo could not be embedded:", (err as Error).message);
  }
}

function referenceStrip(page: PDFPage, ctx: Ctx, label: string) {
  const text = clean(ctx.font, label);
  const s = 6.5;
  const w = ctx.font.widthOfTextAtSize(text, s);
  page.drawText(text, {
    x: 595.32 - 18 - w,
    y: y(12),
    size: s,
    font: ctx.font,
    color: rgb(0.35, 0.35, 0.4),
  });
}

/**
 * Builds the completed official form for an applicant.
 * When `stored` is supplied (admin download) the office-use fields are also filled.
 */
export async function generateSeniorSchoolApplicationPdf(
  data: SeniorSchoolApplicationData,
  stored?: Pick<
    StoredApplication,
    "applicationNumber" | "status" | "adminRemarks" | "knecArtsScore" | "knecSocialScore" | "knecStemScore" | "createdAt" | "reviewedBy" | "updatedAt"
  >
): Promise<Uint8Array> {
  const doc = await PDFDocument.load(await loadTemplate(), { ignoreEncryption: true });
  const ctx: Ctx = {
    font: await doc.embedFont(StandardFonts.Helvetica),
    bold: await doc.embedFont(StandardFonts.HelveticaBold),
  };
  const [p1, p2, p3, p4] = doc.getPages();

  doc.setTitle(`Grade 10 Application - ${data.fullName || "Applicant"}`);
  doc.setAuthor("Starehe Girls' Centre & School");
  doc.setSubject("Application for Admission into Grade 10");
  doc.setCreator("Starehe Girls' Centre Admissions Portal");

  if (stored?.applicationNumber) {
    const ref = `Application No. ${stored.applicationNumber}  |  Submitted ${formatDate(
      (stored.createdAt || "").slice(0, 10)
    )}`;
    [p1, p2, p3, p4].forEach((p) => referenceStrip(p, ctx, ref));
  }

  // ───────────── PAGE 1 ─────────────
  const yr = String(data.admissionYear || "").replace(/\D/g, "").slice(-2);
  field(p1, ctx, yr, 484, 171.5, 24, 13, true);

  if (data.category === "SPONSORED") tick(p1, [315, 179, 329, 190]);
  if (data.category === "SELF_SPONSORED") tick(p1, [509, 180, 523, 190]);

  // Office use (admin download only)
  if (stored) {
    field(p1, ctx, stored.knecArtsScore, 68, 269, 150);
    field(p1, ctx, stored.knecSocialScore, 230, 269, 200);
    field(p1, ctx, stored.knecStemScore, 440, 269, 140);
    if (stored.status && stored.status !== "PENDING") {
      field(p1, ctx, `${STATUS_LABELS[stored.status] || stored.status}${stored.adminRemarks ? ` - ${stored.adminRemarks}` : ""}`, 67, 319, 150, 7.5);
      field(p1, ctx, stored.reviewedBy || "", 225, 319, 126, 7.5);
      field(p1, ctx, formatDate((stored.updatedAt || "").slice(0, 10)), 360, 319, 90, 7.5);
    }
  }

  await embedPhoto(doc, p1, data.passportPhotoDataUrl);

  const pathwayLabel: Record<string, string> = {
    STEM: "STEM",
    SOCIAL_SCIENCE: "Social Science",
    ARTS_SPORTS: "Arts & Sports Science",
  };
  const tracks = (data.tracksSelected || []).join(", ");
  field(p1, ctx, data.fullName?.toUpperCase(), 306, 339, 270, 9.5, true);
  field(p1, ctx, data.assessmentNo, 306, 355, 108);
  field(p1, ctx, data.centreCode, 489, 355, 90);
  field(
    p1,
    ctx,
    [pathwayLabel[data.pathwaySelected] || "", tracks ? `(${tracks})` : ""].filter(Boolean).join(" "),
    306,
    370,
    272
  );
  field(p1, ctx, formatDate(data.dateOfBirth), 306, 384.5, 92);
  field(p1, ctx, data.birthCertNo, 479, 384.5, 100);
  field(p1, ctx, data.juniorSchoolName, 306, 399.5, 272);
  field(p1, ctx, data.juniorSchHoiContact, 306, 415, 272);
  field(p1, ctx, data.county, 306, 430, 92);
  field(p1, ctx, data.subCounty, 466, 430, 112);

  // Pathway & track checkboxes
  if (data.pathwaySelected === "STEM") tick(p1, [258, 477, 275, 495]);
  if (data.pathwaySelected === "SOCIAL_SCIENCE") tick(p1, [437, 477, 453, 496]);
  if (data.pathwaySelected === "ARTS_SPORTS") tick(p1, [564, 479, 580, 497]);
  const trackBoxes: Record<string, [number, number, number, number]> = {
    "Pure Science": [258, 510, 275, 528],
    "Applied Science": [257, 540, 274, 559],
    Languages: [437, 510, 453, 529],
    "Humanities & Business Studies": [436, 541, 453, 559],
    Arts: [564, 512, 580, 530],
    "Sports Science": [563, 542, 580, 561],
  };
  (data.tracksSelected || []).forEach((t) => trackBoxes[t] && tick(p1, trackBoxes[t]));

  // Part I – headteacher
  block(p1, ctx, data.headteacherBgComments, { x: 60, top: 659, width: 489, height: 40 });
  block(p1, ctx, data.headteacherAbilityObservations, { x: 60, top: 734, width: 488, height: 33 });
  field(p1, ctx, data.headteacherName, 164, 787.5, 136);
  field(p1, ctx, data.headteacherMobile, 358, 787.5, 172);
  field(p1, ctx, formatDate(data.headteacherDate), 247, 806.5, 120);

  // ───────────── PAGE 2 ─────────────
  const rows: Array<{ key: keyof SeniorSchoolApplicationData["father"]; top: number; bottom: number }> = [
    { key: "fullNames", top: 104, bottom: 130 },
    { key: "maritalStatus", top: 130, bottom: 182 },
    { key: "idNumber", top: 182, bottom: 208 },
    { key: "employmentIncome", top: 208, bottom: 247 },
    { key: "businessIncome", top: 247, bottom: 286 },
    { key: "ownedLandIncome", top: 286, bottom: 325 },
    { key: "otherIncome", top: 325, bottom: 363 },
    { key: "physicalAddress", top: 363, bottom: 415 },
    { key: "houseStatus", top: 415, bottom: 441 },
  ];
  const parentCols = [
    { parent: data.father, x: 275, width: 128 },
    { parent: data.mother, x: 410, width: 151 },
  ];
  for (const col of parentCols) {
    if (!col.parent) continue;
    for (const row of rows) {
      let value = String(col.parent[row.key] ?? "");
      if (row.key === "maritalStatus" && col.parent.deceasedDate) {
        value = `${value}${value ? " - " : ""}Date of death: ${formatDate(col.parent.deceasedDate)}`;
      }
      block(p2, ctx, value, { x: col.x, top: row.top + 2, width: col.width, height: row.bottom - row.top - 3 }, 8, 5.5);
    }
  }

  // Siblings: 7 printed rows
  const sibRows = [536, 563, 590, 618, 645, 672, 699, 727];
  (data.siblings || []).slice(0, 7).forEach((s, i) => {
    const top = sibRows[i] + 2;
    const h = sibRows[i + 1] - sibRows[i] - 3;
    block(p2, ctx, s.name, { x: 63, top, width: 143, height: h }, 8);
    field(p2, ctx, s.gender, 220, top + 14, 18, 9, true);
    field(p2, ctx, s.age, 245, top + 14, 20);
    block(p2, ctx, s.schoolOrCollege, { x: 271, top, width: 93, height: h }, 7.5);
    block(p2, ctx, s.workingOccupationSalary, { x: 370, top, width: 93, height: h }, 7.5);
    block(p2, ctx, s.marriedSpouseOccupationSalary, { x: 469, top, width: 93, height: h }, 7.5);
  });
  if ((data.siblings || []).length > 7) {
    const extra = data.siblings
      .slice(7)
      .map((s) => `${s.name} (${s.gender}, ${s.age})`)
      .join("; ");
    field(p2, ctx, `Additional: ${extra}`, 330, 735, 230, 6.5);
  }

  ruled(p2, ctx, data.whoPaysFees, { x: 260, firstBaseline: 760.5, pitch: 26.5, lines: 1, width: 285, size: 9.5 });
  {
    // overflow of "who pays fees" onto the second ruled line
    const s = 9.5;
    const all = wrap(ctx.font, clean(ctx.font, data.whoPaysFees || ""), s, 285);
    if (all.length > 1) {
      field(p2, ctx, all.slice(1).join(" "), 58, 787, 485, 9);
    }
  }

  // ───────────── PAGE 3 ─────────────
  ruled(p3, ctx, data.admissionExplanation, {
    x: 57,
    firstBaseline: 167,
    pitch: 19.2,
    lines: 20,
    width: 486,
    size: 10,
  });
  field(p3, ctx, data.parentCertName?.toUpperCase(), 182, 605, 360, 9.5, true);
  field(p3, ctx, data.parentCertOccupation, 133, 633, 410);
  field(p3, ctx, data.parentCertAddress, 110, 661, 433);
  field(p3, ctx, data.parentCertMobile, 135, 689, 110);
  field(p3, ctx, data.parentCertEmail, 335, 689, 210);
  field(p3, ctx, formatDate(data.parentCertDate), 90, 717, 145);
  field(p3, ctx, data.parentCertRelationship, 196, 759, 350, 9.5, true);

  // ───────────── PAGE 4 ─────────────
  if (data.category !== "SELF_SPONSORED") {
    block(p4, ctx, data.chiefComments, { x: 60, top: 157, width: 482, height: 57 });
    field(p4, ctx, data.chiefNameTitle?.toUpperCase(), 270, 236.5, 272);
    field(p4, ctx, data.chiefMobile, 120, 260, 132);
    field(p4, ctx, data.chiefOfficeTel, 344, 260, 198);
    field(p4, ctx, formatDate(data.chiefDate), 90, 284.5, 195);

    block(p4, ctx, data.clergyComments, { x: 60, top: 351, width: 490, height: 54 });
    field(p4, ctx, data.clergyNameTitle?.toUpperCase(), 270, 429.5, 279);
    field(p4, ctx, data.clergyMobile, 120, 454, 222);
    field(p4, ctx, data.clergyOfficeTel, 432, 454, 117);
    field(p4, ctx, formatDate(data.clergyDate), 90, 478.5, 120);
  }

  return doc.save();
}
