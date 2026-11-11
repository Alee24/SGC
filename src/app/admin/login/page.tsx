import React, { Suspense } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";
import { getAdminSessionFromCookies } from "@/lib/auth";
import AdminLoginForm from "./AdminLoginForm";

export const metadata: Metadata = {
  title: "Admissions Portal Sign In",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default function AdminLoginPage() {
  if (getAdminSessionFromCookies()) redirect("/admin");

  return (
    <div className="min-h-[70vh] bg-starehe-cream flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md bg-white rounded-xl border border-stone-200 shadow-subtle p-7 sm:p-9">
        <div className="flex items-center gap-3 mb-6">
          <Image src="/images/brand/logo-crest.png" alt="" width={44} height={44} className="h-11 w-auto" />
          <div>
            <h1 className="font-serif text-xl font-bold text-starehe-blue-900">Admissions portal</h1>
            <p className="text-xs text-stone-500">Staff sign-in · Grade 10 applications</p>
          </div>
        </div>
        <Suspense fallback={null}>
          <AdminLoginForm />
        </Suspense>
        <p className="mt-6 text-xs text-stone-500 leading-relaxed">
          This area is restricted to authorised Starehe Girls&apos; Centre admissions staff. Sign-in attempts are logged.
        </p>
      </div>
    </div>
  );
}

