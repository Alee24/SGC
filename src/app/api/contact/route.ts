import { NextRequest, NextResponse } from "next/server";
import { createFormSubmission } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Public: submit and log a contact inquiry from /contact. */
export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "We could not read your message details. Please refresh the page and submit again." },
      { status: 400 }
    );
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  const category = typeof body.category === "string" && body.category.trim()
    ? body.category.trim()
    : "General Inquiry";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  const fieldErrors: Record<string, string> = {};
  if (name.length < 2) {
    fieldErrors.name = "Please enter your full name (at least 2 characters).";
  }
  if (!EMAIL_RE.test(email)) {
    fieldErrors.email = "Please enter a valid email address so our team can reply.";
  }
  if (message.length < 5) {
    fieldErrors.message = "Please enter a clear message (at least 5 characters).";
  }

  if (Object.keys(fieldErrors).length > 0) {
    const firstMsg = Object.values(fieldErrors)[0];
    return NextResponse.json(
      { error: firstMsg, fieldErrors },
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
      formType: "CONTACT",
      category,
      submitterName: name,
      submitterEmail: email,
      submitterPhone: phone,
      subject: `Contact Inquiry: ${category}`,
      message,
      payload: { name, email, phone, category, message },
      sourcePath: "/contact",
      ipAddress,
      userAgent,
    });

    return NextResponse.json(
      {
        id: saved.id,
        referenceCode: saved.referenceCode,
        createdAt: saved.createdAt,
        message: "Your inquiry has been logged and routed to our administrative team.",
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("[contact] submission log failed:", err);
    return NextResponse.json(
      {
        error:
          "We could not save your inquiry right now. Kindly call us directly on 0707 900 852 or try again shortly.",
      },
      { status: 500 }
    );
  }
}
