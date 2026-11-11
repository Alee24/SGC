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
    console.error("Global system error captured:", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen bg-stone-100 flex items-center justify-center p-4 font-sans text-stone-900">
        <div className="max-w-md w-full bg-white rounded-2xl border border-stone-200 shadow-lg p-8 text-center">
          <div className="w-12 h-12 rounded-full bg-red-100 text-red-800 mx-auto flex items-center justify-center mb-4 text-xl font-bold">
            !
          </div>
          <h1 className="text-xl font-bold text-stone-900 mb-2">
            Starehe Girls&apos; Centre
          </h1>
          <p className="text-sm text-stone-600 mb-6">
            The application experienced an unexpected interruption. Please refresh to restore the session.
          </p>
          <div className="flex justify-center gap-3">
            <button
              onClick={() => reset()}
              className="px-5 py-2.5 bg-[#8b1e22] text-white rounded-full text-xs font-semibold hover:bg-[#751e22] transition-colors"
            >
              Reload Starehe Portal
            </button>
            <a
              href="/"
              className="px-5 py-2.5 border border-stone-300 text-stone-700 rounded-full text-xs font-semibold hover:bg-stone-50 transition-colors"
            >
              Go to Homepage
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
