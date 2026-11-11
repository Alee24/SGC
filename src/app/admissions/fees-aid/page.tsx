import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { EditorialPageLayout } from "@/components/layout/EditorialPageLayout";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  HeartHandshake,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Sponsorship & Fees Policy | Charitable Model & Tuition",
  description:
    "Learn about Starehe Girls' Centre charitable sponsorship model. 70% of bright disadvantaged girls receive full free secondary education, supported by donors and our KCDF Endowment.",
};

const ADMISSIONS_SIDEBAR_LINKS = [
  { label: "Admissions Overview", href: "/admissions" },
  { label: "Form 1 & The Blue Form", href: "/admissions/form-one" },
  { label: "CBC Senior School (Grade 10)", href: "/admissions/senior-school" },
  { label: "Fees & Sponsorship Aid", href: "/admissions/fees-aid", active: true },
];

export default function FeesAndAidPage() {
  return (
    <EditorialPageLayout
      breadcrumbs={[
        { label: "Admissions", href: "/admissions" },
        { label: "Sponsorship & Fees Policy" },
      ]}
      kicker="Charitable Framework"
      title="Sponsorship & Fees Policy"
      description="Founded on the foundational conviction that poverty should never extinguish academic potential, Starehe Girls' Centre operates a transparent charitable model funded by national and international philanthropy."
      heroFacts={[
        { label: "Sponsored Quota", value: "70% Full Charity" },
        { label: "Self-Supported Quota", value: "30% MoE Regulated" },
        { label: "Endowment Partner", value: "KCDF Permanent Fund" },
        { label: "Admission Guarantee", value: "Strictly Need & Merit" },
      ]}
      sidebarTitle="Admissions Hub"
      sidebarLinks={ADMISSIONS_SIDEBAR_LINKS}
    >
      <div className="space-y-10">
        {/* Two Pillars Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 1. Sponsored Students (70%) */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-subtle flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center space-x-1.5 text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full mb-3">
                <HeartHandshake className="w-3.5 h-3.5 text-emerald-600" />
                <span>Full Charitable Scholarship</span>
              </div>
              <h3 className="font-serif text-xl font-bold text-starehe-blue-950 mb-2">
                Sponsored Scholars (70%)
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">
                Academically promising girls from economically vulnerable backgrounds who qualify
                via the Blue Form needs assessment receive a 100% comprehensive scholarship.
              </p>

              <div className="space-y-2.5 mb-6 text-xs text-slate-700">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span><strong>100% Tuition &amp; Academic Instruction</strong></span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span><strong>Full Boarding, Bedding &amp; Residential Care</strong></span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span><strong>Nutritious Meals Planned by Certified Cateress</strong></span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span><strong>Healthcare &amp; On-Campus Dispensary Services</strong></span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span><strong>Textbooks, Lab Equipment &amp; School Uniforms</strong></span>
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-100 text-[11px] text-emerald-900 leading-relaxed">
              Funded by individual benefactors, corporate partners, charity golf/walk events, and the KCDF Endowment.
            </div>
          </div>

          {/* 2. Self-Supported Students (30%) */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-subtle flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center space-x-1.5 text-[11px] font-bold uppercase tracking-wider text-starehe-blue-800 bg-starehe-blue-50 px-3 py-1 rounded-full mb-3">
                <Sparkles className="w-3.5 h-3.5 text-starehe-blue-800" />
                <span>Self-Supported Track</span>
              </div>
              <h3 className="font-serif text-xl font-bold text-starehe-blue-950 mb-2">
                Self-Supported Scholars (30%)
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">
                To guarantee institutional sustainability and foster diverse community integration,
                a regulated portion of admissions is open to self-supported families.
              </p>

              <div className="space-y-2.5 mb-6 text-xs text-slate-700">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-starehe-blue-800 flex-shrink-0" />
                  <span>Strictly regulated in line with Ministry of Education directives</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-starehe-blue-800 flex-shrink-0" />
                  <span>Transparent fee schedules with zero hidden levies</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-starehe-blue-800 flex-shrink-0" />
                  <span>All surplus reinvested into classrooms, dorms and laboratories</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-starehe-blue-800 flex-shrink-0" />
                  <span>Equal treatment: identical uniforms, dorms, and dining for all girls</span>
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-starehe-blue-50/60 border border-starehe-blue-100 text-[11px] text-starehe-blue-950 leading-relaxed">
              For detailed fee schedules and enrollment inquiries, contact the Bursar via info@starehegirlscentre.co.ke.
            </div>
          </div>
        </section>

        {/* Ethical Governance Pledge */}
        <section className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200">
          <div className="flex items-start space-x-4">
            <div className="p-3 rounded-xl bg-starehe-blue-100 text-starehe-blue-900 mt-1 flex-shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-starehe-blue-950">
                Ethical Governance &amp; Zero Corruption Guarantee
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                In honoring the sacred legacy of the late Dr. Geoffrey William Griffin, Starehe Girls&apos;
                Centre maintains an uncompromising anti-corruption stance. No monetary contribution
                or connection can buy admission. Need and academic merit remain our sole criteria.
              </p>
              <div className="mt-4 pt-4 border-t border-slate-200 flex flex-wrap gap-4 text-xs font-semibold text-starehe-blue-900">
                <Link href="/admissions/form-one" className="hover:underline flex items-center space-x-1">
                  <span>How Form 1 selection works</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link href="/giving" className="hover:underline flex items-center space-x-1">
                  <span>Sponsor a girl&apos;s education</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </EditorialPageLayout>
  );
}
