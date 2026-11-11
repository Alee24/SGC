import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { EditorialPageLayout } from "@/components/layout/EditorialPageLayout";
import { SectionHeading } from "@/components/ui/SectionHeading";
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

const ADMISSIONS_SIDEBAR_LINKS = [
  { label: "Admissions Overview", href: "/admissions", active: true },
  { label: "Form 1 & The Blue Form", href: "/admissions/form-one" },
  { label: "CBC Senior School (Grade 10)", href: "/admissions/senior-school" },
  { label: "Fees & Sponsorship Aid", href: "/admissions/fees-aid" },
];

export default function AdmissionsOverviewPage() {
  return (
    <EditorialPageLayout
      breadcrumbs={[{ label: "Admissions", href: "/admissions" }, { label: "Overview" }]}
      kicker="Enrollment Guidelines"
      title="Admissions to Starehe Girls' Centre"
      description="We welcome 200 young women annually into our family: three-quarters on full charitable sponsorship from vulnerable backgrounds across Kenya, and one-quarter self-supported students seeking holistic academic excellence."
      heroFacts={[
        { label: "Annual Intake", value: "200 Girls Annually" },
        { label: "Charity Quota", value: "70–75% Full Sponsorship" },
        { label: "County Quota", value: "All 47 Counties" },
        { label: "Blue Form Cost", value: "100% Free of Charge" },
      ]}
      sidebarTitle="Admissions Hub"
      sidebarLinks={ADMISSIONS_SIDEBAR_LINKS}
    >
      <div className="space-y-10">
        {/* Anti-Fraud Banner */}
        <section className="bg-amber-50 border-2 border-amber-300/80 rounded-2xl p-5 shadow-sm">
          <div className="flex items-start space-x-3.5">
            <AlertTriangle className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
            <p className="text-xs sm:text-sm text-amber-950 leading-relaxed">
              <strong>CRITICAL INTEGRITY NOTICE:</strong> The official Starehe Blue Form
              Application is strictly <strong>FREE OF CHARGE</strong> and is <strong>NEVER SOLD</strong> under
              any circumstances. Beware of fraudsters claiming to sell application forms.
            </p>
          </div>
        </section>

        {/* Two Admission Tracks */}
        <section className="space-y-6">
          <SectionHeading
            badge="Admission Pathways"
            title="Choose Your Admission Stream"
            description="Starehe Girls' Centre admits students at Form 1 for the 8-4-4 cycle and Grade 10 for the Competency-Based Education (CBE) Senior School."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Track 1: Form 1 Blue Form */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-subtle hover:border-starehe-blue-300 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-starehe-maroon-800 bg-starehe-maroon-50 px-2.5 py-0.5 rounded-full border border-starehe-maroon-200">
                    8-4-4 Secondary Track
                  </span>
                  <FileText className="w-5 h-5 text-starehe-maroon-800" />
                </div>

                <h3 className="font-serif text-xl font-bold text-starehe-blue-950 mb-2">
                  Form 1 Admission (The Blue Form)
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Primary entry point for bright but economically disadvantaged girls across
                  all 47 counties of Kenya. Applications close on July 31st annually.
                </p>

                <div className="space-y-2 mb-6 text-xs text-slate-700">
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-starehe-maroon-800 mt-0.5 flex-shrink-0" />
                    <span>Candidate must be 15 years old or younger</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-starehe-maroon-800 mt-0.5 flex-shrink-0" />
                    <span>Must select Starehe Girls&apos; as 1st Choice National School</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-starehe-maroon-800 mt-0.5 flex-shrink-0" />
                    <span>Needs assessment scale 1–10 &amp; home verification visit</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-starehe-maroon-800 mt-0.5 flex-shrink-0" />
                    <span>Authentication by Headteacher, Area Chief &amp; Clergy</span>
                  </div>
                </div>
              </div>

              <Link
                href="/admissions/form-one"
                className="w-full inline-flex items-center justify-center space-x-2 py-2.5 px-5 rounded-full bg-starehe-maroon-800 hover:bg-starehe-maroon-700 text-white font-semibold text-xs tracking-wide transition-colors shadow-sm"
              >
                <span>Read Full Blue Form Process</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Track 2: CBC Senior School Grade 10 */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-subtle hover:border-starehe-blue-300 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold tracking-wide text-starehe-blue-800 bg-starehe-blue-50 px-2.5 py-0.5 rounded-full border border-starehe-blue-200">
                    CBE Senior School Track
                  </span>
                  <GraduationCap className="w-5 h-5 text-starehe-blue-900" />
                </div>

                <h3 className="font-serif text-xl font-bold text-starehe-blue-950 mb-2">
                  Senior School CBC (Grade 10)
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Transition into Senior School under Kenya&apos;s Competency-Based Education
                  system. Offering 3 pathways matching learner abilities and career passions.
                </p>

                <div className="space-y-2 mb-6 text-xs text-slate-700">
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-starehe-maroon-800 mt-0.5 flex-shrink-0" />
                    <span>STEM Pathway (Pure Sciences, Robotics, Health Sciences)</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-starehe-maroon-800 mt-0.5 flex-shrink-0" />
                    <span>Social Sciences Pathway (Humanities, Business Studies)</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-starehe-maroon-800 mt-0.5 flex-shrink-0" />
                    <span>Arts &amp; Sports Science (Music, Visual Arts, Athletics)</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-starehe-maroon-800 mt-0.5 flex-shrink-0" />
                    <span>Self-supported enrollment opens beginning 2027</span>
                  </div>
                </div>
              </div>

              <Link
                href="/admissions/senior-school"
                className="w-full inline-flex items-center justify-center space-x-2 py-2.5 px-5 rounded-full bg-starehe-blue-900 hover:bg-starehe-blue-800 text-white font-semibold text-xs tracking-wide transition-colors shadow-sm"
              >
                <span>Senior School CBC Guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Pan-Kenyan County Quota Policy */}
        <section className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200">
          <h3 className="font-serif text-lg font-bold text-starehe-blue-950 mb-2">
            Pan-Kenyan Representation Across All 47 Counties
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
            To guarantee national unity and equal opportunity, applications are sorted into 47
            county files so that girls from Marsabit, Kwale, Turkana, Kisumu, Mandera, and Nairobi
            have equitable seats at Starehe. A 12-member select committee evaluates each case.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/admissions/fees-aid"
              className="px-5 py-2.5 rounded-full border border-starehe-maroon-800 text-starehe-maroon-800 font-bold text-xs uppercase tracking-wider hover:bg-starehe-maroon-50 transition-colors"
            >
              Sponsorship &amp; Fees Policy
            </Link>
            <a
              href="tel:0707900852"
              className="px-5 py-2.5 rounded-full bg-white border border-slate-200 text-slate-800 font-bold text-xs uppercase tracking-wider hover:bg-slate-100 transition-colors"
            >
              Admissions Desk: 0707 900 852
            </a>
          </div>
        </section>
      </div>
    </EditorialPageLayout>
  );
}
