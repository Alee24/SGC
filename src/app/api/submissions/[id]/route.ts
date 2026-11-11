import { NextRequest, NextResponse } from "next/server";
import { getAdminSessionFromCookies } from "@/lib/auth";
import {
  getFormSubmissionAuditLogs,
  getFormSubmissionById,
  softDeleteFormSubmission,
  updateFormSubmissionStatus,
} from "@/lib/db";
import { FormSubmissionStatus } from "@/types/application";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ALLOWED_STATUS: FormSubmissionStatus[] = ["NEW", "IN_PROGRESS", "RESOLVED", "ARCHIVED"];

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = getAdminSessionFromCookies();
  if (!session) {
    return NextResponse.json(
      { error: "Your admin session has expired. Please sign in again." },
      { status: 401 }
    );
  }
  const id = Number(params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return NextResponse.json({ error: "Invalid submission ID." }, { status: 400 });
  }
  const item = await getFormSubmissionById(id);
  if (!item) {
    return NextResponse.json({ error: "Submission not found." }, { status: 404 });
  }
  const auditLogs = await getFormSubmissionAuditLogs(id);
  return NextResponse.json({ item, auditLogs });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = getAdminSessionFromCookies();
  if (!session) {
    return NextResponse.json(
      { error: "Your admin session has expired. Please sign in again." },
      { status: 401 }
    );
  }
  const id = Number(params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return NextResponse.json({ error: "Invalid submission ID." }, { status: 400 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
  }

  const statusRaw = typeof body.status === "string" ? body.status : undefined;
  if (statusRaw && !ALLOWED_STATUS.includes(statusRaw as FormSubmissionStatus)) {
    return NextResponse.json({ error: "Invalid submission status." }, { status: 422 });
  }

  const updated = await updateFormSubmissionStatus(
    id,
    {
      status: statusRaw as FormSubmissionStatus | undefined,
      adminNotes: typeof body.adminNotes === "string" ? body.adminNotes : undefined,
    },
    { userId: session.userId, username: session.username }
  );

  if (!updated) {
    return NextResponse.json({ error: "Submission not found." }, { status: 404 });
  }
  return NextResponse.json({ item: updated });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = getAdminSessionFromCookies();
  if (!session) {
    return NextResponse.json(
      { error: "Your admin session has expired. Please sign in again." },
      { status: 401 }
    );
  }
  const id = Number(params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return NextResponse.json({ error: "Invalid submission ID." }, { status: 400 });
  }
  const ok = await softDeleteFormSubmission(id, {
    userId: session.userId,
    username: session.username,
  });
  if (!ok) {
    return NextResponse.json({ error: "Submission not found." }, { status: 404 });
  }
  return NextResponse.json({ archived: true });
}
