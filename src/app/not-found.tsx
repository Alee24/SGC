import React from "react";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Compass, Home, Phone, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div>
      <Breadcrumb items={[{ label: "Page Not Found (404)" }]} />

      <section className="py-24 bg-slate-50 min-h-[60vh] flex items-center justify-center">
        <div className="max-w-xl mx-auto px-4 text-center">
          <div className="w-16 h-16 rounded-full bg-starehe-maroon-50 text-starehe-maroon-800 mx-auto flex items-center justify-center mb-6">
            <Compass className="w-8 h-8" />
          </div>

          <div className="font-mono text-sm font-bold text-starehe-maroon-800 uppercase tracking-widest">
            Error 404
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-starehe-blue-950 mt-2">
            Institutional Page Not Found
          </h1>

          <p className="mt-4 text-sm text-slate-600 leading-relaxed">
            The page you are looking for may have been updated, relocated, or is
            temporarily unavailable. Please return to the homepage or explore our main sections below.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-starehe-blue-900 hover:bg-starehe-blue-800 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
            >
              <Home className="w-4 h-4" />
              <span>Return to Homepage</span>
            </Link>
            <Link
              href="/admissions"
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-full border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs uppercase tracking-wider transition-colors"
            >
              <span>Admissions &amp; Blue Form</span>
            </Link>
          </div>

          <div className="mt-8 text-xs text-slate-500">
            Need urgent assistance? Call the school help desk directly at{" "}
            <a href="tel:0707900852" className="text-starehe-blue-900 font-bold underline">
              0707 900 852
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
