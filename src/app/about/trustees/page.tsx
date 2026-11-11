import React from "react";
import { Metadata } from "next";
import { EditorialPageLayout } from "@/components/layout/EditorialPageLayout";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LeaderCard } from "@/components/ui/LeaderCard";
import { TRUSTEES } from "@/data/school-data";
import { ShieldCheck, HeartHandshake, FileCheck2, Scale } from "lucide-react";

export const metadata: Metadata = {
  title: "Board of Trustees | Starehe Girls' Centre Trust",
  description:
    "Meet the Board of Trustees of Starehe Girls' Centre, chaired by Mrs. Eunice Mathu and featuring founding patron Dr. Manu Chandaria, safeguarding institutional governance and charitable endowments.",
};

const ABOUT_SIDEBAR_LINKS = [
  { label: "Overview & Mission", href: "/about" },
  { label: "History & Heritage", href: "/about/history" },
  { label: "Board of Trustees", href: "/about/trustees", active: true },
  { label: "Board of Management (BOM)", href: "/about/management" },
  { label: "Administration & Leadership", href: "/about/administration" },
];

export default function TrusteesPage() {
  return (
    <EditorialPageLayout
      breadcrumbs={[
        { label: "About Us", href: "/about" },
        { label: "Board of Trustees" },
      ]}
      kicker="Governance & Fiduciary Stewardship"
      title="The Board of Trustees"
      description="Registered under the Trustees (Perpetual Succession) Act, Cap 164 of the Laws of Kenya, the Board of Trustees exercises overall governance, protects the school's 55-acre heritage, and safeguards the permanent charitable endowment."
      heroFacts={[
        { label: "Statutory Act", value: "Cap 164" },
        { label: "Campus Title", value: "55 Acres in Trust" },
        { label: "Board Chair", value: "Mrs. Eunice Mathu" },
        { label: "Charitable Purpose", value: "Perpetual Public Trust" },
      ]}
      sidebarTitle="About Starehe"
      sidebarLinks={ABOUT_SIDEBAR_LINKS}
    >
      <div className="space-y-12">
        {/* Lead Narrative */}
        <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-subtle">
          <div className="flex items-center space-x-3 mb-4 text-starehe-blue-900">
            <Scale className="w-5 h-5 text-starehe-gold-accent flex-shrink-0" />
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-starehe-blue-950">
              Statutory Custodians of the Starehe Vision
            </h2>
          </div>
          <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
            The Starehe Girls&apos; Centre Trust functions as an independent, perpetual charitable
            institution. The Trustees are eminent Kenyans from industry, education, the judiciary,
            and public service who serve pro bono, guaranteeing that all donations, grants, and
            institutional lands remain dedicated in perpetuity to educating disadvantaged Kenyan girls.
          </p>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t border-slate-100">
            <div className="flex items-start space-x-3">
              <FileCheck2 className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-starehe-blue-950">
                  Perpetual Succession
                </h4>
                <p className="text-xs text-slate-600 mt-1">
                  Assets and endowments are shielded from commercial encumbrance under Cap 164.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <HeartHandshake className="w-5 h-5 text-starehe-blue-900 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-starehe-blue-950">
                  Donor Accountability
                </h4>
                <p className="text-xs text-slate-600 mt-1">
                  100% of designated scholarship endowments directly fund girl-child tuition, boarding, and healthcare.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Trustees Grid */}
        <section>
          <div className="mb-6">
            <SectionHeading
              badge="Institutional Custodians"
              title="Distinguished Trustees"
              description="Eminent leaders safeguarding governance, fiscal integrity, and strategic growth for Starehe Girls' Centre."
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {TRUSTEES.map((trustee) => (
              <LeaderCard key={trustee.name} leader={trustee} />
            ))}
          </div>
        </section>

        {/* Governance Commitment */}
        <section className="bg-gradient-to-br from-starehe-blue-950 to-starehe-blue-900 text-white rounded-2xl p-6 sm:p-8 shadow-md">
          <div className="flex items-start space-x-4">
            <div className="p-3 rounded-xl bg-white/10 text-starehe-gold-300 flex-shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-white">
                Fiduciary Responsibility to the Nation
              </h3>
              <p className="text-xs sm:text-sm text-slate-200 mt-2 leading-relaxed">
                The Board of Trustees meets regularly to review financial audits, capital developments,
                endowment performance, and scholarship allocations across all 47 Kenyan counties.
                Annual audited financial accounts are filed in compliance with Kenyan regulatory requirements.
              </p>
              <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-starehe-gold-300">
                <span>Secretariat: Bustani Estate, Kasarani, Nairobi</span>
                <a
                  href="mailto:info@starehegirlscentre.co.ke"
                  className="inline-flex items-center space-x-1 underline hover:text-white font-medium"
                >
                  <span>Enquire with Board Secretary</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </EditorialPageLayout>
  );
}
