import fs from "fs";
import path from "path";
import initSqlJs, { Database, SqlJsStatic } from "sql.js";
import { hashPassword, verifyPassword } from "./auth";
import {
  ApplicationStatus,
  CreateFormSubmissionInput,
  FormSubmissionStatus,
  FormSubmissionType,
  ParentParticulars,
  SeniorSchoolApplicationData,
  SiblingRecord,
  StoredApplication,
  StoredFormSubmission,
} from "@/types/application";

const DATA_DIR = path.join(process.cwd(), "data");
const DB_PATH = path.join(DATA_DIR, "starehe.sqlite");
const MIGRATIONS_DIR = path.join(process.cwd(), "migrations");

let sqlPromise: Promise<SqlJsStatic> | null = null;
let dbInstance: Database | null = null;
let initPromise: Promise<Database> | null = null;

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function saveDbToDisk(db: Database) {
  ensureDataDir();
  const data = db.export();
  const buffer = Buffer.from(data);
  const tmpPath = `${DB_PATH}.tmp`;
  fs.writeFileSync(tmpPath, buffer);
  fs.renameSync(tmpPath, DB_PATH);
}

async function getSql(): Promise<SqlJsStatic> {
  if (!sqlPromise) {
    sqlPromise = initSqlJs({
      locateFile: (file: string) =>
        path.join(process.cwd(), "node_modules", "sql.js", "dist", file),
    });
  }
  return sqlPromise;
}

export async function getDatabase(): Promise<Database> {
  if (dbInstance) return dbInstance;
  if (initPromise) return initPromise;

  initPromise = (async () => {
    ensureDataDir();
    const SQL = await getSql();

    let db: Database;
    if (fs.existsSync(DB_PATH)) {
      const fileBuffer = fs.readFileSync(DB_PATH);
      db = new SQL.Database(fileBuffer);
    } else {
      db = new SQL.Database();
    }

    // Run pending SQL migrations
    runMigrations(db);

    // Ensure default admin account exists
    seedDefaultAdmin(db);

    saveDbToDisk(db);
    dbInstance = db;
    return db;
  })();

  return initPromise;
}

function runMigrations(db: Database) {
  // Ensure schema_migrations exists first
  db.run(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      version TEXT PRIMARY KEY,
      description TEXT NOT NULL,
      applied_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);

  if (!fs.existsSync(MIGRATIONS_DIR)) return;

  const files = fs
    .readdirSync(MIGRATIONS_DIR)
    .filter((f) => f.endsWith(".sql"))
    .sort();

  const appliedRes = db.exec("SELECT version FROM schema_migrations");
  const appliedVersions = new Set<string>(
    appliedRes.length > 0 ? appliedRes[0].values.map((row) => String(row[0])) : []
  );

  for (const file of files) {
    const version = file.replace(/\.sql$/, "");
    if (appliedVersions.has(version)) continue;

    const sqlContent = fs.readFileSync(path.join(MIGRATIONS_DIR, file), "utf8");
    db.run(sqlContent);
    db.run(
      "INSERT OR IGNORE INTO schema_migrations (version, description) VALUES (?, ?)",
      [version, `Applied migration ${file}`]
    );
  }
}

function seedDefaultAdmin(db: Database) {
  const adminEmail = (process.env.ADMIN_SEED_EMAIL || "").trim().toLowerCase();
  const adminPass = process.env.ADMIN_SEED_PASSWORD || process.env.DEFAULT_ADMIN_PASSWORD || "";

  if (!adminEmail || !adminPass) {
    return;
  }

  const existingStmt = db.prepare(
    `SELECT id, password_hash, is_active, deleted_at
     FROM admin_users
     WHERE LOWER(email) = LOWER(?) OR LOWER(username) = LOWER(?)`
  );
  existingStmt.bind([adminEmail, adminEmail]);

  if (existingStmt.step()) {
    const existing = existingStmt.getAsObject() as {
      id: number;
      password_hash: string;
      is_active: number;
      deleted_at: string | null;
    };
    existingStmt.free();

    const needsPasswordSync = !verifyPassword(adminPass, existing.password_hash);
    if (needsPasswordSync || !existing.is_active || existing.deleted_at !== null) {
      const nextHash = needsPasswordSync ? hashPassword(adminPass) : existing.password_hash;
      db.run(
        `UPDATE admin_users
         SET password_hash = ?, role = 'SUPER_ADMIN', is_active = 1, deleted_at = NULL, updated_at = datetime('now')
         WHERE id = ?`,
        [nextHash, existing.id]
      );
    }
    return;
  }
  existingStmt.free();

  const passwordHash = hashPassword(adminPass);
  db.run(
    `INSERT INTO admin_users (username, email, full_name, password_hash, role, is_active)
     VALUES (?, ?, ?, ?, ?, 1)`,
    [adminEmail, adminEmail, "Admissions Administrator", passwordHash, "SUPER_ADMIN"]
  );
}

export interface AdminUserRecord {
  id: number;
  username: string;
  email: string;
  fullName: string;
  role: "SUPER_ADMIN" | "ADMISSIONS_OFFICER" | "REVIEWER";
}

export async function authenticateAdmin(
  username: string,
  password: string
): Promise<AdminUserRecord | null> {
  const db = await getDatabase();
  const lookup = username.trim();
  const stmt = db.prepare(
    `SELECT id, username, email, full_name, password_hash, role, is_active
     FROM admin_users
     WHERE (LOWER(username) = LOWER(?) OR LOWER(email) = LOWER(?)) AND deleted_at IS NULL`
  );
  stmt.bind([lookup, lookup]);

  if (!stmt.step()) {
    stmt.free();
    return null;
  }

  const row = stmt.getAsObject() as {
    id: number;
    username: string;
    email: string;
    full_name: string;
    password_hash: string;
    role: "SUPER_ADMIN" | "ADMISSIONS_OFFICER" | "REVIEWER";
    is_active: number;
  };
  stmt.free();

  if (!row.is_active) return null;
  if (!verifyPassword(password, row.password_hash)) return null;

  return {
    id: row.id,
    username: row.username,
    email: row.email,
    fullName: row.full_name,
    role: row.role,
  };
}

function generateApplicationNumber(admissionYear: string, db: Database): string {
  const yr = (admissionYear || "26").replace(/\D/g, "").slice(-2) || "26";
  const prefix = `SGC-G10-${yr}-`;
  const res = db.exec(
    `SELECT COUNT(*) FROM senior_school_applications WHERE application_number LIKE '${prefix}%'`
  );
  const existing = res.length > 0 ? Number(res[0].values[0][0]) : 0;
  const seq = String(existing + 1).padStart(4, "0");
  const randSuffix = Math.floor(10 + Math.random() * 90);
  return `${prefix}${seq}${randSuffix}`;
}

function mapRowToApplication(row: Record<string, unknown>): StoredApplication {
  const safeParse = <T,>(val: unknown, fallback: T): T => {
    if (typeof val !== "string" || !val) return fallback;
    try {
      return JSON.parse(val) as T;
    } catch {
      return fallback;
    }
  };

  const emptyParent: ParentParticulars = {
    fullNames: "",
    maritalStatus: "",
    deceasedDate: "",
    idNumber: "",
    employmentIncome: "",
    businessIncome: "",
    ownedLandIncome: "",
    otherIncome: "",
    physicalAddress: "",
    houseStatus: "",
  };

  const head = safeParse<Record<string, string>>(row.headteacher_json, {});
  const cert = safeParse<Record<string, string>>(row.parent_cert_json, {});
  const chief = safeParse<Record<string, string>>(row.chief_json, {});
  const clergy = safeParse<Record<string, string>>(row.clergy_json, {});

  return {
    id: Number(row.id),
    applicationNumber: String(row.application_number),
    admissionYear: String(row.admission_year || ""),
    category: (row.category as "SPONSORED" | "SELF_SPONSORED") || "SPONSORED",
    fullName: String(row.full_name || ""),
    assessmentNo: String(row.assessment_no || ""),
    centreCode: String(row.centre_code || ""),
    pathwaySelected: (row.pathway_selected as StoredApplication["pathwaySelected"]) || "",
    tracksSelected: safeParse(row.tracks_json, []),
    dateOfBirth: String(row.date_of_birth || ""),
    birthCertNo: String(row.birth_cert_no || ""),
    juniorSchoolName: String(row.junior_school_name || ""),
    juniorSchHoiContact: String(row.junior_sch_hoi_contact || ""),
    county: String(row.county || ""),
    subCounty: String(row.sub_county || ""),
    passportPhotoDataUrl: String(row.passport_photo_data_url || ""),

    headteacherBgComments: head.bgComments || "",
    headteacherAbilityObservations: head.abilityObservations || "",
    headteacherName: head.name || "",
    headteacherMobile: head.mobile || "",
    headteacherDate: head.date || "",

    father: safeParse<ParentParticulars>(row.father_json, { ...emptyParent }),
    mother: safeParse<ParentParticulars>(row.mother_json, { ...emptyParent }),
    siblings: safeParse<SiblingRecord[]>(row.siblings_json, []),
    whoPaysFees: String(row.who_pays_fees || ""),

    admissionExplanation: String(row.admission_explanation || ""),
    parentCertName: cert.name || "",
    parentCertOccupation: cert.occupation || "",
    parentCertAddress: cert.address || "",
    parentCertMobile: cert.mobile || "",
    parentCertEmail: cert.email || "",
    parentCertDate: cert.date || "",
    parentCertRelationship: cert.relationship || "",

    chiefComments: chief.comments || "",
    chiefNameTitle: chief.nameTitle || "",
    chiefMobile: chief.mobile || "",
    chiefOfficeTel: chief.officeTel || "",
    chiefDate: chief.date || "",

    clergyComments: clergy.comments || "",
    clergyNameTitle: clergy.nameTitle || "",
    clergyMobile: clergy.mobile || "",
    clergyOfficeTel: clergy.officeTel || "",
    clergyDate: clergy.date || "",

    status: (row.status as ApplicationStatus) || "PENDING",
    adminRemarks: String(row.admin_remarks || ""),
    reviewedBy: row.reviewed_by_username ? String(row.reviewed_by_username) : null,
    knecArtsScore: String(row.knec_arts_score || ""),
    knecSocialScore: String(row.knec_social_score || ""),
    knecStemScore: String(row.knec_stem_score || ""),
    createdAt: String(row.created_at || ""),
    updatedAt: String(row.updated_at || ""),
    deletedAt: row.deleted_at ? String(row.deleted_at) : null,
  };
}

export async function createApplication(
  data: SeniorSchoolApplicationData
): Promise<StoredApplication> {
  const db = await getDatabase();
  const applicationNumber = generateApplicationNumber(data.admissionYear, db);

  const headJson = JSON.stringify({
    bgComments: data.headteacherBgComments || "",
    abilityObservations: data.headteacherAbilityObservations || "",
    name: data.headteacherName || "",
    mobile: data.headteacherMobile || "",
    date: data.headteacherDate || "",
  });

  const parentCertJson = JSON.stringify({
    name: data.parentCertName || "",
    occupation: data.parentCertOccupation || "",
    address: data.parentCertAddress || "",
    mobile: data.parentCertMobile || "",
    email: data.parentCertEmail || "",
    date: data.parentCertDate || "",
    relationship: data.parentCertRelationship || "",
  });

  const chiefJson = JSON.stringify({
    comments: data.chiefComments || "",
    nameTitle: data.chiefNameTitle || "",
    mobile: data.chiefMobile || "",
    officeTel: data.chiefOfficeTel || "",
    date: data.chiefDate || "",
  });

  const clergyJson = JSON.stringify({
    comments: data.clergyComments || "",
    nameTitle: data.clergyNameTitle || "",
    mobile: data.clergyMobile || "",
    officeTel: data.clergyOfficeTel || "",
    date: data.clergyDate || "",
  });

  db.run(
    `INSERT INTO senior_school_applications (
      application_number, admission_year, category, full_name, assessment_no, centre_code,
      pathway_selected, tracks_json, date_of_birth, birth_cert_no, junior_school_name,
      junior_sch_hoi_contact, county, sub_county, passport_photo_data_url,
      headteacher_json, father_json, mother_json, siblings_json, who_pays_fees,
      admission_explanation, parent_cert_json, chief_json, clergy_json, status
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'PENDING')`,
    [
      applicationNumber,
      data.admissionYear || "26",
      data.category,
      data.fullName.trim(),
      data.assessmentNo.trim(),
      data.centreCode || "",
      data.pathwaySelected || "",
      JSON.stringify(data.tracksSelected || []),
      data.dateOfBirth,
      data.birthCertNo || "",
      data.juniorSchoolName.trim(),
      data.juniorSchHoiContact || "",
      data.county.trim(),
      data.subCounty || "",
      data.passportPhotoDataUrl || "",
      headJson,
      JSON.stringify(data.father || {}),
      JSON.stringify(data.mother || {}),
      JSON.stringify(data.siblings || []),
      data.whoPaysFees || "",
      data.admissionExplanation.trim(),
      parentCertJson,
      chiefJson,
      clergyJson,
    ]
  );

  const idRes = db.exec("SELECT last_insert_rowid() AS id");
  const newId = Number(idRes[0].values[0][0]);

  db.run(
    `INSERT INTO application_audit_logs (application_id, actor_username, action, previous_status, new_status, notes)
     VALUES (?, 'APPLICANT', 'SUBMITTED', NULL, 'PENDING', ?)`,
    [newId, `Online Grade 10 application submitted (${data.category})`]
  );

  // Mirror summary into unified form_submissions log so all submitted forms are tracked centrally
  db.run(
    `INSERT OR IGNORE INTO form_submissions (
      reference_code, form_type, category, submitter_name, submitter_email, submitter_phone,
      subject, message, payload_json, source_path, status
    ) VALUES (?, 'ADMISSIONS_APPLICATION', ?, ?, ?, ?, ?, ?, ?, '/admissions/apply', 'NEW')`,
    [
      applicationNumber,
      data.category || "SPONSORED",
      data.fullName.trim(),
      data.parentCertEmail || "",
      data.parentCertMobile || data.headteacherMobile || "",
      `Grade 10 Senior School Application (${data.pathwaySelected || "Unspecified"})`,
      `Applicant from ${data.county.trim()} (${data.juniorSchoolName.trim()}) — Assessment No: ${data.assessmentNo.trim()}`,
      JSON.stringify({
        applicationId: newId,
        applicationNumber,
        category: data.category,
        pathwaySelected: data.pathwaySelected,
        county: data.county,
        juniorSchoolName: data.juniorSchoolName,
      }),
    ]
  );

  saveDbToDisk(db);
  console.info(
    JSON.stringify({
      event: "FORM_SUBMITTED",
      formType: "ADMISSIONS_APPLICATION",
      referenceCode: applicationNumber,
      category: data.category,
      county: data.county,
      timestamp: new Date().toISOString(),
    })
  );

  const created = await getApplicationById(newId);
  if (!created) throw new Error("Failed to reload newly created application");
  return created;
}

export interface ListApplicationsFilters {
  search?: string;
  category?: string;
  pathway?: string;
  status?: string;
}

export async function listApplications(
  filters: ListApplicationsFilters = {}
): Promise<StoredApplication[]> {
  const db = await getDatabase();
  const whereClauses = ["a.deleted_at IS NULL"];
  const params: (string | number)[] = [];

  if (filters.category && filters.category !== "ALL") {
    whereClauses.push("a.category = ?");
    params.push(filters.category);
  }
  if (filters.pathway && filters.pathway !== "ALL") {
    whereClauses.push("a.pathway_selected = ?");
    params.push(filters.pathway);
  }
  if (filters.status && filters.status !== "ALL") {
    whereClauses.push("a.status = ?");
    params.push(filters.status);
  }
  if (filters.search && filters.search.trim()) {
    const q = `%${filters.search.trim().toLowerCase()}%`;
    whereClauses.push(
      "(LOWER(a.full_name) LIKE ? OR LOWER(a.application_number) LIKE ? OR LOWER(a.assessment_no) LIKE ? OR LOWER(a.county) LIKE ? OR LOWER(a.junior_school_name) LIKE ?)"
    );
    params.push(q, q, q, q, q);
  }

  const sql = `
    SELECT a.*, u.username AS reviewed_by_username
    FROM senior_school_applications a
    LEFT JOIN admin_users u ON a.reviewed_by_user_id = u.id
    WHERE ${whereClauses.join(" AND ")}
    ORDER BY a.created_at DESC, a.id DESC
  `;

  const stmt = db.prepare(sql);
  stmt.bind(params);

  const results: StoredApplication[] = [];
  while (stmt.step()) {
    results.push(mapRowToApplication(stmt.getAsObject()));
  }
  stmt.free();
  return results;
}

export async function getApplicationById(id: number): Promise<StoredApplication | null> {
  const db = await getDatabase();
  const stmt = db.prepare(
    `SELECT a.*, u.username AS reviewed_by_username
     FROM senior_school_applications a
     LEFT JOIN admin_users u ON a.reviewed_by_user_id = u.id
     WHERE a.id = ? AND a.deleted_at IS NULL`
  );
  stmt.bind([id]);
  if (!stmt.step()) {
    stmt.free();
    return null;
  }
  const app = mapRowToApplication(stmt.getAsObject());
  stmt.free();
  return app;
}

export async function getApplicationByNumber(
  appNumber: string
): Promise<StoredApplication | null> {
  const db = await getDatabase();
  const stmt = db.prepare(
    `SELECT a.*, u.username AS reviewed_by_username
     FROM senior_school_applications a
     LEFT JOIN admin_users u ON a.reviewed_by_user_id = u.id
     WHERE a.application_number = ? AND a.deleted_at IS NULL`
  );
  stmt.bind([appNumber]);
  if (!stmt.step()) {
    stmt.free();
    return null;
  }
  const app = mapRowToApplication(stmt.getAsObject());
  stmt.free();
  return app;
}

export async function updateApplicationReview(
  id: number,
  updates: {
    status?: ApplicationStatus;
    adminRemarks?: string;
    knecArtsScore?: string;
    knecSocialScore?: string;
    knecStemScore?: string;
  },
  actor: { userId: number; username: string }
): Promise<StoredApplication | null> {
  const db = await getDatabase();
  const existing = await getApplicationById(id);
  if (!existing) return null;

  const newStatus = updates.status ?? existing.status;
  const newRemarks = updates.adminRemarks ?? existing.adminRemarks;
  const arts = updates.knecArtsScore ?? existing.knecArtsScore ?? "";
  const social = updates.knecSocialScore ?? existing.knecSocialScore ?? "";
  const stem = updates.knecStemScore ?? existing.knecStemScore ?? "";

  db.run(
    `UPDATE senior_school_applications
     SET status = ?,
         admin_remarks = ?,
         knec_arts_score = ?,
         knec_social_score = ?,
         knec_stem_score = ?,
         reviewed_by_user_id = ?,
         updated_at = datetime('now')
     WHERE id = ? AND deleted_at IS NULL`,
    [newStatus, newRemarks, arts, social, stem, actor.userId, id]
  );

  db.run(
    `INSERT INTO application_audit_logs (application_id, actor_username, action, previous_status, new_status, notes)
     VALUES (?, ?, 'STATUS_REVIEW', ?, ?, ?)`,
    [id, actor.username, existing.status, newStatus, newRemarks]
  );

  saveDbToDisk(db);
  return getApplicationById(id);
}

export async function softDeleteApplication(
  id: number,
  actor: { userId: number; username: string }
): Promise<boolean> {
  const db = await getDatabase();
  const existing = await getApplicationById(id);
  if (!existing) return false;

  db.run(
    `UPDATE senior_school_applications
     SET deleted_at = datetime('now'), updated_at = datetime('now')
     WHERE id = ?`,
    [id]
  );

  db.run(
    `INSERT INTO application_audit_logs (application_id, actor_username, action, previous_status, new_status, notes)
     VALUES (?, ?, 'ARCHIVED', ?, ?, 'Application soft-deleted by administrator')`,
    [id, actor.username, existing.status, existing.status]
  );

  saveDbToDisk(db);
  return true;
}

export async function getApplicationAuditLogs(applicationId: number) {
  const db = await getDatabase();
  const stmt = db.prepare(
    `SELECT id, actor_username, action, previous_status, new_status, notes, created_at
     FROM application_audit_logs
     WHERE application_id = ?
     ORDER BY id DESC`
  );
  stmt.bind([applicationId]);
  const logs: Array<Record<string, unknown>> = [];
  while (stmt.step()) {
    logs.push(stmt.getAsObject());
  }
  stmt.free();
  return logs;
}

// =========================================================================
// UNIFIED FORM & CONTACT SUBMISSIONS LOGGING
// =========================================================================

function generateSubmissionRef(formType: FormSubmissionType, db: Database): string {
  const prefixMap: Record<FormSubmissionType, string> = {
    CONTACT: "INQ",
    ADMISSIONS_APPLICATION: "ADM",
    GIVING_PLEDGE: "GIV",
    GENERAL_FORM: "FRM",
  };
  const yr = String(new Date().getFullYear()).slice(-2);
  const tag = prefixMap[formType] || "FRM";
  const prefix = `SGC-${tag}-${yr}-`;
  const res = db.exec(
    `SELECT COUNT(*) FROM form_submissions WHERE reference_code LIKE '${prefix}%'`
  );
  const existing = res.length > 0 ? Number(res[0].values[0][0]) : 0;
  const seq = String(existing + 1).padStart(4, "0");
  const randSuffix = Math.floor(10 + Math.random() * 90);
  return `${prefix}${seq}${randSuffix}`;
}

function mapRowToFormSubmission(row: Record<string, unknown>): StoredFormSubmission {
  let payload: Record<string, unknown> = {};
  if (typeof row.payload_json === "string" && row.payload_json) {
    try {
      payload = JSON.parse(row.payload_json) as Record<string, unknown>;
    } catch {
      payload = {};
    }
  }

  return {
    id: Number(row.id),
    referenceCode: String(row.reference_code),
    formType: (row.form_type as FormSubmissionType) || "CONTACT",
    category: String(row.category || "General Inquiry"),
    submitterName: String(row.submitter_name || ""),
    submitterEmail: String(row.submitter_email || ""),
    submitterPhone: String(row.submitter_phone || ""),
    subject: String(row.subject || ""),
    message: String(row.message || ""),
    payload,
    sourcePath: String(row.source_path || "/contact"),
    ipAddress: String(row.ip_address || ""),
    userAgent: String(row.user_agent || ""),
    status: (row.status as FormSubmissionStatus) || "NEW",
    adminNotes: String(row.admin_notes || ""),
    handledBy: row.handled_by_username ? String(row.handled_by_username) : null,
    createdAt: String(row.created_at || ""),
    updatedAt: String(row.updated_at || ""),
    deletedAt: row.deleted_at ? String(row.deleted_at) : null,
  };
}

export async function createFormSubmission(
  input: CreateFormSubmissionInput
): Promise<StoredFormSubmission> {
  const db = await getDatabase();
  const formType: FormSubmissionType = input.formType || "CONTACT";
  const referenceCode = generateSubmissionRef(formType, db);
  const category = (input.category || "General Inquiry").trim();
  const submitterName = input.submitterName.trim();
  const submitterEmail = (input.submitterEmail || "").trim();
  const submitterPhone = (input.submitterPhone || "").trim();
  const subject = (input.subject || category || "Website Submission").trim();
  const message = input.message.trim();
  const sourcePath = (input.sourcePath || "/contact").trim();

  db.run(
    `INSERT INTO form_submissions (
      reference_code, form_type, category, submitter_name, submitter_email, submitter_phone,
      subject, message, payload_json, source_path, ip_address, user_agent, status
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'NEW')`,
    [
      referenceCode,
      formType,
      category,
      submitterName,
      submitterEmail,
      submitterPhone,
      subject,
      message,
      JSON.stringify(input.payload || {}),
      sourcePath,
      input.ipAddress || "",
      (input.userAgent || "").slice(0, 300),
    ]
  );

  const idRes = db.exec("SELECT last_insert_rowid() AS id");
  const newId = Number(idRes[0].values[0][0]);

  db.run(
    `INSERT INTO form_submission_audit_logs (submission_id, actor_username, action, previous_status, new_status, notes)
     VALUES (?, 'VISITOR', 'SUBMITTED', NULL, 'NEW', ?)`,
    [newId, `${formType} submitted via ${sourcePath} (${category})`]
  );

  saveDbToDisk(db);
  console.info(
    JSON.stringify({
      event: "FORM_SUBMITTED",
      formType,
      category,
      referenceCode,
      sourcePath,
      timestamp: new Date().toISOString(),
    })
  );

  const created = await getFormSubmissionById(newId);
  if (!created) throw new Error("Failed to reload newly logged submission");
  return created;
}

export async function getFormSubmissionById(
  id: number
): Promise<StoredFormSubmission | null> {
  const db = await getDatabase();
  const stmt = db.prepare(
    `SELECT s.*, u.username AS handled_by_username
     FROM form_submissions s
     LEFT JOIN admin_users u ON s.handled_by_user_id = u.id
     WHERE s.id = ? AND s.deleted_at IS NULL`
  );
  stmt.bind([id]);
  if (!stmt.step()) {
    stmt.free();
    return null;
  }
  const submission = mapRowToFormSubmission(stmt.getAsObject());
  stmt.free();
  return submission;
}

export interface ListFormSubmissionsFilters {
  search?: string;
  formType?: string;
  status?: string;
}

export async function listFormSubmissions(
  filters: ListFormSubmissionsFilters = {}
): Promise<StoredFormSubmission[]> {
  const db = await getDatabase();
  const whereClauses = ["s.deleted_at IS NULL"];
  const params: (string | number)[] = [];

  if (filters.formType && filters.formType !== "ALL") {
    whereClauses.push("s.form_type = ?");
    params.push(filters.formType);
  }
  if (filters.status && filters.status !== "ALL") {
    whereClauses.push("s.status = ?");
    params.push(filters.status);
  }
  if (filters.search && filters.search.trim()) {
    const q = `%${filters.search.trim().toLowerCase()}%`;
    whereClauses.push(
      "(LOWER(s.submitter_name) LIKE ? OR LOWER(s.submitter_email) LIKE ? OR LOWER(s.reference_code) LIKE ? OR LOWER(s.category) LIKE ? OR LOWER(s.message) LIKE ?)"
    );
    params.push(q, q, q, q, q);
  }

  const sql = `
    SELECT s.*, u.username AS handled_by_username
    FROM form_submissions s
    LEFT JOIN admin_users u ON s.handled_by_user_id = u.id
    WHERE ${whereClauses.join(" AND ")}
    ORDER BY s.created_at DESC, s.id DESC
  `;

  const stmt = db.prepare(sql);
  stmt.bind(params);

  const results: StoredFormSubmission[] = [];
  while (stmt.step()) {
    results.push(mapRowToFormSubmission(stmt.getAsObject()));
  }
  stmt.free();
  return results;
}

export async function updateFormSubmissionStatus(
  id: number,
  updates: { status?: FormSubmissionStatus; adminNotes?: string },
  actor: { userId: number; username: string }
): Promise<StoredFormSubmission | null> {
  const db = await getDatabase();
  const existing = await getFormSubmissionById(id);
  if (!existing) return null;

  const newStatus = updates.status ?? existing.status;
  const newNotes = updates.adminNotes ?? existing.adminNotes;

  db.run(
    `UPDATE form_submissions
     SET status = ?, admin_notes = ?, handled_by_user_id = ?, updated_at = datetime('now')
     WHERE id = ? AND deleted_at IS NULL`,
    [newStatus, newNotes, actor.userId, id]
  );

  db.run(
    `INSERT INTO form_submission_audit_logs (submission_id, actor_username, action, previous_status, new_status, notes)
     VALUES (?, ?, 'STATUS_UPDATED', ?, ?, ?)`,
    [id, actor.username, existing.status, newStatus, newNotes]
  );

  saveDbToDisk(db);
  return getFormSubmissionById(id);
}

export async function softDeleteFormSubmission(
  id: number,
  actor: { userId: number; username: string }
): Promise<boolean> {
  const db = await getDatabase();
  const existing = await getFormSubmissionById(id);
  if (!existing) return false;

  db.run(
    `UPDATE form_submissions
     SET deleted_at = datetime('now'), status = 'ARCHIVED', updated_at = datetime('now')
     WHERE id = ?`,
    [id]
  );

  db.run(
    `INSERT INTO form_submission_audit_logs (submission_id, actor_username, action, previous_status, new_status, notes)
     VALUES (?, ?, 'ARCHIVED', ?, 'ARCHIVED', 'Submission archived by administrator')`,
    [id, actor.username, existing.status]
  );

  saveDbToDisk(db);
  return true;
}

export async function getFormSubmissionAuditLogs(submissionId: number) {
  const db = await getDatabase();
  const stmt = db.prepare(
    `SELECT id, actor_username, action, previous_status, new_status, notes, created_at
     FROM form_submission_audit_logs
     WHERE submission_id = ?
     ORDER BY id DESC`
  );
  stmt.bind([submissionId]);
  const logs: Array<Record<string, unknown>> = [];
  while (stmt.step()) {
    logs.push(stmt.getAsObject());
  }
  stmt.free();
  return logs;
}


