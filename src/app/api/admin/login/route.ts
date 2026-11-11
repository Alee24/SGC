import { NextRequest, NextResponse } from "next/server";
import { authenticateAdmin } from "@/lib/db";
import { SESSION_COOKIE_NAME, signSessionToken } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Simple in-memory brute-force throttle per IP
const attempts = new Map<string, { count: number; until: number }>();

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "local";
  const rec = attempts.get(ip);
  if (rec && rec.until > Date.now() && rec.count >= 5) {
    const mins = Math.ceil((rec.until - Date.now()) / 60000);
    return NextResponse.json(
      { error: `Too many failed sign-in attempts. Please wait ${mins} minute(s) and try again.` },
      { status: 429 }
    );
  }

  let body: { username?: string; password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Enter your username and password." }, { status: 400 });
  }
  if (!body.username || !body.password) {
    return NextResponse.json({ error: "Enter both your username and password." }, { status: 400 });
  }

  const user = await authenticateAdmin(body.username, body.password);
  if (!user) {
    const next = rec && rec.until > Date.now() ? rec.count + 1 : 1;
    attempts.set(ip, { count: next, until: Date.now() + 15 * 60 * 1000 });
    return NextResponse.json(
      { error: "The username or password is incorrect. Check for typos and caps lock, then try again." },
      { status: 401 }
    );
  }
  attempts.delete(ip);

  const token = signSessionToken({
    userId: user.id,
    username: user.username,
    fullName: user.fullName,
    role: user.role,
  });
  const res = NextResponse.json({ user });
  res.cookies.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.COOKIE_SECURE === "true",
    path: "/",
    maxAge: 60 * 60 * 12,
  });
  return res;
}

