import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  GraduationCap,
  Cpu,
  Briefcase,
  Palette,
  CheckCircle2,
  Calendar,
  Building,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Senior School CBC Admission (Grade 10) | Pathways & Selection",
  description:
    "Admissions guidelines for Grade 10 Senior School under Kenya's Competency-Based Education (CBE) at Starehe Girls' Centre. Explore STEM, Social Sciences, and Arts & Sports pathways.",
};

export default function SeniorSchoolAdmissionPage() {
  return (
    <div>
      <Breadcrumb
        items={[
          { label: "Admissions", href: "/admissions" },
          { label: "Senior School CBC (Grade 10)" },
        ]}
      />

      {/* Hero */}
      <section className="py-16 sm:py-20 bg-starehe-blue-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-starehe-gold-accent/20 text-starehe-gold-300 border border-starehe-gold-accent/30 mb-4">
              CBE Framework Transition
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              Senior School Grade 10 Admissions
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-200 leading-relaxed font-light">
              As Kenya advances with Competency-Based Education (CBE), Starehe Girls&apos;
              Centre is fully prepared to admit Senior School scholars into three dynamic
              pathways tailored for 21st-century innovation and leadership.
            </p>
          </div>
        </div>
      </section>

      {/* Pathways Overview */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Accredited Pathways"
            title="Senior School Academic Tracks"
            description="Our faculty and campus facilities are optimized to deliver comprehensive instruction in all three Ministry of Education career pathways."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* STEM */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-subtle hover:shadow-elevation transition-all">
              <div className="w-12 h-12 rounded-xl bg-starehe-blue-100 text-starehe-blue-900 flex items-center justify-center mb-5">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-starehe-blue-950 mb-2">
                STEM Pathway
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                Engineered for aspiring physicians, software engineers, data scientists,
                and agronomists.
              </p>
              <div className="space-y-2 text-xs text-slate-700">
                <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-2">
                  Specialized Tracks:
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>Pure Sciences (Physics, Chemistry, Biology)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>Technical &amp; Engineering Studies</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>Computer Science, Coding &amp; Robotics</span>
                </div>
              </div>
            </div>

            {/* Social Sciences */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-subtle hover:shadow-elevation transition-all">
              <div className="w-12 h-12 rounded-xl bg-starehe-maroon-100 text-starehe-maroon-800 flex items-center justify-center mb-5">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-starehe-blue-950 mb-2">
                Social Sciences Pathway
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                Nurturing future legal minds, economists, diplomats, journalists,
                and civil leaders.
              </p>
              <div className="space-y-2 text-xs text-slate-700">
                <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-2">
                  Specialized Tracks:
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>History, Governance &amp; Global Diplomacy</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>Business Studies, Finance &amp; Entrepreneurship</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>Geography, Environmental Planning &amp; Ethics</span>
                </div>
              </div>
            </div>

            {/* Arts & Sports */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-subtle hover:shadow-elevation transition-all">
              <div className="w-12 h-12 rounded-xl bg-starehe-gold-100 text-starehe-gold-800 flex items-center justify-center mb-5">
                <Palette className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-starehe-blue-950 mb-2">
                Arts &amp; Sports Science
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                Championing athletic excellence, theatrical mastery, musical composition,
                and graphic design.
              </p>
              <div className="space-y-2 text-xs text-slate-700">
                <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-2">
                  Specialized Tracks:
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>Performing Arts (Music, Theatre &amp; Dance)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>Visual, Fine &amp; Applied Digital Arts</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>Sports Science &amp; Athletic Coaching</span>
                </div>
              </div>
            </div>
          </div>

          {/* Self-Supported Intake Information */}
          <div className="mt-16 bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-subtle flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-starehe-blue-900 bg-starehe-blue-50 px-3 py-1 rounded-full mb-3">
                Starting 2027 Cohort
              </div>
              <h3 className="font-serif text-2xl font-bold text-starehe-blue-950">
                Self-Supported Enrollment Opportunities
              </h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                While 70% of admissions remain strictly reserved for bright disadvantaged
                girls on full charitable sponsorship, Starehe Girls&apos; Centre admits
                30% of self-supported students who seek to benefit from our disciplined
                academic sanctuary and world-class faculty.
              </p>
            </div>

            <Link
              href="/contact"
              className="flex-shrink-0 px-8 py-3.5 rounded-full bg-starehe-blue-900 hover:bg-starehe-blue-800 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
            >
              Inquire About 2027 Intake
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
