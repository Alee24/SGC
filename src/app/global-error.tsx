"use client";

import React, { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global system diagnostic:", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen bg-[#faf8f5] flex items-center p-6 text-slate-900">
        <div className="max-w-xl mx-auto w-full bg-white rounded-2xl border border-stone-200 shadow-sm p-8 space-y-4">
          <div className="text-xs font-semibold text-[#8b1e22]">
            Starehe Girls&apos; Centre • System Notice
          </div>
          <h1 className="font-serif text-2xl font-bold text-[#0c2340]">
            Portal Temporarily Offline
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            The application experienced an unexpected interruption. Please reload the portal to resume your session.
          </p>
          <div className="pt-2 flex gap-3">
            <button
              onClick={() => reset()}
              className="px-5 py-2.5 bg-[#8b1e22] text-white rounded-full text-xs font-semibold hover:bg-[#751e22] transition-colors"
            >
              Reload Starehe Portal
            </button>
            <a
              href="/"
              className="px-5 py-2.5 border border-stone-300 text-[#0c2340] rounded-full text-xs font-semibold hover:bg-stone-50 transition-colors"
            >
              Return Home
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
