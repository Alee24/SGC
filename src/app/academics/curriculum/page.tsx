import React from "react";
import { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
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
} from "lucide-react";

export const metadata: Metadata = {
  title: "Curriculum & CBC Transition | Senior School Pathways",
  description:
    "Comprehensive overview of Starehe Girls' Centre curriculum: 8-4-4 secondary framework transitioning into Senior School Competency-Based Education (CBE) across STEM, Social Sciences, and Arts & Sports.",
};

export default function CurriculumPage() {
  const pathwayIcons = [
    <Cpu key="stem" className="w-6 h-6 text-starehe-blue-700" />,
    <Briefcase key="social" className="w-6 h-6 text-starehe-maroon-700" />,
    <Palette key="arts" className="w-6 h-6 text-starehe-gold-600" />,
  ];

  return (
    <div>
      <Breadcrumb
        items={[
          { label: "Academics", href: "/academics" },
          { label: "Curriculum & CBC Transition" },
        ]}
      />

      {/* Hero */}
      <section className="py-16 sm:py-20 bg-starehe-blue-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-starehe-gold-accent/20 text-starehe-gold-300 border border-starehe-gold-accent/30 mb-4">
              Academic Framework
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              Curriculum &amp; Senior School CBE Transition
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-200 leading-relaxed font-light">
              Guiding our students through both Kenya&apos;s 8-4-4 curriculum and the
              transformative Competency-Based Education (CBE) framework, fostering
              critical thinking, problem-solving, and practical vocational competency.
            </p>
          </div>
        </div>
      </section>

      {/* Three CBC Pathways */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Senior School (Grade 10–12)"
            title="Competency-Based Education (CBE) Pathways"
            description="Starehe Girls' Centre has completed extensive infrastructural and teacher-readiness investments to offer all three premier Senior School pathways."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ACADEMIC_TRACK_RECORD.pathwaysCBC.map((pathway, idx) => (
              <div
                key={pathway.name}
                className="bg-white rounded-2xl p-8 border border-slate-200 shadow-subtle hover:shadow-elevation transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center mb-6">
                    {pathwayIcons[idx]}
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-starehe-blue-950 mb-3">
                    {pathway.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                    {pathway.description}
                  </p>

                  <div className="border-t border-slate-100 pt-5">
                    <div className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                      Subject Combinations &amp; Tracks:
                    </div>
                    <ul className="space-y-2 text-xs text-slate-700">
                      {pathway.tracks.map((track) => (
                        <li key={track} className="flex items-center space-x-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                          <span>{track}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Assessment Framework */}
      <section className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <SectionHeading
              badge="Evaluation &amp; Metrics"
              title="Assessment Methodologies &amp; Mentorship"
              description="Continuous feedback ensures every student's learning gaps are detected early and addressed with tailored remediation."
            />

            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
                <h3 className="font-serif text-lg font-bold text-starehe-blue-950 mb-2">
                  1. Continuous Assessment Tests (CATs)
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Administered twice every term to track progress in every syllabus unit.
                  Scores form the basis of personal goal-setting in &ldquo;Operation Plus 5&rdquo;.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
                <h3 className="font-serif text-lg font-bold text-starehe-blue-950 mb-2">
                  2. Joint National School Mocks
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Form 4 examination candidates participate in rigorous multi-county national
                  school trial examinations, benchmarking against Kenya&apos;s leading academies.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
                <h3 className="font-serif text-lg font-bold text-starehe-blue-950 mb-2">
                  3. Practical Science Laboratory Practicals
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Hands-on experimentation in Biology, Chemistry, and Physics laboratories,
                  fostering empirical scientific thinking and mastery of laboratory apparatus.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
