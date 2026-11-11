import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  HeartHandshake,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Sponsorship & Fees Policy | Charitable Model & Tuition",
  description:
    "Learn about Starehe Girls' Centre charitable sponsorship model. 70% of bright disadvantaged girls receive full free secondary education, supported by donors and our KCDF Endowment.",
};

export default function FeesAndAidPage() {
  return (
    <div>
      <Breadcrumb
        items={[
          { label: "Admissions", href: "/admissions" },
          { label: "Sponsorship & Fees Policy" },
        ]}
      />

      {/* Hero */}
      <section className="py-16 sm:py-20 bg-starehe-blue-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-starehe-gold-accent/20 text-starehe-gold-300 border border-starehe-gold-accent/30 mb-4">
              Charitable Framework
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              Sponsorship &amp; Fees Policy
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-200 leading-relaxed font-light">
              Founded on the belief that poverty should never extinguish academic potential,
              Starehe Girls&apos; Centre operates a transparent charitable sponsorship
              model funded by philanthropy and our permanent endowment fund.
            </p>
          </div>
        </div>
      </section>

      {/* Two Pillars */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* 1. Sponsored Students (70-75%) */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-subtle flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full mb-4">
                  Full Charitable Scholarship
                </div>
                <h2 className="font-serif text-2xl font-bold text-starehe-blue-950 mb-3">
                  Sponsored Scholars (70–75%)
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                  Bright girls from economically vulnerable backgrounds who qualify via the
                  official Blue Form needs assessment are granted a 100% comprehensive scholarship.
                </p>

                <div className="space-y-3 mb-6 text-xs text-slate-700">
                  <div className="flex items-center space-x-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span><strong>100% Tuition &amp; Academic Instruction</strong></span>
                  </div>
                  <div className="flex items-center space-x-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span><strong>Full Boarding, Bedding &amp; Residential Care</strong></span>
                  </div>
                  <div className="flex items-center space-x-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span><strong>Nutritious Meals Planned by Certified Cateress</strong></span>
                  </div>
                  <div className="flex items-center space-x-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span><strong>Healthcare &amp; On-Campus Dispensary Services</strong></span>
                  </div>
                  <div className="flex items-center space-x-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span><strong>Textbooks, Laboratory Equipment &amp; School Uniforms</strong></span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600">
                Funded by individual sponsors, corporate partners, and the KCDF Endowment Fund.
              </div>
            </div>

            {/* 2. Self-Supported Students (25-30%) */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-subtle flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-starehe-blue-800 bg-starehe-blue-50 px-3 py-1 rounded-full mb-4">
                  Self-Supported Track
                </div>
                <h2 className="font-serif text-2xl font-bold text-starehe-blue-950 mb-3">
                  Self-Supported Scholars (25–30%)
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                  To ensure institutional financial sustainability and cross-economic integration,
                  a fraction of slots are open to families able to meet standard board and tuition fees.
                </p>

                <div className="space-y-3 mb-6 text-xs text-slate-700">
                  <div className="flex items-center space-x-2.5">
                    <CheckCircle2 className="w-4 h-4 text-starehe-blue-800 flex-shrink-0" />
                    <span>Strictly regulated in line with Ministry of Education guidelines</span>
                  </div>
                  <div className="flex items-center space-x-2.5">
                    <CheckCircle2 className="w-4 h-4 text-starehe-blue-800 flex-shrink-0" />
                    <span>Transparent fee structure with zero hidden or arbitrary charges</span>
                  </div>
                  <div className="flex items-center space-x-2.5">
                    <CheckCircle2 className="w-4 h-4 text-starehe-blue-800 flex-shrink-0" />
                    <span>All revenue re-invested into campus facilities and laboratory blocks</span>
                  </div>
                  <div className="flex items-center space-x-2.5">
                    <CheckCircle2 className="w-4 h-4 text-starehe-blue-800 flex-shrink-0" />
                    <span>Equal treatment: uniform, dormitories, and dining shared equally</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600">
                For detailed fee structure inquiries, kindly reach the Bursar&apos;s office via info@starehegirlscentre.co.ke.
              </div>
            </div>
          </div>

          {/* Ethical Governance Pledge */}
          <div className="mt-16 bg-white rounded-3xl p-8 border border-slate-200 shadow-subtle">
            <div className="flex items-start space-x-4">
              <div className="p-3 rounded-xl bg-starehe-blue-50 text-starehe-blue-900 mt-1">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-starehe-blue-950">
                  Ethical Governance &amp; Zero Corruption Guarantee
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  In honoring the sacred legacy of the late Dr. Geoffrey William Griffin,
                  Starehe Girls&apos; Centre maintains an uncompromising anti-corruption stance.
                  No money is accepted for admissions. Merit and genuine vulnerability are the
                  sole determinants for scholarship placement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
