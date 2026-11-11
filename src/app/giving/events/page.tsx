import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SCHOOL_INFO } from "@/data/school-data";
import { Calendar, Sparkles, Trophy, Users, HeartHandshake, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Annual Charity Events | Charity Golf, Walk & Gala Dinner",
  description:
    "Annual fundraising traditions at Starehe Girls' Centre: Charity Golf Tournament (March), Annual Charity Walk (June), and Annual Gala Dinner (October/November).",
};

export default function CharityEventsPage() {
  const eventIcons = [
    <Trophy key="golf" className="w-6 h-6 text-starehe-gold-600" />,
    <Users key="walk" className="w-6 h-6 text-starehe-maroon-700" />,
    <Sparkles key="dinner" className="w-6 h-6 text-starehe-blue-900" />,
  ];

  return (
    <div>
      <Breadcrumb
        items={[
          { label: "Support a Cause", href: "/giving" },
          { label: "Annual Events" },
        ]}
      />

      {/* Hero */}
      <section className="py-16 sm:py-20 bg-starehe-blue-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-starehe-gold-accent/20 text-starehe-gold-300 border border-starehe-gold-accent/30 mb-4">
              Fundraising Traditions
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              Annual Signature Charity Events
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-200 leading-relaxed font-light">
              Each term, the Starehe Girls&apos; Centre fraternity gathers with corporate
              partners, trustees, alumni, and friends for signature events that celebrate
              achievement and mobilize vital funding for our girls.
            </p>
          </div>
        </div>
      </section>

      {/* 3 Events Grid */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Three Termly Events"
            title="The Starehe Annual Calendar"
            description="Participation is open to individual supporters, running clubs, golfers, and corporate sponsorship teams."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SCHOOL_INFO.annualEvents.map((evt, idx) => (
              <div
                key={evt.name}
                className="bg-white rounded-3xl p-8 border border-slate-200 shadow-subtle hover:shadow-elevation transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mb-5">
                    {eventIcons[idx]}
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-starehe-maroon-800 bg-starehe-maroon-50 px-2.5 py-1 rounded-full">
                    {evt.period}
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-starehe-blue-950 mt-3 mb-2">
                    {evt.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {evt.purpose}
                  </p>
                </div>

                <div className="mt-8 pt-5 border-t border-slate-100">
                  <a
                    href="mailto:info@starehegirlscentre.co.ke?subject=RSVP%20or%20Sponsorship%20for%20"
                    className="inline-flex items-center space-x-1.5 text-xs font-bold text-starehe-blue-900 hover:text-starehe-maroon-800"
                  >
                    <span>Register / Sponsor a Team</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Corporate Sponsorship Invitation */}
          <div className="mt-16 bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-subtle flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl">
              <span className="text-xs uppercase font-bold tracking-wider text-starehe-blue-900">
                Corporate Social Responsibility (CSR)
              </span>
              <h3 className="font-serif text-2xl font-bold text-starehe-blue-950 mt-1">
                Corporate Partnership Packages
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                Platinum, Gold, Silver, and Bronze corporate packages are available for
                the Charity Golf and Gala Dinner. Partner logos are prominently featured
                in all media releases, event banners, and annual institutional reports.
              </p>
            </div>

            <a
              href="mailto:info@starehegirlscentre.co.ke?subject=Corporate%20CSR%20Partnership"
              className="flex-shrink-0 px-8 py-3.5 rounded-full bg-starehe-blue-900 hover:bg-starehe-blue-800 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
            >
              Request Corporate CSR Deck
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
