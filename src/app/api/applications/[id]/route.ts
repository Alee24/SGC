import { NextRequest, NextResponse } from "next/server";
import {
  getApplicationAuditLogs,
  getApplicationById,
  softDeleteApplication,
  updateApplicationReview,
} from "@/lib/db";
import { getAdminSessionFromCookies } from "@/lib/auth";
import type { ApplicationStatus } from "@/types/application";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const STATUSES: ApplicationStatus[] = [
  "PENDING",
  "UNDER_REVIEW",
  "SHORTLISTED",
  "HOME_VISIT_REQUIRED",
  "APPROVED",
  "WAITLISTED",
  "REJECTED",
];

const unauthorized = () =>
  NextResponse.json({ error: "Your admin session has expired. Please sign in again." }, { status: 401 });
const notFound = () =>
  NextResponse.json({ error: "This application no longer exists or has been archived." }, { status: 404 });

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  if (!getAdminSessionFromCookies()) return unauthorized();
  const id = Number(params.id);
  if (!Number.isInteger(id)) return notFound();
  const app = await getApplicationById(id);
  if (!app) return notFound();
  const audit = await getApplicationAuditLogs(id);
  return NextResponse.json({ application: app, audit });
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const session = getAdminSessionFromCookies();
  if (!session) return unauthorized();
  if (session.role === "REVIEWER") {
    return NextResponse.json(
      { error: "Your account can view applications but cannot change decisions. Ask an admissions officer." },
      { status: 403 }
    );
  }
  const id = Number(params.id);
  if (!Number.isInteger(id)) return notFound();

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "The review update could not be read. Please try again." }, { status: 400 });
  }

  const status = body.status as ApplicationStatus | undefined;
  if (status && !STATUSES.includes(status)) {
    return NextResponse.json({ error: `"${status}" is not a valid application status.` }, { status: 422 });
  }

  const s = (v: unknown, max: number) => (v === undefined ? undefined : String(v).slice(0, max));
  const updated = await updateApplicationReview(
    id,
    {
      status,
      adminRemarks: s(body.adminRemarks, 2000),
      knecArtsScore: s(body.knecArtsScore, 20),
      knecSocialScore: s(body.knecSocialScore, 20),
      knecStemScore: s(body.knecStemScore, 20),
    },
    { userId: session.userId, username: session.username }
  );
  if (!updated) return notFound();
  const audit = await getApplicationAuditLogs(id);
  return NextResponse.json({ application: updated, audit });
}

/** Soft delete (archive) – data is preserved with deleted_at. */
export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = getAdminSessionFromCookies();
  if (!session) return unauthorized();
  if (session.role !== "SUPER_ADMIN") {
    return NextResponse.json({ error: "Only a super administrator can archive applications." }, { status: 403 });
  }
  const ok = await softDeleteApplication(Number(params.id), {
    userId: session.userId,
    username: session.username,
  });
  return ok ? NextResponse.json({ archived: true }) : notFound();
}

