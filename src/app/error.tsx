"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { RefreshCw, Home, Phone, Mail, AlertTriangle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log technical diagnostics internally
    console.error("Application runtime error captured:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] bg-stone-50 flex items-center justify-center px-4 py-16">
      <div className="max-w-xl w-full bg-white rounded-2xl border border-stone-200 shadow-sm p-8 sm:p-10 text-center">
        <div className="w-14 h-14 rounded-full bg-starehe-maroon-50 text-starehe-maroon-800 mx-auto flex items-center justify-center mb-5">
          <AlertTriangle className="w-7 h-7" />
        </div>

        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-stone-100 text-stone-700 mb-3">
          Institutional Service Recovery
        </span>

        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-starehe-blue-950">
          Page Temporarily Unavailable
        </h1>

        <p className="mt-3 text-sm text-stone-600 leading-relaxed">
          The requested page could not be compiled or loaded at this moment. Our team has been notified.
          You can attempt to refresh the view or navigate back to the main portal.
        </p>

        {error.digest && (
          <div className="mt-4 p-2.5 rounded bg-stone-100 font-mono text-[11px] text-stone-500 inline-block">
            Reference Incident Code: {error.digest}
          </div>
        )}

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => reset()}
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-starehe-maroon-800 hover:bg-starehe-maroon-700 text-white font-semibold text-xs tracking-wide transition-colors shadow-sm"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reload Page</span>
          </button>

          <Link
            href="/"
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full border border-stone-300 bg-white hover:bg-stone-50 text-starehe-blue-950 font-semibold text-xs tracking-wide transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Return to Homepage</span>
          </Link>
        </div>

        <div className="mt-8 pt-6 border-t border-stone-200 text-xs text-stone-600 flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className="flex items-center space-x-1.5">
            <Phone className="w-3.5 h-3.5 text-starehe-blue-900" />
            <span>Help Desk: <a href="tel:0707900852" className="font-semibold underline">0707 900 852</a></span>
          </div>
          <div className="flex items-center space-x-1.5">
            <Mail className="w-3.5 h-3.5 text-starehe-maroon-800" />
            <span>Support: <a href="mailto:info@starehegirlscentre.co.ke" className="font-semibold underline">info@starehegirlscentre.co.ke</a></span>
          </div>
        </div>
      </div>
    </div>
  );
}
