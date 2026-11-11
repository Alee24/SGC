import crypto from "crypto";
import { cookies } from "next/headers";

const SESSION_COOKIE_NAME = "starehe_admin_session";
// In production, ADMIN_SESSION_SECRET env var should be set in Docker/Compose
const SESSION_SECRET =
  process.env.ADMIN_SESSION_SECRET || "starehe-girls-centre-2026-admissions-hmac-secret-key";

export interface AdminSessionPayload {
  userId: number;
  username: string;
  fullName: string;
  role: "SUPER_ADMIN" | "ADMISSIONS_OFFICER" | "REVIEWER";
  exp: number;
}

export function hashPassword(password: string, salt?: string): string {
  const actualSalt = salt || crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, actualSalt, 100000, 64, "sha512")
    .toString("hex");
  return `${actualSalt}:${hash}`;
}

export function verifyPassword(password: string, storedHash: string): boolean {
  const parts = storedHash.split(":");
  if (parts.length !== 2) return false;
  const [salt, originalHash] = parts;
  const derived = crypto
    .pbkdf2Sync(password, salt, 100000, 64, "sha512")
    .toString("hex");
  return crypto.timingSafeEqual(Buffer.from(derived, "hex"), Buffer.from(originalHash, "hex"));
}

export function signSessionToken(payload: Omit<AdminSessionPayload, "exp">): string {
  const fullPayload: AdminSessionPayload = {
    ...payload,
    exp: Date.now() + 1000 * 60 * 60 * 12, // 12 hours
  };
  const encoded = Buffer.from(JSON.stringify(fullPayload)).toString("base64url");
  const sig = crypto
    .createHmac("sha256", SESSION_SECRET)
    .update(encoded)
    .digest("base64url");
  return `${encoded}.${sig}`;
}

export function verifySessionToken(token: string | undefined | null): AdminSessionPayload | null {
  if (!token || typeof token !== "string") return null;
  const parts = token.split(".");
  if (parts.length !== 2) return null;
  const [encoded, sig] = parts;
  const expectedSig = crypto
    .createHmac("sha256", SESSION_SECRET)
    .update(encoded)
    .digest("base64url");

  try {
    const a = Buffer.from(sig);
    const b = Buffer.from(expectedSig);
    if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
      return null;
    }
    const decoded = JSON.parse(Buffer.from(encoded, "base64url").toString("utf8")) as AdminSessionPayload;
    if (!decoded.exp || decoded.exp < Date.now()) {
      return null;
    }
    return decoded;
  } catch {
    return null;
  }
}

export function getAdminSessionFromCookies(): AdminSessionPayload | null {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    return verifySessionToken(token);
  } catch {
    return null;
  }
}

export { SESSION_COOKIE_NAME };

/** Applicant download token: lets the family re-download their own completed form. */
export function signDownloadToken(applicationNumber: string): string {
  return crypto
    .createHmac("sha256", SESSION_SECRET)
    .update(`download:${applicationNumber}`)
    .digest("base64url")
    .slice(0, 32);
}

export function verifyDownloadToken(applicationNumber: string, token: string | null): boolean {
  if (!token) return false;
  const expected = signDownloadToken(applicationNumber);
  const a = Buffer.from(token);
  const b = Buffer.from(expected);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

