import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  GraduationCap,
  Sparkles,
  BookOpen,
  Compass,
  ArrowRight,
  CheckCircle2,
  Award,
} from "lucide-react";
import { ACADEMIC_TRACK_RECORD } from "@/data/school-data";

export const metadata: Metadata = {
  title: "Academics Hub | Excellence, Mentorship & Performance",
  description:
    "Explore academic excellence at Starehe Girls' Centre. Discover our proven KCSE record, 'Operation Plus 5' philosophy, and preparation for CBC Senior School pathways.",
};

export default function AcademicsPage() {
  return (
    <div>
      <Breadcrumb items={[{ label: "Academics", href: "/academics" }, { label: "Overview" }]} />

      {/* Hero */}
      <section className="py-16 sm:py-20 bg-starehe-blue-950 text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-starehe-gold-accent/20 text-starehe-gold-300 border border-starehe-gold-accent/30 mb-4">
              Academic Philosophy
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              A Tradition of Uncompromising Academic Excellence
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-200 leading-relaxed font-light">
              At Starehe Girls&apos; Centre, academic achievement is not an accident—it
              is a carefully cultivated culture combining individualised mentorship,
              the &ldquo;Operation Plus 5&rdquo; self-evaluation slogan, and visionary preparation
              for the Competency-Based Education (CBE) pathways.
            </p>
          </div>
        </div>
      </section>

      {/* Academic Highlights Cards */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Core Academic Pillars"
            title="The Starehe Approach to Scholastic Mastery"
            description="Our academic framework pairs intensive pedagogical instruction with compassionate psycho-social care, ensuring our girls excel in national examinations and beyond."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Pillar 1: KCSE Excellence */}
            <div className="bg-slate-50 rounded-2xl p-7 border border-slate-200 shadow-subtle hover:border-starehe-blue-300 transition-colors flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-starehe-blue-100 text-starehe-blue-900 flex items-center justify-center mb-5">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-bold text-starehe-blue-950 mb-2">
                  KCSE Performance Track Record
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  Over 18 years, 95% of graduates have qualified for direct public university
                  placement. 2025 KCSE recorded a 8.90 (B) mean with +0.07 positive deviation.
                </p>
              </div>
              <Link
                href="/academics/performance"
                className="inline-flex items-center space-x-1.5 text-xs font-bold text-starehe-blue-900 hover:text-starehe-maroon-800"
              >
                <span>View KCSE Analytics &amp; Deviation Trends</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Pillar 2: Operation Plus 5 */}
            <div className="bg-starehe-blue-950 text-white rounded-2xl p-7 shadow-elevation relative overflow-hidden flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-starehe-gold-accent/20 text-starehe-gold-300 flex items-center justify-center mb-5">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-bold text-white mb-2">
                  &ldquo;Operation Plus 5&rdquo; Slogan
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  Every girl sets a personal target to improve by at least 5 marks per subject
                  in each evaluation cycle. Awarding the &ldquo;Most Improved&rdquo; ensures every
                  student experiences the joy of progress.
                </p>
              </div>
              <Link
                href="/academics/curriculum"
                className="inline-flex items-center space-x-1.5 text-xs font-bold text-starehe-gold-300 hover:text-white"
              >
                <span>Discover the Pedagogical Strategy</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Pillar 3: CBC Senior School Pathways */}
            <div className="bg-slate-50 rounded-2xl p-7 border border-slate-200 shadow-subtle hover:border-starehe-maroon-300 transition-colors flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-starehe-maroon-100 text-starehe-maroon-800 flex items-center justify-center mb-5">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-bold text-starehe-blue-950 mb-2">
                  Senior School CBC (Grade 10–12)
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  Preparing for Kenya&apos;s new Competency-Based Education framework with three
                  accredited pathways: STEM, Social Sciences, and Arts &amp; Sports Science.
                </p>
              </div>
              <Link
                href="/academics/curriculum"
                className="inline-flex items-center space-x-1.5 text-xs font-bold text-starehe-maroon-800 hover:underline"
              >
                <span>Read Senior School Curriculum Guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Academic Navigation Links */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link
              href="/academics/performance"
              className="p-6 rounded-xl bg-white border border-slate-200 shadow-subtle hover:shadow-elevation transition-all group"
            >
              <div className="font-serif text-lg font-bold text-starehe-blue-950 group-hover:text-starehe-maroon-800">
                KCSE Performance
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Detailed analysis of historical mean scores and university transition rates.
              </p>
            </Link>

            <Link
              href="/academics/curriculum"
              className="p-6 rounded-xl bg-white border border-slate-200 shadow-subtle hover:shadow-elevation transition-all group"
            >
              <div className="font-serif text-lg font-bold text-starehe-blue-950 group-hover:text-starehe-maroon-800">
                Curriculum &amp; CBC
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Senior School Grade 10 pathways: STEM, Social Sciences, Arts &amp; Sports.
              </p>
            </Link>

            <Link
              href="/academics/departments"
              className="p-6 rounded-xl bg-white border border-slate-200 shadow-subtle hover:shadow-elevation transition-all group"
            >
              <div className="font-serif text-lg font-bold text-starehe-blue-950 group-hover:text-starehe-maroon-800">
                Departments
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Explore Sciences, Mathematics, Languages, Humanities, and Technical Studies.
              </p>
            </Link>

            <Link
              href="/academics/kuccps"
              className="p-6 rounded-xl bg-white border border-slate-200 shadow-subtle hover:shadow-elevation transition-all group"
            >
              <div className="font-serif text-lg font-bold text-starehe-blue-950 group-hover:text-starehe-maroon-800">
                KUCCPS Placement
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Official placement advisory for graduating KCSE candidates and portal guides.
              </p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
