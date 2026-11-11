import React from "react";
import { Metadata } from "next";
import { EditorialPageLayout } from "@/components/layout/EditorialPageLayout";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ACADEMIC_TRACK_RECORD } from "@/data/school-data";
import {
  BookOpen,
  Cpu,
  Palette,
  Briefcase,
  CheckCircle2,
  FileText,
  Lightbulb,
  FlaskConical,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Curriculum & CBC Transition | Senior School Pathways",
  description:
    "Comprehensive overview of Starehe Girls' Centre curriculum: 8-4-4 secondary framework transitioning into Senior School Competency-Based Education (CBE) across STEM, Social Sciences, and Arts & Sports.",
};

const ACADEMICS_SIDEBAR_LINKS = [
  { label: "Academics Overview", href: "/academics" },
  { label: "KCSE Performance & Data", href: "/academics/performance" },
  { label: "Curriculum & CBC Pathways", href: "/academics/curriculum", active: true },
  { label: "Academic Departments", href: "/academics/departments" },
  { label: "KUCCPS & University Prep", href: "/academics/kuccps" },
];

export default function CurriculumPage() {
  const pathwayIcons = [
    <Cpu key="stem" className="w-5 h-5 text-starehe-blue-700" />,
    <Briefcase key="social" className="w-5 h-5 text-starehe-maroon-700" />,
    <Palette key="arts" className="w-5 h-5 text-starehe-gold-600" />,
  ];

  return (
    <EditorialPageLayout
      breadcrumbs={[
        { label: "Academics", href: "/academics" },
        { label: "Curriculum & CBC Transition" },
      ]}
      kicker="Academic Framework"
      title="Curriculum & Senior School CBE Transition"
      description="Guiding our students through both Kenya's 8-4-4 curriculum and the transformative Competency-Based Education (CBE) framework, fostering analytical depth, problem-solving, and vocational readiness."
      heroFacts={[
        { label: "Curriculum Models", value: "8-4-4 & CBC Senior" },
        { label: "Senior Pathways", value: "3 National Tracks" },
        { label: "Science Labs", value: "Fully Equipped STEM" },
        { label: "Pedagogy", value: "Inquiry-Based Learning" },
      ]}
      sidebarTitle="Academics Hub"
      sidebarLinks={ACADEMICS_SIDEBAR_LINKS}
    >
      <div className="space-y-10">
        {/* Intro */}
        <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-subtle">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-starehe-blue-950 mb-3">
            Dual-System Excellence: Harmonizing 8-4-4 and CBE
          </h2>
          <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
            As the education system in Kenya evolves, Starehe Girls&apos; Centre ensures that current
            8-4-4 candidates receive rigorous preparation for the Kenya Certificate of Secondary
            Education (KCSE), while simultaneously preparing Senior School Grade 10 scholars with
            practical, multidisciplinary competencies across our three accredited pathways.
          </p>
        </section>

        {/* Three CBC Pathways */}
        <section className="space-y-6">
          <SectionHeading
            badge="Senior School (Grade 10–12)"
            title="Competency-Based Education (CBE) Pathways"
            description="Infrastructural readiness and teacher capacity across all three career pathways."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {ACADEMIC_TRACK_RECORD.pathwaysCBC.map((pathway, idx) => (
              <div
                key={pathway.name}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-subtle hover:border-starehe-blue-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center mb-4">
                    {pathwayIcons[idx]}
                  </div>
                  <h3 className="font-serif text-lg font-bold text-starehe-blue-950 mb-2">
                    {pathway.name}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {pathway.description}
                  </p>

                  <div className="border-t border-slate-100 pt-4">
                    <div className="text-[10px] font-bold text-slate-900 uppercase tracking-wider mb-2">
                      Subject Combinations &amp; Tracks:
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-700">
                      {pathway.tracks.map((track) => (
                        <li key={track} className="flex items-start space-x-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-starehe-maroon-800 flex-shrink-0 mt-0.5" />
                          <span>{track}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Assessment Framework */}
        <section className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200 space-y-6">
          <div>
            <h3 className="font-serif text-xl font-bold text-starehe-blue-950">
              Assessment Methodologies &amp; Mentorship
            </h3>
            <p className="text-xs text-slate-600 mt-1">
              Continuous assessment ensures learning gaps are identified early and resolved systematically.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-subtle">
              <div className="flex items-center space-x-2 text-starehe-blue-900 font-bold text-xs uppercase tracking-wider mb-1.5">
                <FileText className="w-4 h-4 text-starehe-gold-accent" />
                <span>1. Bi-Termly CATs</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Administered twice per term to evaluate syllabus mastery and set individual &ldquo;Operation Plus 5&rdquo; targets.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-subtle">
              <div className="flex items-center space-x-2 text-starehe-blue-900 font-bold text-xs uppercase tracking-wider mb-1.5">
                <Lightbulb className="w-4 h-4 text-starehe-gold-accent" />
                <span>2. National Joint Mocks</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Form 4 candidates benchmark with fellow national academies across Nairobi, Central, and Rift Valley counties.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-subtle">
              <div className="flex items-center space-x-2 text-starehe-blue-900 font-bold text-xs uppercase tracking-wider mb-1.5">
                <FlaskConical className="w-4 h-4 text-starehe-gold-accent" />
                <span>3. Science Practicals</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Empirical laboratory investigations in Physics, Chemistry, and Biology to build true scientific mastery.
              </p>
            </div>
          </div>
        </section>
      </div>
    </EditorialPageLayout>
  );
}
