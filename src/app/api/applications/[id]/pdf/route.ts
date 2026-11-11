import { NextRequest, NextResponse } from "next/server";
import { getApplicationById, getApplicationByNumber } from "@/lib/db";
import { getAdminSessionFromCookies, verifyDownloadToken } from "@/lib/auth";
import { generateSeniorSchoolApplicationPdf } from "@/lib/pdf/generateSeniorSchoolApplicationPdf";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const safeName = (s: string) => s.replace(/[^A-Za-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60);

/**
 * Completed form PDF for a stored application.
 * Admins: authenticated by session cookie.
 * Applicants: `?token=` issued at submission time.
 */
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const session = getAdminSessionFromCookies();
  const token = req.nextUrl.searchParams.get("token");

  const app = /^\d+$/.test(params.id)
    ? await getApplicationById(Number(params.id))
    : await getApplicationByNumber(params.id);

  if (!app) {
    return NextResponse.json({ error: "We could not find that application." }, { status: 404 });
  }
  if (!session && !verifyDownloadToken(app.applicationNumber, token)) {
    return NextResponse.json(
      { error: "This download link is invalid. Use the link shown after submitting, or contact the admissions office." },
      { status: 403 }
    );
  }

  try {
    const bytes = await generateSeniorSchoolApplicationPdf(app, session ? app : { ...app, status: "PENDING", adminRemarks: "", knecArtsScore: "", knecSocialScore: "", knecStemScore: "", reviewedBy: null });
    const filename = `Starehe-Grade10-${app.applicationNumber}-${safeName(app.fullName)}.pdf`;
    return new NextResponse(Buffer.from(bytes), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    console.error("[pdf] application pdf failed:", err);
    return NextResponse.json(
      { error: "The PDF could not be generated. Please try again; the application itself is safely saved." },
      { status: 500 }
    );
  }
}

