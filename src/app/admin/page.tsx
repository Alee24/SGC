import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getAdminSessionFromCookies } from "@/lib/auth";
import AdminDashboard from "./AdminDashboard";

export const metadata: Metadata = {
  title: "Grade 10 Applications | Admissions Portal",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default function AdminPage() {
  const session = getAdminSessionFromCookies();
  if (!session) redirect("/admin/login");
  return <AdminDashboard user={{ username: session.username, fullName: session.fullName, role: session.role }} />;
}

