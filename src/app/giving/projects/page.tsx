import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { EditorialPageLayout } from "@/components/layout/EditorialPageLayout";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CAPITAL_PROJECTS } from "@/data/school-data";
import { Building, ArrowRight, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Capital Infrastructure Needs | Building Starehe's Future",
  description:
    "Explore urgent capital projects needed at Starehe Girls' Centre: Twin Science Labs, Multipurpose Hall, 160-Bed Dormitory, Library Extension, and 62-Seater School Bus.",
};

const GIVING_SIDEBAR_LINKS = [
  { label: "Giving & Sponsorship", href: "/giving" },
  { label: "Capital Infrastructure Needs", href: "/giving/projects", active: true },
  { label: "Annual Fundraising Traditions", href: "/giving/events" },
];

export default function CapitalProjectsPage() {
  const getBadgeColor = (priority: string) => {
    switch (priority) {
      case "Urgent":
        return "bg-rose-50 text-rose-700 border-rose-200";
      case "High":
        return "bg-amber-50 text-amber-700 border-amber-200";
      default:
        return "bg-starehe-blue-50 text-starehe-blue-800 border-starehe-blue-200";
    }
  };

  return (
    <EditorialPageLayout
      breadcrumbs={[
        { label: "Support a Cause", href: "/giving" },
        { label: "Capital Projects" },
      ]}
      kicker="Infrastructure Campaign"
      title="Capital Infrastructure Projects"
      description="With our student enrollment standing at 800+ scholars across 47 counties, our campus facilities require urgent expansion to accommodate full cohorts, eliminate laboratory shifts, and meet Competency-Based Education (CBE) standards."
      heroFacts={[
        { label: "Enrolled Scholars", value: "800 Boarding Girls" },
        { label: "Campus Scope", value: "55 Acres in Kasarani" },
        { label: "Naming Rights", value: "Available for Donors" },
        { label: "Priority Builds", value: "Labs, Dorms & Assembly" },
      ]}
      sidebarTitle="Giving & Partnerships"
      sidebarLinks={GIVING_SIDEBAR_LINKS}
    >
      <div className="space-y-10">
        <div>
          <SectionHeading
            badge="Priority Expansions"
            title="Urgent Infrastructure Requirements"
            description="Partners may fund an entire project or contribute partial tranches towards architectural milestones."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CAPITAL_PROJECTS.map((proj) => (
            <div
              key={proj.title}
              className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-subtle hover:border-starehe-blue-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${getBadgeColor(
                      proj.priority
                    )}`}
                  >
                    {proj.priority} Priority
                  </span>
                  <Building className="w-4 h-4 text-starehe-blue-900" />
                </div>

                <h3 className="font-serif text-lg font-bold text-starehe-blue-950 mb-1.5">
                  {proj.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {proj.description}
                </p>
              </div>

              <div className="border-t border-slate-100 pt-3.5">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-slate-500 font-medium">Estimated Funding:</span>
                  <span className="font-bold font-mono text-starehe-maroon-800 text-sm">
                    {proj.goal}
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-[11px] text-slate-600 leading-relaxed">
                  <strong>Direct Impact:</strong> {proj.impact}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Naming Rights CTA */}
        <section className="bg-gradient-to-br from-starehe-blue-950 to-starehe-blue-900 text-white rounded-2xl p-6 sm:p-8 shadow-md">
          <div className="max-w-2xl">
            <span className="text-[11px] uppercase font-bold tracking-wider text-starehe-gold-300">
              Donor Recognition
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mt-1">
              Partner With Us on a Capital Project
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 mt-2 leading-relaxed">
              Permanent naming rights and commemorative plaques are offered to donor institutions,
              corporates, and philanthropic families funding complete facilities or major equipment wings.
            </p>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href="mailto:info@starehegirlscentre.co.ke?subject=Capital%20Infrastructure%20Partnership"
              className="px-5 py-2.5 rounded-full bg-starehe-gold-500 hover:bg-starehe-gold-400 text-starehe-blue-950 font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
            >
              Inquire on Naming Rights
            </a>
            <Link
              href="/giving"
              className="px-5 py-2.5 rounded-full border border-white/30 text-white hover:bg-white/10 font-bold text-xs uppercase tracking-wider transition-colors"
            >
              General Giving Channels
            </Link>
          </div>
        </section>
      </div>
    </EditorialPageLayout>
  );
}
