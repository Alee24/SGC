import React from "react";
import { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LeaderCard } from "@/components/ui/LeaderCard";
import { TRUSTEES } from "@/data/school-data";
import { ShieldCheck, HeartHandshake } from "lucide-react";

export const metadata: Metadata = {
  title: "Board of Trustees | Starehe Girls' Centre Trust",
  description:
    "Meet the Board of Trustees of Starehe Girls' Centre, chaired by Mrs. Eunice Mathu and featuring founding patron Dr. Manu Chandaria, safeguarding institutional governance and charitable endowments.",
};

export default function TrusteesPage() {
  return (
    <div>
      <Breadcrumb
        items={[
          { label: "About Us", href: "/about" },
          { label: "Board of Trustees" },
        ]}
      />

      {/* Hero */}
      <section className="py-16 sm:py-20 bg-starehe-blue-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-starehe-gold-accent/20 text-starehe-gold-300 border border-starehe-gold-accent/30 mb-4">
              Governance &amp; Fiduciary Stewardship
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              The Board of Trustees
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-200 leading-relaxed font-light">
              Registered under the Trustees (Perpetual Succession) Act, Cap 164 of the Laws
              of Kenya, the Board of Trustees exercises overall governance, protects the
              school&apos;s 55-acre heritage, and oversees the permanent educational endowment.
            </p>
          </div>
        </div>
      </section>

      {/* Trustees Grid */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Institutional Custodians"
            title="Distinguished Leadership &amp; Board Members"
            description="Our trustees bring together eminent educators, captains of industry, financial specialists, and community champions dedicated to girl-child empowerment."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {TRUSTEES.map((trustee) => (
              <LeaderCard key={trustee.name} leader={trustee} />
            ))}
          </div>

          {/* Governance Notice */}
          <div className="mt-16 bg-white rounded-2xl p-8 border border-slate-200 shadow-subtle flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-start space-x-4">
              <div className="p-3 rounded-xl bg-starehe-blue-50 text-starehe-blue-900 mt-1">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-starehe-blue-950">
                  Trust Governance &amp; Perpetual Succession
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
                  The Starehe Girls&apos; Centre Trust functions as an independent, perpetual
                  charitable body. All endowments, donor sponsorships, and campus infrastructure
                  are held in trust for the public benefit of Kenya&apos;s girl child.
                </p>
              </div>
            </div>
            <a
              href="mailto:info@starehegirlscentre.co.ke"
              className="px-6 py-3 rounded-full bg-starehe-blue-900 hover:bg-starehe-blue-800 text-white font-bold text-xs uppercase tracking-wider transition-colors flex-shrink-0"
            >
              Contact Board Secretary
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
