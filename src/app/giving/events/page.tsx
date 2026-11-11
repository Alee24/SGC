import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { EditorialPageLayout } from "@/components/layout/EditorialPageLayout";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SCHOOL_INFO } from "@/data/school-data";
import { Calendar, Sparkles, Trophy, Users, HeartHandshake, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Annual Charity Events | Charity Golf, Walk & Gala Dinner",
  description:
    "Annual fundraising traditions at Starehe Girls' Centre: Charity Golf Tournament (March), Annual Charity Walk (June), and Annual Gala Dinner (October/November).",
};

const GIVING_SIDEBAR_LINKS = [
  { label: "Giving & Sponsorship", href: "/giving" },
  { label: "Capital Infrastructure Needs", href: "/giving/projects" },
  { label: "Annual Fundraising Traditions", href: "/giving/events", active: true },
];

export default function CharityEventsPage() {
  const eventIcons = [
    <Trophy key="golf" className="w-5 h-5 text-starehe-gold-600" />,
    <Users key="walk" className="w-5 h-5 text-starehe-maroon-700" />,
    <Sparkles key="dinner" className="w-5 h-5 text-starehe-blue-900" />,
  ];

  return (
    <EditorialPageLayout
      breadcrumbs={[
        { label: "Support a Cause", href: "/giving" },
        { label: "Annual Events" },
      ]}
      kicker="Fundraising Traditions"
      title="Annual Signature Charity Events"
      description="Each term, the Starehe Girls' Centre fraternity gathers with corporate partners, trustees, alumni, and friends for signature fundraising traditions that celebrate achievement and mobilize essential scholarship funding."
      heroFacts={[
        { label: "Term 1 (March)", value: "Charity Golf Tournament" },
        { label: "Term 2 (June)", value: "Annual Charity Walk" },
        { label: "Term 3 (Oct/Nov)", value: "Annual Gala Dinner" },
        { label: "Corporate CSR", value: "Tax Deductible Giving" },
      ]}
      sidebarTitle="Giving & Partnerships"
      sidebarLinks={GIVING_SIDEBAR_LINKS}
    >
      <div className="space-y-10">
        <div>
          <SectionHeading
            badge="Three Termly Events"
            title="The Starehe Annual Calendar"
            description="Participation is open to individual supporters, running clubs, golfers, and corporate teams."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {SCHOOL_INFO.annualEvents.map((evt, idx) => (
            <div
              key={evt.name}
              className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-subtle hover:border-starehe-blue-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center mb-4">
                  {eventIcons[idx]}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-starehe-maroon-800 bg-starehe-maroon-50 px-2 py-0.5 rounded-full">
                  {evt.period}
                </span>
                <h3 className="font-serif text-lg font-bold text-starehe-blue-950 mt-2.5 mb-2">
                  {evt.name}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {evt.purpose}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100">
                <a
                  href={`mailto:info@starehegirlscentre.co.ke?subject=Inquiry%20Regarding%20${encodeURIComponent(
                    evt.name
                  )}`}
                  className="inline-flex items-center space-x-1 text-xs font-bold text-starehe-blue-900 hover:text-starehe-maroon-800 transition-colors"
                >
                  <span>Register / Sponsor a Team</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Corporate Sponsorship Invitation */}
        <section className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <span className="text-[11px] uppercase font-bold tracking-wider text-starehe-blue-900">
              Corporate Social Responsibility (CSR)
            </span>
            <h3 className="font-serif text-lg font-bold text-starehe-blue-950 mt-1">
              Corporate Sponsorship &amp; Team Branding
            </h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              We offer branded visibility across event banners, golf tee boxes, promotional jerseys,
              and gala dinner programs for corporate sponsors funding our scholarship beneficiaries.
            </p>
          </div>

          <a
            href="mailto:info@starehegirlscentre.co.ke?subject=Corporate%20CSR%20Event%20Sponsorship"
            className="px-5 py-2.5 rounded-full bg-starehe-blue-900 hover:bg-starehe-blue-800 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm flex-shrink-0"
          >
            Request CSR Pack
          </a>
        </section>
      </div>
    </EditorialPageLayout>
  );
}
