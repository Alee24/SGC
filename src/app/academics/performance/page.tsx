import React from "react";
import { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatCard } from "@/components/ui/StatCard";
import { ACADEMIC_TRACK_RECORD } from "@/data/school-data";
import {
  GraduationCap,
  TrendingUp,
  Award,
  Sparkles,
  CheckCircle2,
  FileCheck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "KCSE School Performance | 2025 Mean Score 8.90 (B)",
  description:
    "Official KCSE examination results for Starehe Girls' Centre. In 2025, registered an 8.90 mean score with +0.07 positive deviation and 93% university transition rate.",
};

export default function PerformancePage() {
  return (
    <div>
      <Breadcrumb
        items={[
          { label: "Academics", href: "/academics" },
          { label: "School Performance" },
        ]}
      />

      {/* Hero */}
      <section className="py-16 sm:py-20 bg-starehe-blue-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-starehe-gold-accent/20 text-starehe-gold-300 border border-starehe-gold-accent/30 mb-4">
              KCSE Track Record
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              School Performance &amp; Positive Deviations
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-200 leading-relaxed font-light">
              For consecutive examination cycles, Starehe Girls&apos; Centre has registered
              positive deviations, driven by data-guided teaching interventions,
              &ldquo;Operation Plus 5&rdquo;, and rigorous academic mentorship.
            </p>
          </div>
        </div>
      </section>

      {/* Key Stats Counter */}
      <section className="py-12 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-starehe-blue-50 border border-starehe-blue-100">
              <div className="text-xs uppercase font-bold text-starehe-blue-800">
                2025 KCSE Mean Score
              </div>
              <div className="font-serif text-4xl font-extrabold text-starehe-blue-950 mt-2">
                8.90 (B)
              </div>
              <div className="text-xs text-emerald-700 font-semibold mt-1">
                +0.07 Positive Deviation
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-starehe-maroon-50 border border-starehe-maroon-100">
              <div className="text-xs uppercase font-bold text-starehe-maroon-800">
                University Transition (2025)
              </div>
              <div className="font-serif text-4xl font-extrabold text-starehe-maroon-900 mt-2">
                93%
              </div>
              <div className="text-xs text-slate-600 mt-1">
                174 of 187 scored C+ &amp; above
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-starehe-gold-50 border border-starehe-gold-200">
              <div className="text-xs uppercase font-bold text-starehe-gold-800">
                Historical Average
              </div>
              <div className="font-serif text-4xl font-extrabold text-starehe-gold-800 mt-2">
                95%
              </div>
              <div className="text-xs text-slate-600 mt-1">
                Direct university entry over 18 yrs
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-100 border border-slate-200">
              <div className="text-xs uppercase font-bold text-slate-700">
                2026 Candidate Target
              </div>
              <div className="font-serif text-4xl font-extrabold text-starehe-blue-950 mt-2">
                9.50
              </div>
              <div className="text-xs text-starehe-maroon-800 font-semibold mt-1">
                100% University Progression Target
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* KCSE Comparison Table */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Examination Data"
            title="KCSE Examination Performance Trend"
            description="Verified KCSE candidate statistics demonstrating sustained academic growth and positive deviations year after year."
          />

          <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-subtle">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-starehe-blue-950 text-white text-xs uppercase tracking-wider">
                  <tr>
                    <th className="py-4 px-6">Examination Year</th>
                    <th className="py-4 px-6">Candidates</th>
                    <th className="py-4 px-6">Mean Score</th>
                    <th className="py-4 px-6">Mean Grade</th>
                    <th className="py-4 px-6">Positive Deviation</th>
                    <th className="py-4 px-6">University Qualified (C+ &amp; above)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {ACADEMIC_TRACK_RECORD.recentYears.map((row) => (
                    <tr
                      key={row.year}
                      className={
                        row.year === 2025
                          ? "bg-starehe-maroon-50/40 font-semibold text-slate-900"
                          : "hover:bg-slate-50 transition-colors"
                      }
                    >
                      <td className="py-4 px-6 font-bold">{row.year}</td>
                      <td className="py-4 px-6">{row.candidates} students</td>
                      <td className="py-4 px-6 font-mono font-bold text-starehe-blue-900 text-base">
                        {row.meanScore}
                      </td>
                      <td className="py-4 px-6">
                        <span className="px-2.5 py-1 rounded bg-slate-100 text-slate-800 font-bold text-xs">
                          {row.meanGrade}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-emerald-700 font-bold">
                        {row.deviation}
                      </td>
                      <td className="py-4 px-6 font-semibold text-starehe-maroon-800">
                        {row.universityQualified}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 text-xs text-slate-500">
              * Official data authenticated by Starehe Girls&apos; Centre Academic Committee.
            </div>
          </div>

          {/* Operation Plus 5 in Depth */}
          <div className="mt-16 bg-starehe-blue-950 text-white rounded-3xl p-8 sm:p-12 shadow-elevation relative overflow-hidden">
            <div className="max-w-3xl">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-starehe-gold-accent/20 text-starehe-gold-300 border border-starehe-gold-accent/30 mb-4">
                The Driving Strategy
              </div>
              <h2 className="font-serif text-3xl font-bold text-white leading-tight">
                Operation Plus 5: Inspiring Every Girl to Rise
              </h2>
              <p className="mt-4 text-base text-slate-200 leading-relaxed">
                {ACADEMIC_TRACK_RECORD.operationPlus5.description}
              </p>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-white/10 border border-white/10">
                  <div className="font-bold text-starehe-gold-300 text-sm mb-1">
                    Self-Evaluation
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    Students track personal performance after every continuous assessment test (CAT).
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-white/10 border border-white/10">
                  <div className="font-bold text-starehe-gold-300 text-sm mb-1">
                    Most Improved Awards
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    Celebrating positive change so that hard work is recognized at all starting grades.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-white/10 border border-white/10">
                  <div className="font-bold text-starehe-gold-300 text-sm mb-1">
                    Psychosocial Support
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    Experienced academic mentors and counselors ensure balance, wellness, and mental calm.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
