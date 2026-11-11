import React from "react";
import { Metadata } from "next";
import { EditorialPageLayout } from "@/components/layout/EditorialPageLayout";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LeaderCard } from "@/components/ui/LeaderCard";
import { BOARD_OF_MANAGEMENT } from "@/data/school-data";
import { ShieldCheck, BookOpen, Users, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Board of Management (BOM) | Institutional Oversight",
  description:
    "Meet the Board of Management of Starehe Girls' Centre, chaired by Prof. Mary Getui, providing academic strategy, faculty oversight, and student welfare administration under the Basic Education Act 2013.",
};

const ABOUT_SIDEBAR_LINKS = [
  { label: "Overview & Mission", href: "/about" },
  { label: "History & Heritage", href: "/about/history" },
  { label: "Board of Trustees", href: "/about/trustees" },
  { label: "Board of Management (BOM)", href: "/about/management", active: true },
  { label: "Administration & Leadership", href: "/about/administration" },
];

export default function ManagementPage() {
  return (
    <EditorialPageLayout
      breadcrumbs={[
        { label: "About Us", href: "/about" },
        { label: "Board of Management" },
      ]}
      kicker="Academic & Operational Oversight"
      title="The Board of Management (BOM)"
      description="Constituted under the provisions of the Basic Education Act, 2013, the Board of Management provides direct oversight of academic performance, faculty development, financial accountability, and holistic student welfare."
      heroFacts={[
        { label: "Governing Act", value: "Basic Education Act 2013" },
        { label: "BOM Chair", value: "Prof. Mary Getui" },
        { label: "Student Body", value: "800 Boarding Girls" },
        { label: "Focus", value: "KCSE & CBC Senior School" },
      ]}
      sidebarTitle="About Starehe"
      sidebarLinks={ABOUT_SIDEBAR_LINKS}
    >
      <div className="space-y-12">
        {/* Statutory Role Narrative */}
        <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-subtle">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-starehe-blue-950 mb-3">
            Stewarding Daily Educational Excellence
          </h2>
          <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
            Chaired by Prof. Mary Getui, EBS, the Board of Management works hand-in-hand with the
            School Administration and the Ministry of Education to uphold the rigorous ethos of
            &ldquo;The Starehe Way&rdquo;. The BOM ensures institutional resources translate into
            exceptional academic outcomes and holistic character formation for every admitted girl.
          </p>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70">
              <div className="flex items-center space-x-2 text-starehe-blue-900 font-bold text-xs uppercase tracking-wider mb-2">
                <BookOpen className="w-4 h-4 text-starehe-gold-accent" />
                <span>1. Academic Strategy</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Monitoring examination preparedness, CBC Senior School rollout, STEM laboratory equipment,
                and syllabus coverage standards across all departments.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70">
              <div className="flex items-center space-x-2 text-starehe-blue-900 font-bold text-xs uppercase tracking-wider mb-2">
                <Users className="w-4 h-4 text-starehe-gold-accent" />
                <span>2. Student Welfare</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Supervising child protection protocols, nutritional standards, dormitory well-being,
                counselling services, and healthcare for all 800 boarding students.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70">
              <div className="flex items-center space-x-2 text-starehe-blue-900 font-bold text-xs uppercase tracking-wider mb-2">
                <ShieldCheck className="w-4 h-4 text-starehe-gold-accent" />
                <span>3. Fiscal Integrity</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Overseeing competitive procurement tenders, institutional operating budgets, and internal
                audits in compliance with the Public Procurement &amp; Asset Disposal Act.
              </p>
            </div>
          </div>
        </section>

        {/* Members Grid */}
        <section>
          <div className="mb-6">
            <SectionHeading
              badge="BOM Council"
              title="Board of Management Members"
              description="A multidisciplinary council of educational leaders, alumni representatives, parents, and community stakeholders."
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {BOARD_OF_MANAGEMENT.map((member) => (
              <LeaderCard key={member.name} leader={member} />
            ))}
          </div>
        </section>

        {/* Accountability Banner */}
        <section className="bg-starehe-blue-50/70 rounded-2xl p-6 sm:p-8 border border-starehe-blue-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-starehe-blue-900 font-bold text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Ministry of Education Oversight</span>
            </div>
            <p className="text-xs text-slate-600 max-w-xl leading-relaxed">
              The BOM reports biannually to the Kasarani Sub-County and Nairobi County Education Boards,
              ensuring 100% compliance with national education directives and teacher performance appraisals.
            </p>
          </div>
          <a
            href="/careers-tenders"
            className="px-5 py-2.5 rounded-full bg-starehe-blue-900 hover:bg-starehe-blue-800 text-white font-bold text-xs uppercase tracking-wider transition-colors flex-shrink-0"
          >
            View BOM Tenders
          </a>
        </section>
      </div>
    </EditorialPageLayout>
  );
}
