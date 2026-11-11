-- Migration 003: Unified Form & Contact Submissions Logging System
PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS form_submissions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  reference_code TEXT NOT NULL UNIQUE,
  form_type TEXT NOT NULL CHECK(form_type IN ('CONTACT', 'ADMISSIONS_APPLICATION', 'GIVING_PLEDGE', 'GENERAL_FORM')),
  category TEXT NOT NULL DEFAULT 'General Inquiry',
  submitter_name TEXT NOT NULL,
  submitter_email TEXT NOT NULL DEFAULT '',
  submitter_phone TEXT NOT NULL DEFAULT '',
  subject TEXT NOT NULL DEFAULT '',
  message TEXT NOT NULL DEFAULT '',
  payload_json TEXT NOT NULL DEFAULT '{}',
  source_path TEXT NOT NULL DEFAULT '/contact',
  ip_address TEXT DEFAULT '',
  user_agent TEXT DEFAULT '',
  status TEXT NOT NULL DEFAULT 'NEW' CHECK(status IN ('NEW', 'IN_PROGRESS', 'RESOLVED', 'ARCHIVED')),
  admin_notes TEXT DEFAULT '',
  handled_by_user_id INTEGER REFERENCES admin_users(id) ON DELETE SET NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  deleted_at TEXT DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS form_submission_audit_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  submission_id INTEGER NOT NULL REFERENCES form_submissions(id) ON DELETE CASCADE,
  actor_username TEXT NOT NULL,
  action TEXT NOT NULL,
  previous_status TEXT,
  new_status TEXT,
  notes TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_submissions_ref ON form_submissions(reference_code);
CREATE INDEX IF NOT EXISTS idx_submissions_type ON form_submissions(form_type);
CREATE INDEX IF NOT EXISTS idx_submissions_status ON form_submissions(status);
CREATE INDEX IF NOT EXISTS idx_submissions_created_at ON form_submissions(created_at);
CREATE INDEX IF NOT EXISTS idx_submissions_deleted_at ON form_submissions(deleted_at);
CREATE INDEX IF NOT EXISTS idx_submission_audit_id ON form_submission_audit_logs(submission_id);
