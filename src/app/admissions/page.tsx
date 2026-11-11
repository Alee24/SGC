import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ADMISSION_CRITERIA } from "@/data/school-data";
import {
  FileText,
  GraduationCap,
  HeartHandshake,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Download,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Admissions | Form 1 & Senior School Entry",
  description:
    "Admissions guidelines for Starehe Girls' Centre. Admitting 200 girls annually: 75% fully sponsored bright disadvantaged girls via the official Blue Form and 25% self-supported scholars.",
};

export default function AdmissionsOverviewPage() {
  return (
    <div>
      <Breadcrumb items={[{ label: "Admissions", href: "/admissions" }, { label: "Overview" }]} />

      {/* Hero */}
      <section className="py-16 sm:py-20 bg-starehe-blue-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-starehe-gold-accent/20 text-starehe-gold-300 border border-starehe-gold-accent/30 mb-4">
              Enrollment Guidelines
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              Admissions to Starehe Girls&apos; Centre
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-200 leading-relaxed font-light">
              We welcome 200 young women annually into our family: three-quarters on
              full charitable sponsorship from vulnerable backgrounds across Kenya,
              and one-quarter self-supported students seeking holistic academic excellence.
            </p>
          </div>
        </div>
      </section>

      {/* Important Integrity Warning Notice */}
      <section className="py-6 bg-amber-50 border-y border-amber-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3 text-amber-900 text-xs sm:text-sm">
            <AlertTriangle className="w-5 h-5 text-amber-700 flex-shrink-0" />
            <p>
              <strong>CRITICAL INTEGRITY NOTICE:</strong> The official Starehe Blue Form
              Application is strictly <strong>FREE OF CHARGE</strong> and is <strong>NEVER SOLD</strong> under
              any circumstances. Beware of fraudsters claiming to sell application forms.
            </p>
          </div>
        </div>
      </section>

      {/* Two Admission Tracks */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Admission Pathways"
            title="Choose Your Admission Stream"
            description="Starehe Girls' Centre admits students at Form 1 for the 8-4-4 cycle and Grade 10 for the Competency-Based Education (CBE) Senior School."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Track 1: Form 1 Blue Form */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-subtle hover:shadow-elevation transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-starehe-maroon-800 bg-starehe-maroon-50 px-3 py-1 rounded-full border border-starehe-maroon-200">
                    8-4-4 Secondary Track
                  </span>
                  <FileText className="w-6 h-6 text-starehe-maroon-800" />
                </div>

                <h3 className="font-serif text-2xl font-bold text-starehe-blue-950 mb-3">
                  Form 1 Admission (The Blue Form)
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                  Primary entry point for bright but economically disadvantaged girls across
                  all 47 counties of Kenya. Applications close on July 31st of the candidate&apos;s
                  examination year.
                </p>

                <div className="space-y-3 mb-6 text-xs text-slate-700">
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span>Candidate must be 15 years old or younger</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span>Must select Starehe Girls&apos; as 1st Choice National School</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span>Needs assessment scale 1–10 &amp; home verification visit</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span>Authentication by Headteacher, Area Chief &amp; Clergy</span>
                  </div>
                </div>
              </div>

              <Link
                href="/admissions/form-one"
                className="w-full inline-flex items-center justify-center space-x-2 py-3 px-6 rounded-full bg-starehe-maroon-800 hover:bg-starehe-maroon-700 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
              >
                <span>Read Full Blue Form Process</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Track 2: CBC Senior School Grade 10 */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-subtle hover:shadow-elevation transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-starehe-blue-800 bg-starehe-blue-50 px-3 py-1 rounded-full border border-starehe-blue-200">
                    CBE Senior School Track
                  </span>
                  <GraduationCap className="w-6 h-6 text-starehe-blue-900" />
                </div>

                <h3 className="font-serif text-2xl font-bold text-starehe-blue-950 mb-3">
                  Senior School CBC (Grade 10)
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                  Transition into Senior School under Kenya&apos;s Competency-Based Education
                  system. Offering 3 pathways matching learner abilities and career passions.
                </p>

                <div className="space-y-3 mb-6 text-xs text-slate-700">
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span>STEM Pathway (Pure Sciences, Robotics, Health Sciences)</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span>Social Sciences Pathway (Humanities, Business Studies)</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span>Arts &amp; Sports Science (Music, Visual Arts, Athletics)</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span>Self-supported enrollment opens beginning 2027</span>
                  </div>
                </div>
              </div>

              <Link
                href="/admissions/senior-school"
                className="w-full inline-flex items-center justify-center space-x-2 py-3 px-6 rounded-full bg-starehe-blue-900 hover:bg-starehe-blue-800 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
              >
                <span>Senior School CBC Transition Guide</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pan-Kenyan County Quota Policy */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <h3 className="font-serif text-2xl font-bold text-starehe-blue-950 mb-3">
                All 47 Counties Represented
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                To guarantee true national unity and equal opportunity, shortlisted
                applications are organized by county so that young women from Marsabit to
                Kwale, Turkana to Lamu, Kisumu to Garissa have a seat at Starehe.
                A 12-member committee reviews every case with utmost care.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              <Link
                href="/admissions/fees-aid"
                className="px-6 py-3 rounded-full border border-starehe-maroon-800 text-starehe-maroon-800 font-bold text-xs uppercase tracking-wider text-center hover:bg-starehe-maroon-50 transition-colors"
              >
                Sponsorship &amp; Fees Policy
              </Link>
              <a
                href="tel:0707900852"
                className="px-6 py-3 rounded-full bg-slate-100 text-slate-800 font-bold text-xs uppercase tracking-wider text-center hover:bg-slate-200 transition-colors"
              >
                Call Admissions: 0707 900 852
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
