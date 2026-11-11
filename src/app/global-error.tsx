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
    // Automatic recovery for ChunkLoadError or stale cached bundles
    if (
      typeof window !== "undefined" &&
      (error?.message?.includes("Loading chunk") ||
        error?.name === "ChunkLoadError" ||
        error?.message?.includes("Failed to fetch dynamically imported module") ||
        error?.message?.includes("CSS chunk"))
    ) {
      const reloadKey = "starehe_chunk_reload";
      const lastReload = sessionStorage.getItem(reloadKey);
      const now = Date.now();
      // Reload automatically if not done in the last 10 seconds to avoid reload loop
      if (!lastReload || now - parseInt(lastReload, 10) > 10000) {
        sessionStorage.setItem(reloadKey, now.toString());
        window.location.reload();
      }
    }
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen bg-[#faf8f5] flex items-center justify-center p-6 text-slate-900 font-sans">
        <div className="max-w-xl mx-auto w-full bg-white rounded-2xl border border-stone-200 shadow-sm p-8 space-y-4 text-center sm:text-left">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#8b1e22]">
            Starehe Girls&apos; Centre • Official Portal Notice
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#0c2340]">
            System Refresh Required
          </h1>
          <p className="text-sm text-stone-600 leading-relaxed">
            The portal was recently updated with fresh academic records. Please refresh your browser to load the latest institutional assets.
          </p>
          <div className="pt-2 flex flex-wrap gap-3 justify-center sm:justify-start">
            <button
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.location.reload();
                } else {
                  reset();
                }
              }}
              className="px-5 py-2.5 bg-[#8b1e22] text-white rounded-full text-xs font-semibold hover:bg-[#751e22] transition-colors"
            >
              Refresh Portal
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
