-- Migration 001: Initial Schema for Starehe Girls' Centre Senior School Admissions Portal
PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS schema_migrations (
  version TEXT PRIMARY KEY,
  description TEXT NOT NULL,
  applied_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS admin_users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL CHECK(role IN ('SUPER_ADMIN', 'ADMISSIONS_OFFICER', 'REVIEWER')),
  is_active INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  deleted_at TEXT DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS senior_school_applications (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  application_number TEXT NOT NULL UNIQUE,
  admission_year TEXT NOT NULL,
  category TEXT NOT NULL CHECK(category IN ('SPONSORED', 'SELF_SPONSORED')),
  full_name TEXT NOT NULL,
  assessment_no TEXT NOT NULL,
  centre_code TEXT DEFAULT '',
  pathway_selected TEXT NOT NULL CHECK(pathway_selected IN ('STEM', 'SOCIAL_SCIENCE', 'ARTS_SPORTS', '')),
  tracks_json TEXT NOT NULL,
  date_of_birth TEXT NOT NULL,
  birth_cert_no TEXT DEFAULT '',
  junior_school_name TEXT NOT NULL,
  junior_sch_hoi_contact TEXT DEFAULT '',
  county TEXT NOT NULL,
  sub_county TEXT DEFAULT '',
  passport_photo_data_url TEXT DEFAULT '',
  headteacher_json TEXT NOT NULL,
  father_json TEXT NOT NULL,
  mother_json TEXT NOT NULL,
  siblings_json TEXT NOT NULL,
  who_pays_fees TEXT DEFAULT '',
  admission_explanation TEXT NOT NULL,
  parent_cert_json TEXT NOT NULL,
  chief_json TEXT NOT NULL,
  clergy_json TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'PENDING' CHECK(status IN ('PENDING', 'UNDER_REVIEW', 'SHORTLISTED', 'HOME_VISIT_REQUIRED', 'APPROVED', 'WAITLISTED', 'REJECTED')),
  knec_arts_score TEXT DEFAULT '',
  knec_social_score TEXT DEFAULT '',
  knec_stem_score TEXT DEFAULT '',
  admin_remarks TEXT DEFAULT '',
  reviewed_by_user_id INTEGER REFERENCES admin_users(id) ON DELETE SET NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  deleted_at TEXT DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS application_audit_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  application_id INTEGER NOT NULL REFERENCES senior_school_applications(id) ON DELETE CASCADE,
  actor_username TEXT NOT NULL,
  action TEXT NOT NULL,
  previous_status TEXT,
  new_status TEXT,
  notes TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_apps_app_number ON senior_school_applications(application_number);
CREATE INDEX IF NOT EXISTS idx_apps_status ON senior_school_applications(status);
CREATE INDEX IF NOT EXISTS idx_apps_category ON senior_school_applications(category);
CREATE INDEX IF NOT EXISTS idx_apps_county ON senior_school_applications(county);
CREATE INDEX IF NOT EXISTS idx_apps_pathway ON senior_school_applications(pathway_selected);
CREATE INDEX IF NOT EXISTS idx_apps_deleted_at ON senior_school_applications(deleted_at);
CREATE INDEX IF NOT EXISTS idx_audit_app_id ON application_audit_logs(application_id);

