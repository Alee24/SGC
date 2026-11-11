import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { EditorialPageLayout } from "@/components/layout/EditorialPageLayout";
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

const ADMISSIONS_SIDEBAR_LINKS = [
  { label: "Admissions Overview", href: "/admissions" },
  { label: "Online Grade 10 Application", href: "/admissions/apply" },
  { label: "Form 1 & The Blue Form", href: "/admissions/form-one" },
  { label: "CBC Senior School (Grade 10)", href: "/admissions/senior-school", active: true },
  { label: "Fees & Sponsorship Aid", href: "/admissions/fees-aid" },
];

export default function SeniorSchoolAdmissionPage() {
  return (
    <EditorialPageLayout
      breadcrumbs={[
        { label: "Admissions", href: "/admissions" },
        { label: "Senior School CBC (Grade 10)" },
      ]}
      kicker="Competency-Based Education (CBE)"
      title="Senior School Grade 10 Admissions"
      description="As Kenya advances Competency-Based Education, Starehe Girls' Centre provides premier Senior School placement across three comprehensive pathways tailored for 21st-century innovation and global leadership."
      heroFacts={[
        { label: "Target Cohort", value: "Grade 10 Transition" },
        { label: "Career Pathways", value: "STEM, Social, Arts/Sports" },
        { label: "Quota Model", value: "70% Sponsored / 30% Self" },
        { label: "Self-Supported Cohort", value: "Beginning 2027" },
      ]}
      sidebarTitle="Admissions Hub"
      sidebarLinks={ADMISSIONS_SIDEBAR_LINKS}
    >
      <div className="space-y-10">
        {/* Intro Overview */}
        <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-subtle">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-starehe-blue-950 mb-3">
            Pioneering the Senior School CBE Era
          </h2>
          <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
            Starehe Girls&apos; Centre has updated its pedagogical facilities, STEM laboratories,
            digital creative suites, and athletic grounds to offer full accreditation for all three
            Ministry of Education Senior School pathways. Students benefit from intensive academic
            mentorship, career counseling, university placement prep, and character development.
          </p>
        </section>

        {/* The 3 Pathways */}
        <section className="space-y-6">
          <SectionHeading
            badge="Accredited Tracks"
            title="Senior School Academic Pathways"
            description="Our specialized facilities ensure world-class delivery across all three curriculum tracks."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* STEM */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-subtle hover:border-starehe-blue-300 transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-starehe-blue-100 text-starehe-blue-900 flex items-center justify-center mb-4">
                  <Cpu className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg font-bold text-starehe-blue-950 mb-1.5">
                  1. STEM Pathway
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Engineered for aspiring physicians, software engineers, data scientists, and agronomists.
                </p>
                <div className="space-y-2 text-xs text-slate-700">
                  <div className="font-bold text-slate-900 uppercase tracking-wider text-[10px]">
                    Specialized Tracks:
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>Pure Sciences (Physics, Chemistry, Biology)</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>Technical &amp; Engineering Studies</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>Computer Science, Coding &amp; Robotics</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Sciences */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-subtle hover:border-starehe-blue-300 transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-starehe-maroon-100 text-starehe-maroon-800 flex items-center justify-center mb-4">
                  <Briefcase className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg font-bold text-starehe-blue-950 mb-1.5">
                  2. Social Sciences
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Nurturing future legal minds, economists, diplomats, journalists, and policy leaders.
                </p>
                <div className="space-y-2 text-xs text-slate-700">
                  <div className="font-bold text-slate-900 uppercase tracking-wider text-[10px]">
                    Specialized Tracks:
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>History, Governance &amp; Global Diplomacy</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>Business Studies, Finance &amp; Entrepreneurship</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>Geography, Environmental Planning &amp; Ethics</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Arts & Sports */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-subtle hover:border-starehe-blue-300 transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-starehe-gold-100 text-starehe-gold-800 flex items-center justify-center mb-4">
                  <Palette className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg font-bold text-starehe-blue-950 mb-1.5">
                  3. Arts &amp; Sports Science
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Championing athletic excellence, theatrical mastery, musical composition, and visual design.
                </p>
                <div className="space-y-2 text-xs text-slate-700">
                  <div className="font-bold text-slate-900 uppercase tracking-wider text-[10px]">
                    Specialized Tracks:
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>Performing Arts (Music, Theatre &amp; Dance)</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>Visual, Fine &amp; Applied Digital Media</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>Sports Science &amp; Athletic Coaching</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Self-Supported Intake Information */}
        <section className="bg-starehe-blue-50/80 rounded-2xl p-6 sm:p-8 border border-starehe-blue-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-xl">
            <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-starehe-blue-900 text-white">
              Starting 2027 Cohort
            </span>
            <h3 className="font-serif text-lg font-bold text-starehe-blue-950">
              Self-Supported Enrollment Opportunities (30% Quota)
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              While 70% of admissions remain strictly reserved for bright disadvantaged girls on full
              charitable scholarships, Starehe Girls&apos; Centre admits 30% of self-supported students
              seeking our disciplined academic sanctuary and world-class faculty.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 flex-shrink-0">
            <Link
              href="/admissions/apply"
              className="px-6 py-3 rounded-lg bg-starehe-maroon-800 hover:bg-starehe-maroon-700 text-white font-semibold text-xs tracking-wide transition-colors shadow-sm inline-flex items-center space-x-1.5"
            >
              <span>Apply Online (Grade 10)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <a
              href="/api/applications/form-pdf"
              className="px-5 py-3 rounded-lg bg-starehe-blue-900 hover:bg-starehe-blue-800 text-white font-semibold text-xs tracking-wide transition-colors shadow-sm inline-flex items-center space-x-1.5"
            >
              <span>Download Blank Form (PDF)</span>
            </a>
          </div>
        </section>
      </div>
    </EditorialPageLayout>
  );
}
