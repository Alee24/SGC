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
    console.error("Starehe runtime diagnostic:", error);
  }, [error]);

  return (
    <div className="min-h-[75vh] bg-[#faf8f5] flex items-center py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto w-full bg-white rounded-2xl border border-stone-200/90 shadow-subtle p-8 sm:p-12">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 rounded-xl bg-starehe-maroon-50 text-starehe-maroon-800 flex items-center justify-center flex-shrink-0 mt-1">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div className="space-y-3">
            <div className="text-xs font-semibold text-starehe-maroon-900">
              Institutional Service Notice
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-starehe-blue-950">
              Requested Document Could Not Be Assembled
            </h1>
            <p className="text-sm text-stone-600 leading-relaxed max-w-xl">
              An unexpected system interruption prevented this page from rendering completely. The school technical administration has received diagnostic telemetry.
            </p>

            {error.digest && (
              <div className="py-1 px-2.5 rounded bg-stone-100 font-mono text-[11px] text-stone-600 inline-block">
                Reference ID: {error.digest}
              </div>
            )}

            <div className="pt-4 flex flex-wrap gap-3">
              <button
                onClick={() => reset()}
                className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-starehe-maroon-800 hover:bg-starehe-maroon-700 text-white font-semibold text-xs tracking-wide transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Retry Rendering</span>
              </button>
              <Link
                href="/"
                className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full border border-stone-300 bg-white hover:bg-stone-50 text-starehe-blue-950 font-semibold text-xs tracking-wide transition-colors"
              >
                <Home className="w-3.5 h-3.5 text-starehe-gold-accent" />
                <span>Return to Portal</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-stone-100 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-stone-600">
          <div className="flex items-center space-x-2">
            <Phone className="w-4 h-4 text-starehe-blue-900" />
            <span>Admissions Desk: <a href="tel:0707900852" className="underline font-bold">0707 900 852</a></span>
          </div>
          <div className="flex items-center space-x-2">
            <Mail className="w-4 h-4 text-starehe-maroon-800" />
            <span>Support: <a href="mailto:info@starehegirlscentre.co.ke" className="underline font-bold">info@starehegirlscentre.co.ke</a></span>
          </div>
        </div>
      </div>
    </div>
  );
}
