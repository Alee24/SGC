import { NextRequest, NextResponse } from "next/server";
import {
  generateSeniorSchoolApplicationPdf,
  getBlankApplicationPdf,
} from "@/lib/pdf/generateSeniorSchoolApplicationPdf";
import { normaliseApplication } from "@/lib/applicationValidation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Blank official form (print & fill). */
export async function GET() {
  try {
    const bytes = await getBlankApplicationPdf();
    return new NextResponse(Buffer.from(bytes), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="SGC-Senior-School-Grade10-Application-Form.pdf"',
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (err) {
    console.error("[pdf] blank form failed:", err);
    return NextResponse.json(
      { error: "The blank form is temporarily unavailable. Please call 0707 900 852 to request a copy." },
      { status: 500 }
    );
  }
}

/** Preview/download a filled form from the current (unsaved) wizard data. */
export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "The form data could not be read. Please try again." }, { status: 400 });
  }
  try {
    const bytes = await generateSeniorSchoolApplicationPdf(normaliseApplication(body));
    return new NextResponse(Buffer.from(bytes), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="Starehe-Grade10-Application-Draft.pdf"',
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    console.error("[pdf] draft pdf failed:", err);
    return NextResponse.json(
      { error: "The PDF could not be generated from your answers. Please check the photo is a JPG/PNG and try again." },
      { status: 500 }
    );
  }
}

