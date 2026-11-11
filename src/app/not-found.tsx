import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Home, Phone, Mail, ArrowRight, Search, FileText } from "lucide-react";

export default function NotFound() {
  return (
    <div className="bg-[#faf8f5] min-h-[75vh] flex items-center py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="bg-white rounded-3xl border border-stone-200/90 shadow-subtle p-8 sm:p-12 md:p-16 grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-7 space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold bg-starehe-maroon-50 text-starehe-maroon-900 border border-starehe-maroon-200">
              <span className="w-1.5 h-1.5 rounded-full bg-starehe-maroon-800" />
              <span>Reference: HTTP 404 • Page Not Located</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-starehe-blue-950 leading-tight">
              Institutional Document Not Located
            </h1>

            <p className="text-sm text-stone-600 leading-relaxed">
              The page or publication you requested may have moved to an updated section, been superseded by a recent school calendar revision, or the link typed is incomplete.
            </p>

            <div className="pt-2 flex flex-wrap gap-3">
              <Link
                href="/"
                className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-starehe-blue-950 hover:bg-starehe-blue-900 text-white font-semibold text-xs tracking-wide transition-colors shadow-sm"
              >
                <Home className="w-3.5 h-3.5 text-starehe-gold-accent" />
                <span>Return to Homepage</span>
              </Link>
              <Link
                href="/admissions/form-one"
                className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full border border-stone-300 bg-white hover:bg-stone-50 text-starehe-blue-950 font-semibold text-xs tracking-wide transition-colors"
              >
                <FileText className="w-3.5 h-3.5 text-starehe-maroon-800" />
                <span>Form 1 Blue Form</span>
              </Link>
            </div>
          </div>

          <div className="md:col-span-5 bg-stone-50 rounded-2xl p-6 border border-stone-200/80 space-y-4 text-xs text-stone-700">
            <h2 className="font-serif font-bold text-sm text-starehe-blue-950 pb-2 border-b border-stone-200">
              Direct Inquiries
            </h2>
            <p className="text-stone-600 leading-relaxed">
              If you require immediate verification regarding admissions, exam results, or school tenders, reach our administration desk:
            </p>
            <div className="space-y-2 pt-1 font-medium">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-starehe-blue-900 flex-shrink-0" />
                <span>Hotlines: <a href="tel:0707900852" className="underline font-bold">0707 900 852</a> / <a href="tel:0738255448" className="underline font-bold">0738 255 448</a></span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-starehe-maroon-800 flex-shrink-0" />
                <a href="mailto:info@starehegirlscentre.co.ke" className="underline font-bold">info@starehegirlscentre.co.ke</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
