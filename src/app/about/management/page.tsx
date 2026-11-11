import React from "react";
import { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LeaderCard } from "@/components/ui/LeaderCard";
import { BOARD_OF_MANAGEMENT } from "@/data/school-data";
import { ShieldCheck, BookOpen, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Board of Management (BOM) | Institutional Oversight",
  description:
    "Meet the Board of Management of Starehe Girls' Centre, chaired by Prof. Mary Getui, providing academic strategy, faculty oversight, and student welfare administration under the Basic Education Act 2013.",
};

export default function ManagementPage() {
  return (
    <div>
      <Breadcrumb
        items={[
          { label: "About Us", href: "/about" },
          { label: "Board of Management" },
        ]}
      />

      {/* Hero */}
      <section className="py-16 sm:py-20 bg-starehe-blue-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-starehe-gold-accent/20 text-starehe-gold-300 border border-starehe-gold-accent/30 mb-4">
              Academic &amp; Operational Oversight
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              The Board of Management (BOM)
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-200 leading-relaxed font-light">
              Constituted under the provisions of the Basic Education Act, 2013, the
              Board of Management provides direct oversight of academic excellence,
              teaching faculty development, financial management, and student discipline.
            </p>
          </div>
        </div>
      </section>

      {/* BOM Members Grid */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="BOM Leadership"
            title="Stewarding Daily Educational Excellence"
            description="Chaired by Prof. Mary Getui, the Board of Management works hand-in-hand with school administrators to uphold the rigorous standards of 'The Starehe Way'."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {BOARD_OF_MANAGEMENT.map((member) => (
              <LeaderCard key={member.name} leader={member} />
            ))}
          </div>

          {/* Statutory Mandate Callout */}
          <div className="mt-16 bg-white rounded-2xl p-8 border border-slate-200 shadow-subtle">
            <h3 className="font-serif text-xl font-bold text-starehe-blue-950 mb-3">
              Statutory Roles and Responsibilities of the BOM
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              In accordance with Ministry of Education regulations and guidelines, the
              Board of Management exercises fiduciary and pedagogical duties to ensure
              uncompromised educational service delivery:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm text-slate-700">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="font-bold text-starehe-blue-900 mb-1">
                  1. Academic Integrity
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Monitoring examination preparedness, CBC Senior School rollout,
                  faculty staffing, and curriculum delivery standards.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="font-bold text-starehe-blue-900 mb-1">
                  2. Student Welfare &amp; Safety
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Ensuring child protection policies, nutrition, dormitory health,
                  and psychosocial guidance for all 800 boarding students.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="font-bold text-starehe-blue-900 mb-1">
                  3. Fiduciary Accountability
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Supervising transparent procurement tenders, annual budgeting,
                  and statutory audits in compliance with the Public Procurement Act.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
