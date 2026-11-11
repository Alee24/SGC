import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Calendar, Bell, ArrowRight, Tag } from "lucide-react";

export const metadata: Metadata = {
  title: "News & Announcements | Official School Bulletins",
  description:
    "Read the latest official news, examination bulletins, admissions notices, and event announcements from Starehe Girls' Centre.",
};

export default function NewsPage() {
  const newsItems = [
    {
      id: "news-1",
      title: "KCSE 2025 Examination Results: Starehe Registers 8.90 (B) Mean Score",
      date: "January 2026",
      category: "Academics",
      summary:
        "Starehe Girls' Centre candidates register a commendable +0.07 positive deviation with 93% scoring C+ and above, securing direct public university and international scholarship entry.",
      link: "/academics/performance",
    },
    {
      id: "news-2",
      title: "KUCCPS University & TVET Placement Advisory for Graduating Candidates",
      date: "January 28, 2026",
      category: "Advisory",
      summary:
        "Director Sister Jane Soita issues guidance to the graduating cohort regarding KUCCPS student portal access, career choice revision, and dedicated campus IT office technical support.",
      link: "/academics/kuccps",
    },
    {
      id: "news-3",
      title: "Official Invitation to Tender for FY 2026/2027 Supplies & Audit RFP",
      date: "June 11, 2026",
      category: "Procurement",
      summary:
        "Starehe Girls' Centre invites eligible, competent, and registered firms for the supply of goods and provision of services for the 2026/2027 financial year, including Internal Audit Services.",
      link: "/careers-tenders",
    },
    {
      id: "news-4",
      title: "Staff Recruitment: Vacancies for Administration Officer & School Cateress",
      date: "July 2026",
      category: "Careers",
      summary:
        "Applications are invited from qualified and experienced professionals to fill the positions of Administration Officer and School Cateress on or before Monday, 3 August 2026.",
      link: "/careers-tenders",
    },
    {
      id: "news-5",
      title: "Form 1 Blue Form Admissions Window: Free Application Notice",
      date: "Annual Notice",
      category: "Admissions",
      summary:
        "Parents and guardians are reminded that the official Starehe Blue Application Form is strictly free of charge. Application forms must be stamped and submitted by July 31st.",
      link: "/admissions/form-one",
    },
    {
      id: "news-6",
      title: "Annual Charity Traditions: Charity Golf in March & Charity Walk in June",
      date: "Termly Events",
      category: "Giving",
      summary:
        "Join our fraternity, trustees, and corporate sponsors for our signature annual fundraising events supporting student scholarships and our KCDF Endowment Fund.",
      link: "/giving/events",
    },
  ];

  return (
    <div>
      <Breadcrumb items={[{ label: "News & Announcements" }]} />

      {/* Hero */}
      <section className="py-16 sm:py-20 bg-starehe-blue-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-starehe-gold-accent/20 text-starehe-gold-300 border border-starehe-gold-accent/30 mb-4">
              Bulletins &amp; Press
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              News &amp; Official Bulletins
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-200 leading-relaxed font-light">
              Stay informed with verified institutional announcements, academic milestones,
              admissions reminders, and upcoming charity events.
            </p>
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl p-8 border border-slate-200 shadow-subtle hover:shadow-elevation transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                    <span className="px-2.5 py-0.5 rounded-full font-semibold bg-slate-100 text-slate-800">
                      {item.category}
                    </span>
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{item.date}</span>
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-starehe-blue-950 mb-3 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                    {item.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <Link
                    href={item.link}
                    className="inline-flex items-center space-x-1.5 text-xs font-bold text-starehe-blue-900 hover:text-starehe-maroon-800 transition-colors"
                  >
                    <span>Read Full Bulletin</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
