import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CAPITAL_PROJECTS } from "@/data/school-data";
import { Building, FlaskConical, BookOpen, Bus, AlertCircle, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Capital Infrastructure Needs | Building Starehe's Future",
  description:
    "Explore urgent capital projects needed at Starehe Girls' Centre: Twin Science Labs, Multipurpose Hall, 160-Bed Dormitory, Library Extension, and 62-Seater School Bus.",
};

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
    <div>
      <Breadcrumb
        items={[
          { label: "Support a Cause", href: "/giving" },
          { label: "Capital Projects" },
        ]}
      />

      {/* Hero */}
      <section className="py-16 sm:py-20 bg-starehe-blue-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-starehe-gold-accent/20 text-starehe-gold-300 border border-starehe-gold-accent/30 mb-4">
              Infrastructure Campaign
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              Capital Infrastructure Projects
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-200 leading-relaxed font-light">
              With our enrollment standing at 800+ scholars, our facilities require urgent
              expansion to accommodate full cohorts, abolish laboratory shifts, and meet
              Competency-Based Education (CBE) standards.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Priority Expansions"
            title="Urgent Infrastructure Requirements"
            description="Partners may fund an entire project or contribute partial tranches towards architectural milestones."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {CAPITAL_PROJECTS.map((proj) => (
              <div
                key={proj.title}
                className="bg-white rounded-3xl p-8 border border-slate-200 shadow-subtle hover:shadow-elevation transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${getBadgeColor(
                        proj.priority
                      )}`}
                    >
                      {proj.priority} Priority
                    </span>
                    <Building className="w-5 h-5 text-starehe-blue-900" />
                  </div>

                  <h3 className="font-serif text-xl font-bold text-starehe-blue-950 mb-2">
                    {proj.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                    {proj.description}
                  </p>
                </div>

                <div className="border-t border-slate-100 pt-5">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-slate-500 font-medium">Estimated Funding:</span>
                    <span className="font-bold font-mono text-starehe-maroon-800 text-sm">
                      {proj.goal}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600">
                    <strong>Direct Impact:</strong> {proj.impact}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Action CTA */}
          <div className="mt-16 bg-starehe-blue-950 text-white rounded-3xl p-8 sm:p-12 shadow-elevation text-center">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold">
              Partner With Us on a Capital Infrastructure Project
            </h3>
            <p className="mt-3 text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Naming rights and memorial plaques are available for donor institutions and
              families funding dedicated buildings, halls, and laboratories.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <a
                href="mailto:info@starehegirlscentre.co.ke?subject=Capital%20Infrastructure%20Partnership"
                className="px-8 py-3.5 rounded-full bg-starehe-gold-accent hover:bg-starehe-gold-400 text-starehe-blue-950 font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
              >
                Inquire on Naming Rights
              </a>
              <Link
                href="/giving"
                className="px-8 py-3.5 rounded-full border border-white/30 text-white hover:bg-white/10 font-bold text-xs uppercase tracking-wider transition-colors"
              >
                General Giving Channels
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
