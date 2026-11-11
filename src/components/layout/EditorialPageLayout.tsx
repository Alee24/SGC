import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronRight,
  Home,
  Phone,
  Mail,
  HeartHandshake,
  FileText,
  Award,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export interface SidebarLink {
  label: string;
  href: string;
  active?: boolean;
}

export interface FactItem {
  label: string;
  value: string;
}

interface EditorialPageLayoutProps {
  breadcrumbs: { label: string; href?: string }[];
  kicker: string;
  title: string;
  description: string;
  heroFacts?: FactItem[];
  sidebarTitle?: string;
  sidebarLinks?: SidebarLink[];
  children: React.ReactNode;
}

export const EditorialPageLayout: React.FC<EditorialPageLayoutProps> = ({
  breadcrumbs,
  kicker,
  title,
  description,
  heroFacts,
  sidebarTitle = "In This Section",
  sidebarLinks,
  children,
}) => {
  return (
    <div className="bg-[#faf8f5] min-h-screen">
      {/* 1. EDITORIAL HERO HEADER */}
      <section className="relative bg-starehe-blue-950 text-white overflow-hidden border-b-4 border-starehe-maroon-800">
        {/* Subtle Watermark Crest */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 pointer-events-none hidden lg:block">
          <Image
            src="/images/brand/logo.png"
            alt="Starehe Crest Watermark"
            fill
            className="object-contain object-right"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-starehe-blue-950 via-starehe-blue-950/95 to-starehe-blue-900/80" />

        <div className="relative z-10 w-[92%] md:w-[90%] max-w-[1680px] mx-auto pt-8 pb-14 sm:pb-16">
          {/* Integrated Breadcrumb Trail */}
          <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-300">
            <Link
              href="/"
              className="flex items-center space-x-1 hover:text-starehe-gold-300 transition-colors"
            >
              <Home className="w-3.5 h-3.5 text-starehe-gold-accent" />
              <span>Home</span>
            </Link>
            {breadcrumbs.map((b, idx) => {
              const isLast = idx === breadcrumbs.length - 1;
              return (
                <React.Fragment key={idx}>
                  <ChevronRight className="w-3 h-3 text-slate-500" />
                  {isLast || !b.href ? (
                    <span className="text-starehe-gold-300 font-semibold truncate max-w-xs sm:max-w-md">
                      {b.label}
                    </span>
                  ) : (
                    <Link
                      href={b.href}
                      className="hover:text-starehe-gold-300 transition-colors truncate max-w-xs sm:max-w-md"
                    >
                      {b.label}
                    </Link>
                  )}
                </React.Fragment>
              );
            })}
          </nav>

          {/* Hero Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold bg-starehe-gold-accent/15 text-starehe-gold-200 border border-starehe-gold-accent/30 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-starehe-gold-accent" />
                <span>{kicker}</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
                {title}
              </h1>

              <p className="mt-4 text-sm sm:text-base text-slate-200 leading-relaxed font-light max-w-3xl">
                {description}
              </p>
            </div>

            {/* Optional Right Facts Box */}
            {heroFacts && heroFacts.length > 0 && (
              <div className="lg:col-span-4 bg-starehe-blue-900/90 rounded-2xl p-5 border border-white/15 shadow-elevation">
                <div className="text-xs font-bold text-starehe-gold-300 mb-3 flex items-center space-x-2">
                  <Award className="w-4 h-4 text-starehe-gold-accent" />
                  <span>Institutional Highlights</span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  {heroFacts.map((fact, i) => (
                    <div key={i} className="p-2.5 rounded-lg bg-starehe-blue-950/80 border border-white/10">
                      <div className="text-[11px] text-slate-300 font-medium">
                        {fact.label}
                      </div>
                      <div className="font-serif font-bold text-white text-sm mt-0.5">
                        {fact.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 2. MAIN EDITORIAL CONTENT + FLOATED SIDEBAR (Content spreads 100% full width below Campus Help Desk) */}
      <section className="py-10 sm:py-14">
        <div className="w-[92%] md:w-[90%] max-w-[1680px] mx-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-subtle flex flex-col-reverse gap-8 lg:block lg:flow-root">
            {/* Floated Sidebar (Top-right on desktop, stacked cleanly below main on mobile) */}
            <aside className="lg:float-right lg:w-[32%] xl:w-[30%] lg:ml-10 lg:mb-8 space-y-6">
              {/* Sidebar Navigation */}
              {sidebarLinks && sidebarLinks.length > 0 && (
                <div className="bg-slate-50/70 rounded-2xl p-6 border border-slate-200/90 shadow-subtle">
                  <h3 className="font-serif text-base font-bold text-starehe-blue-950 pb-3 border-b border-slate-200/70 mb-4 flex items-center justify-between">
                    <span>{sidebarTitle}</span>
                    <span className="w-2 h-2 rounded-full bg-starehe-maroon-700" />
                  </h3>
                  <ul className="space-y-1.5 text-xs font-semibold">
                    {sidebarLinks.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                            link.active
                              ? "bg-starehe-maroon-50 text-starehe-maroon-900 border-l-4 border-starehe-maroon-800 font-bold"
                              : "text-slate-700 hover:text-starehe-blue-950 hover:bg-white"
                          }`}
                        >
                          <span>{link.label}</span>
                          <ChevronRight
                            className={`w-3.5 h-3.5 ${
                              link.active ? "text-starehe-maroon-800" : "text-slate-400"
                            }`}
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Blue Form / Admissions Callout */}
              <div className="bg-starehe-blue-950 text-white rounded-2xl p-6 shadow-elevation border border-starehe-blue-900 relative overflow-hidden">
                <div className="w-10 h-10 rounded-xl bg-starehe-maroon-700 text-white flex items-center justify-center mb-3">
                  <FileText className="w-5 h-5" />
                </div>
                <h4 className="font-serif text-lg font-bold text-white mb-1">
                  Form 1 Blue Form Admissions
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  Admitting 200 girls annually (75% on full charitable scholarships).
                  The official Blue Application Form is strictly free of charge.
                </p>
                <Link
                  href="/admissions/form-one"
                  className="inline-flex items-center space-x-1.5 w-full justify-center py-2.5 rounded-full bg-starehe-gold-accent hover:bg-starehe-gold-400 text-starehe-blue-950 font-bold text-xs tracking-wide transition-colors"
                >
                  <span>Blue Form Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Support a Cause Card */}
              <div className="bg-starehe-maroon-900 text-white rounded-2xl p-6 shadow-elevation border border-starehe-maroon-800">
                <div className="w-10 h-10 rounded-xl bg-white/10 text-starehe-gold-300 flex items-center justify-center mb-3">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <h4 className="font-serif text-lg font-bold text-white mb-1">
                  Sponsor a Disadvantaged Girl
                </h4>
                <p className="text-xs text-starehe-maroon-100 leading-relaxed mb-4">
                  Enable a brilliant young woman from a vulnerable background to receive
                  comprehensive secondary education, medical care, and residential dignity.
                </p>
                <Link
                  href="/giving"
                  className="inline-flex items-center space-x-1.5 w-full justify-center py-2.5 rounded-full bg-white hover:bg-slate-50 text-starehe-maroon-900 font-bold text-xs tracking-wide transition-colors"
                >
                  <span>Support a Cause</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Official Contact Box */}
              <div className="bg-slate-50/70 rounded-2xl p-6 border border-slate-200/90 shadow-subtle text-xs text-slate-700 space-y-3">
                <h4 className="font-serif text-sm font-bold text-starehe-blue-950 pb-2 border-b border-slate-200/70">
                  Campus Help Desk
                </h4>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-starehe-blue-900 flex-shrink-0" />
                  <span>
                    Hotlines:{" "}
                    <a href="tel:0707900852" className="font-bold hover:underline">
                      0707 900 852
                    </a>{" "}
                    /{" "}
                    <a href="tel:0738255448" className="font-bold hover:underline">
                      0738 255 448
                    </a>
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-starehe-maroon-700 flex-shrink-0" />
                  <a
                    href="mailto:info@starehegirlscentre.co.ke"
                    className="hover:underline text-starehe-blue-900 font-medium"
                  >
                    info@starehegirlscentre.co.ke
                  </a>
                </div>
              </div>
            </aside>

            {/* Main Content Area — wraps cleanly beside sidebar and expands 100% below Campus Help Desk */}
            <main className="editorial-main min-w-0">
              {children}
            </main>
          </div>
        </div>
      </section>
    </div>
  );
};
