import React from "react";
import { Metadata } from "next";
import { EditorialPageLayout } from "@/components/layout/EditorialPageLayout";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ACADEMIC_TRACK_RECORD } from "@/data/school-data";
import {
  GraduationCap,
  TrendingUp,
  Award,
  Sparkles,
  CheckCircle2,
  FileCheck,
  Target,
} from "lucide-react";

export const metadata: Metadata = {
  title: "KCSE School Performance | 2025 Mean Score 8.90 (B)",
  description:
    "Official KCSE examination results for Starehe Girls' Centre. In 2025, registered an 8.90 mean score with +0.07 positive deviation and 93% university transition rate.",
};

const ACADEMICS_SIDEBAR_LINKS = [
  { label: "Academics Overview", href: "/academics" },
  { label: "KCSE Performance & Data", href: "/academics/performance", active: true },
  { label: "Curriculum & CBC Pathways", href: "/academics/curriculum" },
  { label: "Academic Departments", href: "/academics/departments" },
  { label: "KUCCPS & University Prep", href: "/academics/kuccps" },
];

export default function PerformancePage() {
  return (
    <EditorialPageLayout
      breadcrumbs={[
        { label: "Academics", href: "/academics" },
        { label: "School Performance" },
      ]}
      kicker="Academic Track Record"
      title="School Performance & Positive Deviations"
      description="For consecutive examination cycles, Starehe Girls' Centre has registered positive deviations, driven by data-guided teaching interventions, 'Operation Plus 5', and dedicated teacher mentorship."
      heroFacts={[
        { label: "2025 Mean Score", value: "8.90 (B)" },
        { label: "2025 Positive Deviation", value: "+0.07" },
        { label: "2025 University Entry", value: "93% (174/187)" },
        { label: "18-Yr Historical Average", value: "95% University" },
      ]}
      sidebarTitle="Academics Hub"
      sidebarLinks={ACADEMICS_SIDEBAR_LINKS}
    >
      <div className="space-y-10">
        {/* 4 Stat KPI Cards */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-subtle text-center">
            <div className="text-[10px] uppercase font-bold text-starehe-blue-900 tracking-wider">
              2025 Mean Score
            </div>
            <div className="font-serif text-3xl font-extrabold text-starehe-blue-950 mt-1">
              8.90 (B)
            </div>
            <div className="text-[11px] text-emerald-700 font-bold mt-1">
              +0.07 Deviation
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-subtle text-center">
            <div className="text-[10px] uppercase font-bold text-starehe-maroon-800 tracking-wider">
              2025 University Direct
            </div>
            <div className="font-serif text-3xl font-extrabold text-starehe-maroon-800 mt-1">
              93%
            </div>
            <div className="text-[11px] text-slate-500 font-medium mt-1">
              174 of 187 girls C+
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-subtle text-center">
            <div className="text-[10px] uppercase font-bold text-starehe-gold-800 tracking-wider">
              18-Year Average
            </div>
            <div className="font-serif text-3xl font-extrabold text-starehe-gold-600 mt-1">
              95%
            </div>
            <div className="text-[11px] text-slate-500 font-medium mt-1">
              University transition
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-subtle text-center">
            <div className="text-[10px] uppercase font-bold text-slate-700 tracking-wider">
              2026 Target
            </div>
            <div className="font-serif text-3xl font-extrabold text-starehe-blue-950 mt-1">
              9.50
            </div>
            <div className="text-[11px] text-starehe-maroon-800 font-bold mt-1">
              100% Target
            </div>
          </div>
        </section>

        {/* KCSE Comparison Table */}
        <section className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-subtle">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="font-serif text-lg font-bold text-starehe-blue-950">
                Official KCSE Examination Performance Trend
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Authenticated records over recent national testing cycles.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-starehe-blue-950 text-white text-[11px] uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-5">Year</th>
                  <th className="py-3.5 px-5">Candidates</th>
                  <th className="py-3.5 px-5">Mean Score</th>
                  <th className="py-3.5 px-5">Mean Grade</th>
                  <th className="py-3.5 px-5">Positive Dev</th>
                  <th className="py-3.5 px-5">University Qualified</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {ACADEMIC_TRACK_RECORD.recentYears.map((row) => (
                  <tr
                    key={row.year}
                    className={
                      row.year === 2025
                        ? "bg-starehe-maroon-50/40 font-semibold text-slate-900"
                        : "hover:bg-slate-50/70 transition-colors"
                    }
                  >
                    <td className="py-3.5 px-5 font-bold">{row.year}</td>
                    <td className="py-3.5 px-5">{row.candidates} girls</td>
                    <td className="py-3.5 px-5 font-mono font-bold text-starehe-blue-900 text-sm">
                      {row.meanScore}
                    </td>
                    <td className="py-3.5 px-5">
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-800 font-bold text-[11px]">
                        {row.meanGrade}
                      </span>
                    </td>
                    <td className="py-3.5 px-5 text-emerald-700 font-bold">
                      {row.deviation}
                    </td>
                    <td className="py-3.5 px-5 font-semibold text-starehe-maroon-800">
                      {row.universityQualified}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Operation Plus 5 in Depth */}
        <section className="bg-gradient-to-br from-starehe-blue-950 to-starehe-blue-900 text-white rounded-2xl p-6 sm:p-8 shadow-md">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-starehe-gold-accent/20 text-starehe-gold-300 border border-starehe-gold-accent/30 mb-3">
            <Target className="w-3.5 h-3.5 text-starehe-gold-accent" />
            <span>The Driving Pedagogical Strategy</span>
          </div>
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-white">
            Operation Plus 5: Inspiring Every Girl to Rise
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-slate-200 leading-relaxed max-w-3xl">
            {ACADEMIC_TRACK_RECORD.operationPlus5.description}
          </p>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-white/10 border border-white/10">
              <div className="font-bold text-starehe-gold-300 text-xs uppercase tracking-wider mb-1">
                1. Continuous Self-Audit
              </div>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                Students track subject score differentials after each CAT to identify exact knowledge gaps.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white/10 border border-white/10">
              <div className="font-bold text-starehe-gold-300 text-xs uppercase tracking-wider mb-1">
                2. Most Improved Laurels
              </div>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                Rewarding growth trajectory ensures all students are motivated regardless of baseline score.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white/10 border border-white/10">
              <div className="font-bold text-starehe-gold-300 text-xs uppercase tracking-wider mb-1">
                3. Wellness &amp; Calm
              </div>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                Faculty counselors ensure mental well-being and stress-free preparation during mocks.
              </p>
            </div>
          </div>
        </section>
      </div>
    </EditorialPageLayout>
  );
}
