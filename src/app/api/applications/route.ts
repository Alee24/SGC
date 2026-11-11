import { NextRequest, NextResponse } from "next/server";
import { createApplication, listApplications } from "@/lib/db";
import { getAdminSessionFromCookies, signDownloadToken } from "@/lib/auth";
import { normaliseApplication, validateApplication } from "@/lib/applicationValidation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Public: submit a Grade 10 application. */
export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "We could not read the form data. Please refresh the page and submit again." },
      { status: 400 }
    );
  }

  const data = normaliseApplication(body);
  const errors = validateApplication(data);
  if (Object.keys(errors).length) {
    return NextResponse.json(
      {
        error: "Some required details are missing or incorrect. Please review the highlighted fields.",
        fieldErrors: errors,
      },
      { status: 422 }
    );
  }

  try {
    const app = await createApplication(data);
    return NextResponse.json(
      {
        id: app.id,
        applicationNumber: app.applicationNumber,
        downloadToken: signDownloadToken(app.applicationNumber),
        createdAt: app.createdAt,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("[applications] create failed:", err);
    return NextResponse.json(
      {
        error:
          "Your application could not be saved right now. Your answers are still on this page — please try again in a minute or download the completed PDF and submit it physically.",
      },
      { status: 500 }
    );
  }
}

/** Admin: list applications with filters + summary stats. */
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
    const all = await listApplications();
    const filtered = await listApplications({
      search: sp.get("search") || undefined,
      category: sp.get("category") || undefined,
      pathway: sp.get("pathway") || undefined,
      status: sp.get("status") || undefined,
    });
    const stats = {
      total: all.length,
      pending: all.filter((a) => a.status === "PENDING" || a.status === "UNDER_REVIEW").length,
      shortlisted: all.filter((a) => a.status === "SHORTLISTED" || a.status === "HOME_VISIT_REQUIRED").length,
      approved: all.filter((a) => a.status === "APPROVED").length,
      sponsored: all.filter((a) => a.category === "SPONSORED").length,
      selfSponsored: all.filter((a) => a.category === "SELF_SPONSORED").length,
    };
    // Strip heavy photo payload from list view
    const items = filtered.map(({ passportPhotoDataUrl, ...rest }) => ({
      ...rest,
      hasPhoto: Boolean(passportPhotoDataUrl),
    }));
    return NextResponse.json({ items, stats });
  } catch (err) {
    console.error("[applications] list failed:", err);
    return NextResponse.json(
      { error: "Applications could not be loaded from the database. Please retry; if it persists check the server logs." },
      { status: 500 }
    );
  }
}

