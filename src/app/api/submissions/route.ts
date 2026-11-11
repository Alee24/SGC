import { NextRequest, NextResponse } from "next/server";
import { createFormSubmission, listFormSubmissions } from "@/lib/db";
import { getAdminSessionFromCookies } from "@/lib/auth";
import { FormSubmissionType } from "@/types/application";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ALLOWED_TYPES: FormSubmissionType[] = [
  "CONTACT",
  "ADMISSIONS_APPLICATION",
  "GIVING_PLEDGE",
  "GENERAL_FORM",
];

/** Public: log any submitted website form cleanly in SQLite. */
export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Unable to parse form payload. Please refresh and submit again." },
      { status: 400 }
    );
  }

  const rawType = typeof body.formType === "string" ? body.formType : "GENERAL_FORM";
  const formType: FormSubmissionType = ALLOWED_TYPES.includes(rawType as FormSubmissionType)
    ? (rawType as FormSubmissionType)
    : "GENERAL_FORM";

  const submitterName =
    typeof body.submitterName === "string"
      ? body.submitterName.trim()
      : typeof body.name === "string"
      ? body.name.trim()
      : "";
  const submitterEmail =
    typeof body.submitterEmail === "string"
      ? body.submitterEmail.trim()
      : typeof body.email === "string"
      ? body.email.trim()
      : "";
  const submitterPhone =
    typeof body.submitterPhone === "string"
      ? body.submitterPhone.trim()
      : typeof body.phone === "string"
      ? body.phone.trim()
      : "";
  const category =
    typeof body.category === "string" && body.category.trim()
      ? body.category.trim()
      : "General Form";
  const subject =
    typeof body.subject === "string" && body.subject.trim()
      ? body.subject.trim()
      : `${formType}: ${category}`;
  const message =
    typeof body.message === "string" && body.message.trim()
      ? body.message.trim()
      : JSON.stringify(body.payload || body);
  const sourcePath =
    typeof body.sourcePath === "string" && body.sourcePath.trim()
      ? body.sourcePath.trim()
      : "/";

  if (submitterName.length < 2) {
    return NextResponse.json(
      { error: "Please include the submitter's full name (at least 2 characters)." },
      { status: 422 }
    );
  }

  const ipAddress =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "";
  const userAgent = req.headers.get("user-agent") || "";

  try {
    const saved = await createFormSubmission({
      formType,
      category,
      submitterName,
      submitterEmail,
      submitterPhone,
      subject,
      message,
      payload:
        body.payload && typeof body.payload === "object"
          ? (body.payload as Record<string, unknown>)
          : body,
      sourcePath,
      ipAddress,
      userAgent,
    });

    return NextResponse.json(
      {
        id: saved.id,
        referenceCode: saved.referenceCode,
        createdAt: saved.createdAt,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("[submissions] create failed:", err);
    return NextResponse.json(
      { error: "Could not record form submission at this time. Please retry." },
      { status: 500 }
    );
  }
}

/** Admin: list all logged form submissions with filtering + summary stats. */
export async function GET(req: NextRequest) {
  const session = getAdminSessionFromCookies();
  if (!session) {
    return NextResponse.json(
      { error: "Your admin session has expired. Please sign in again." },
      { status: 401 }
    );
  }

  const sp = req.nextUrl.searchParams;
  try {
    const all = await listFormSubmissions();
    const filtered = await listFormSubmissions({
      search: sp.get("search") || undefined,
      formType: sp.get("formType") || undefined,
      status: sp.get("status") || undefined,
    });

    const stats = {
      total: all.length,
      newCount: all.filter((s) => s.status === "NEW").length,
      inProgress: all.filter((s) => s.status === "IN_PROGRESS").length,
      resolved: all.filter((s) => s.status === "RESOLVED").length,
      contactCount: all.filter((s) => s.formType === "CONTACT").length,
    };

    return NextResponse.json({ items: filtered, stats });
  } catch (err) {
    console.error("[submissions] list failed:", err);
    return NextResponse.json(
      { error: "Unable to load form submission logs from database." },
      { status: 500 }
    );
  }
}
