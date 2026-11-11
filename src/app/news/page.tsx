import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { EditorialPageLayout } from "@/components/layout/EditorialPageLayout";
import { Calendar, Bell, ArrowRight, Tag } from "lucide-react";

export const metadata: Metadata = {
  title: "News & Announcements | Official School Bulletins",
  description:
    "Read the latest official news, examination bulletins, admissions notices, and event announcements from Starehe Girls' Centre.",
};

const NEWS_SIDEBAR_LINKS = [
  { label: "All Bulletins", href: "/news", active: true },
  { label: "KCSE 2025 Performance", href: "/academics/performance" },
  { label: "KUCCPS Placement Advisory", href: "/academics/kuccps" },
  { label: "Careers & Open Tenders", href: "/careers-tenders" },
  { label: "Annual Fundraising Events", href: "/giving/events" },
];

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
    <EditorialPageLayout
      breadcrumbs={[{ label: "News & Announcements" }]}
      kicker="Institutional Bulletins"
      title="News & Official Announcements"
      description="Stay informed with authenticated institutional communications, academic examination milestones, admissions schedules, and community charity events."
      heroFacts={[
        { label: "Latest Exam Record", value: "8.90 (B) KCSE 2025" },
        { label: "Admissions Notice", value: "Blue Forms are Free" },
        { label: "Active Advisory", value: "KUCCPS Placement Open" },
        { label: "Procurement Cycle", value: "FY 2026/2027 Tenders" },
      ]}
      sidebarTitle="News & Media"
      sidebarLinks={NEWS_SIDEBAR_LINKS}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {newsItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-subtle hover:border-starehe-blue-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 mb-2.5">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-800">
                    {item.category}
                  </span>
                  <span className="flex items-center space-x-1 text-[11px]">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    <span>{item.date}</span>
                  </span>
                </div>

                <h3 className="font-serif text-base font-bold text-starehe-blue-950 mb-2 leading-snug">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {item.summary}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <Link
                  href={item.link}
                  className="inline-flex items-center space-x-1 text-xs font-bold text-starehe-blue-900 hover:text-starehe-maroon-800 transition-colors"
                >
                  <span>Read Full Notice</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </EditorialPageLayout>
  );
}
