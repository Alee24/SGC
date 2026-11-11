import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { EditorialPageLayout, SidebarLink, FactItem } from "@/components/layout/EditorialPageLayout";
import { SCHOOL_INFO, KEY_STATS } from "@/data/school-data";
import {
  Compass,
  Target,
  Award,
  ShieldCheck,
  CheckCircle2,
  Users,
  Heart,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Starehe Girls' Centre | Mission, Vision & Ethos",
  description:
    "Learn about Starehe Girls' Centre, established as a charitable national girls high school providing holistic education and leadership development for bright, economically disadvantaged girls.",
};

export default function AboutOverviewPage() {
  const sidebarLinks: SidebarLink[] = [
    { label: "About the Centre", href: "/about", active: true },
    { label: "Story & Heritage", href: "/about/history" },
    { label: "Board of Trustees", href: "/about/trustees" },
    { label: "Board of Management", href: "/about/management" },
    { label: "Administration & Principal", href: "/about/administration" },
  ];

  const heroFacts: FactItem[] = [
    { label: "Established", value: "2005" },
    { label: "Enrolled", value: "800 Scholars" },
    { label: "Full Scholarships", value: "70% Quota" },
    { label: "Campus Setting", value: "55 Acres (Njathaini)" },
  ];

  return (
    <EditorialPageLayout
      breadcrumbs={[
        { label: "About Us", href: "/about" },
        { label: "Overview" },
      ]}
      kicker="Institutional Identity • The Starehe Way"
      title="A Charitable National Sanctuary for Bright Young Women"
      description="Starehe Girls' Centre was established to provide holistic care, uncompromising academic discipline, and leadership cultivation to gifted girls from vulnerable economic backgrounds throughout the 47 counties of Kenya."
      heroFacts={heroFacts}
      sidebarTitle="About Starehe"
      sidebarLinks={sidebarLinks}
    >
      <div className="space-y-10 text-slate-700">
        {/* Triad of Identity Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Mission */}
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="w-10 h-10 rounded-xl bg-starehe-blue-100 text-starehe-blue-900 flex items-center justify-center mb-4">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-starehe-blue-950 mb-2">
              Our Mission
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              &ldquo;{SCHOOL_INFO.mission}&rdquo;
            </p>
          </div>

          {/* Vision */}
          <div className="p-6 rounded-2xl bg-starehe-blue-950 text-white">
            <div className="w-10 h-10 rounded-xl bg-starehe-gold-accent/20 text-starehe-gold-300 flex items-center justify-center mb-4">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-white mb-2">
              Our Vision
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              &ldquo;{SCHOOL_INFO.vision}&rdquo;
            </p>
          </div>

          {/* Motto */}
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="w-10 h-10 rounded-xl bg-starehe-maroon-100 text-starehe-maroon-800 flex items-center justify-center mb-4">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-starehe-blue-950 mb-1">
              School Motto
            </h3>
            <div className="font-serif text-sm font-bold text-starehe-maroon-800 italic">
              &ldquo;{SCHOOL_INFO.mottoSwahili}&rdquo;
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">
              ({SCHOOL_INFO.mottoEnglish})
            </div>
          </div>
        </div>

        {/* The Starehe Way Section */}
        <section className="space-y-4 pt-4 border-t border-slate-100">
          <h2 className="font-serif text-2xl font-bold text-starehe-blue-950 tracking-tight">
            The Doctrine of &ldquo;The Starehe Way&rdquo;
          </h2>

          <p className="text-sm sm:text-base leading-relaxed">
            The school advances the foundational doctrine established by the late
            Dr. Geoffrey William Griffin. &ldquo;The Starehe Way&rdquo; is a philosophy of
            uncompromising self-discipline, ethical character, integrity towards all people,
            and dedicated service to the nation with head, heart, and hand.
          </p>

          <p className="text-sm sm:text-base leading-relaxed">
            Rather than relying solely on coercive rules, Starehe cultivates inner
            conviction, personal responsibility, and a deep sense of mutual sisterhood.
            Students serve in student government roles, care for the 55-acre campus,
            and mentor younger peers through the traditional &ldquo;sister&rdquo; pairing system.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <h4 className="font-bold text-starehe-blue-950 text-xs mb-1">Head (Intellect)</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Academic rigor, critical analysis, scientific congress, and 95% university progression.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <h4 className="font-bold text-starehe-maroon-800 text-xs mb-1">Heart (Integrity)</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Compassion, ethical leadership, mutual sisterhood, and moral courage.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <h4 className="font-bold text-starehe-gold-700 text-xs mb-1">Hand (Service)</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Dignity of manual work, campus stewardship, Red Cross service, and civic duty.
              </p>
            </div>
          </div>
        </section>

        {/* Pan-Kenyan Quota */}
        <section className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
          <h3 className="font-serif text-base font-bold text-starehe-blue-950">
            National Diversity: All 47 Counties Represented
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Every cohort of 200 young women admitted to Starehe Girls&apos; Centre is drawn
            from every county across Kenya, creating an egalitarian community where ethnicity
            and economic origins dissolve into a shared family of excellence.
          </p>
        </section>

        {/* Footer Nav */}
        <div className="pt-6 border-t border-slate-200 flex flex-wrap gap-4 items-center justify-between">
          <Link
            href="/about/history"
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-starehe-blue-950 hover:bg-starehe-blue-900 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
          >
            <span>Read Archival Heritage</span>
            <ArrowRight className="w-4 h-4 text-starehe-gold-accent" />
          </Link>
          <Link
            href="/about/trustees"
            className="text-xs font-bold text-starehe-maroon-800 hover:underline"
          >
            Meet the Board of Trustees &rarr;
          </Link>
        </div>
      </div>
    </EditorialPageLayout>
  );
}
