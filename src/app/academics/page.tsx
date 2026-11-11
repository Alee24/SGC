import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { EditorialPageLayout } from "@/components/layout/EditorialPageLayout";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  GraduationCap,
  Sparkles,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  Award,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Academics Hub | Excellence, Mentorship & Performance",
  description:
    "Explore academic excellence at Starehe Girls' Centre. Discover our proven KCSE record, 'Operation Plus 5' philosophy, and preparation for CBC Senior School pathways.",
};

const ACADEMICS_SIDEBAR_LINKS = [
  { label: "Academics Overview", href: "/academics", active: true },
  { label: "KCSE Performance & Data", href: "/academics/performance" },
  { label: "Curriculum & CBC Pathways", href: "/academics/curriculum" },
  { label: "Academic Departments", href: "/academics/departments" },
  { label: "KUCCPS & University Prep", href: "/academics/kuccps" },
];

export default function AcademicsPage() {
  return (
    <EditorialPageLayout
      breadcrumbs={[{ label: "Academics", href: "/academics" }, { label: "Overview" }]}
      kicker="Academic Philosophy"
      title="A Tradition of Uncompromising Academic Excellence"
      description="At Starehe Girls' Centre, academic achievement is a carefully cultivated culture combining individualized faculty mentorship, the 'Operation Plus 5' continuous improvement slogan, and visionary preparation for Competency-Based Education (CBE) pathways."
      heroFacts={[
        { label: "2025 KCSE Mean", value: "8.90 (B)" },
        { label: "Positive Deviation", value: "+0.07 (+0.34 in 2024)" },
        { label: "University Entry", value: "95% 18-Yr Average" },
        { label: "Faculty Ratio", value: "48 Masters : 800 Girls" },
      ]}
      sidebarTitle="Academics Hub"
      sidebarLinks={ACADEMICS_SIDEBAR_LINKS}
    >
      <div className="space-y-10">
        <div>
          <SectionHeading
            badge="Core Academic Pillars"
            title="The Starehe Approach to Scholastic Mastery"
            description="Our academic framework pairs intensive pedagogical instruction with compassionate psycho-social care, ensuring our girls excel in national examinations and beyond."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Pillar 1: KCSE Excellence */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-subtle hover:border-starehe-blue-300 transition-colors flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-starehe-blue-100 text-starehe-blue-900 flex items-center justify-center mb-4">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-starehe-blue-950 mb-2">
                KCSE Track Record
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Over 18 years, 95% of graduates have qualified for direct public university
                placement. 2025 KCSE recorded an 8.90 (B) mean with +0.07 positive deviation.
              </p>
            </div>
            <Link
              href="/academics/performance"
              className="inline-flex items-center space-x-1.5 text-xs font-bold text-starehe-blue-900 hover:text-starehe-maroon-800 pt-2 border-t border-slate-100"
            >
              <span>View KCSE Analytics</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Pillar 2: Operation Plus 5 */}
          <div className="bg-starehe-blue-950 text-white rounded-2xl p-6 shadow-elevation relative overflow-hidden flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-starehe-gold-accent/20 text-starehe-gold-300 flex items-center justify-center mb-4">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-white mb-2">
                &ldquo;Operation Plus 5&rdquo;
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Every girl sets a personal target to improve by at least 5 marks per subject in each
                CAT. Celebrating &ldquo;Most Improved&rdquo; empowers every student.
              </p>
            </div>
            <Link
              href="/academics/curriculum"
              className="inline-flex items-center space-x-1.5 text-xs font-bold text-starehe-gold-300 hover:text-white pt-2 border-t border-white/10"
            >
              <span>Discover the Strategy</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Pillar 3: CBC Senior School */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-subtle hover:border-starehe-maroon-300 transition-colors flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-starehe-maroon-100 text-starehe-maroon-800 flex items-center justify-center mb-4">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-starehe-blue-950 mb-2">
                Senior School CBC
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Preparing for Kenya&apos;s new Competency-Based Education framework across STEM,
                Social Sciences, and Arts &amp; Sports Science pathways.
              </p>
            </div>
            <Link
              href="/academics/curriculum"
              className="inline-flex items-center space-x-1.5 text-xs font-bold text-starehe-maroon-800 hover:underline pt-2 border-t border-slate-100"
            >
              <span>Curriculum Guide</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Academic Hub Quick Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-200">
          <Link
            href="/academics/departments"
            className="p-5 rounded-xl bg-white border border-slate-200 shadow-subtle hover:border-starehe-blue-300 transition-all group"
          >
            <div className="font-serif text-base font-bold text-starehe-blue-950 group-hover:text-starehe-maroon-800 flex items-center justify-between">
              <span>Academic Departments</span>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Explore Sciences, Mathematics, Languages, Humanities, and Applied Studies.
            </p>
          </Link>

          <Link
            href="/academics/kuccps"
            className="p-5 rounded-xl bg-white border border-slate-200 shadow-subtle hover:border-starehe-blue-300 transition-all group"
          >
            <div className="font-serif text-base font-bold text-starehe-blue-950 group-hover:text-starehe-maroon-800 flex items-center justify-between">
              <span>KUCCPS University Placement</span>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Official placement advisory for graduating KCSE candidates and campus IT portal support.
            </p>
          </Link>
        </div>
      </div>
    </EditorialPageLayout>
  );
}
