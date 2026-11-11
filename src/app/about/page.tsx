import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
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
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SCHOOL_INFO, KEY_STATS } from "@/data/school-data";

export const metadata: Metadata = {
  title: "About the School | Mission, Vision & Ethos",
  description:
    "Learn about Starehe Girls' Centre, established as a charitable national girls high school providing holistic education and leadership development for bright, economically disadvantaged girls.",
};

export default function AboutOverviewPage() {
  return (
    <div>
      <Breadcrumb items={[{ label: "About Us", href: "/about" }, { label: "Overview" }]} />

      {/* Hero Banner */}
      <section className="relative py-20 bg-starehe-blue-950 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/facilities/facilities-aerial-campus.jpg"
            alt="Starehe Girls' Centre 55-Acre Sanctuary"
            fill
            priority
            className="object-cover opacity-25 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-starehe-blue-950 via-starehe-blue-950/90 to-starehe-blue-900/70" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-starehe-gold-accent/20 text-starehe-gold-300 border border-starehe-gold-accent/30 mb-4">
              Institutional Overview
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              A Charitable National Sanctuary for Bright Young Women
            </h1>
            <p className="mt-5 text-base sm:text-lg text-slate-200 leading-relaxed font-light">
              Starehe Girls&apos; Centre was established to provide holistic care,
              uncompromising academic discipline, and leadership cultivation to
              gifted girls from vulnerable economic backgrounds throughout the 47 counties of Kenya.
            </p>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Motto Triad */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Mission */}
            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200 shadow-subtle hover:border-starehe-blue-300 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-starehe-blue-100 text-starehe-blue-900 flex items-center justify-center mb-5">
                <Compass className="w-6 h-6" />
              </div>
              <h2 className="font-serif text-2xl font-bold text-starehe-blue-950 mb-3">
                Our Mission
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                &ldquo;{SCHOOL_INFO.mission}&rdquo;
              </p>
            </div>

            {/* Vision */}
            <div className="bg-starehe-blue-950 text-white rounded-2xl p-8 shadow-elevation relative overflow-hidden">
              <div className="w-12 h-12 rounded-xl bg-starehe-gold-accent/20 text-starehe-gold-300 flex items-center justify-center mb-5">
                <Target className="w-6 h-6" />
              </div>
              <h2 className="font-serif text-2xl font-bold text-white mb-3">
                Our Vision
              </h2>
              <p className="text-sm text-slate-200 leading-relaxed">
                &ldquo;{SCHOOL_INFO.vision}&rdquo;
              </p>
            </div>

            {/* Motto */}
            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200 shadow-subtle hover:border-starehe-maroon-300 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-starehe-maroon-100 text-starehe-maroon-800 flex items-center justify-center mb-5">
                <Award className="w-6 h-6" />
              </div>
              <h2 className="font-serif text-2xl font-bold text-starehe-blue-950 mb-3">
                Our Motto
              </h2>
              <div className="font-serif text-lg font-bold text-starehe-maroon-800 italic">
                &ldquo;{SCHOOL_INFO.mottoSwahili}&rdquo;
              </div>
              <p className="text-xs text-slate-500 font-medium mt-1">
                ({SCHOOL_INFO.mottoEnglish})
              </p>
              <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                Affirming that quality secondary education is the greatest lever to
                uplift families and transform communities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Starehe Way Doctrine */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6">
              <span className="text-xs uppercase font-bold tracking-wider text-starehe-maroon-800 bg-starehe-maroon-50 px-3 py-1 rounded-full border border-starehe-maroon-200">
                Ethos &amp; Philosophy
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-starehe-blue-950 mt-4 leading-tight">
                The Doctrine of &ldquo;The Starehe Way&rdquo;
              </h2>
              <p className="mt-5 text-slate-700 leading-relaxed">
                The school advances the foundational doctrine established by the late
                Dr. Geoffrey William Griffin. &ldquo;The Starehe Way&rdquo; is a philosophy of
                uncompromising self-discipline, ethical character, integrity towards all people,
                and dedicated service to the nation.
              </p>
              <p className="mt-3 text-slate-600 leading-relaxed text-sm">
                Rather than relying solely on coercive rules, Starehe cultivates inner
                conviction, personal responsibility, and a deep sense of mutual sisterhood.
                Students serve in student government roles, care for the 55-acre campus,
                and mentor younger peers through the traditional &ldquo;sister&rdquo; pairing system.
              </p>

              <div className="mt-6 space-y-3">
                <div className="flex items-start space-x-3">
                  <ShieldCheck className="w-5 h-5 text-starehe-blue-900 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Head, Heart, and Hand</h3>
                    <p className="text-xs text-slate-600">
                      Developing intellectual acuity (Head), moral compassion and integrity (Heart),
                      and practical skills with hard physical work (Hand).
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <ShieldCheck className="w-5 h-5 text-starehe-blue-900 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">70% Charitable Quota</h3>
                    <p className="text-xs text-slate-600">
                      Three-quarters of all students receive comprehensive sponsorships covering tuition,
                      boarding, medical care, and learning materials.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <ShieldCheck className="w-5 h-5 text-starehe-blue-900 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Pan-Kenyan Representation</h3>
                    <p className="text-xs text-slate-600">
                      Students are selected from every single county in the Republic of Kenya,
                      creating a rich, harmonious, and united national family.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex items-center space-x-4">
                <Link
                  href="/about/history"
                  className="px-6 py-3 rounded-full bg-starehe-blue-900 hover:bg-starehe-blue-800 text-white font-semibold text-xs uppercase tracking-wider transition-colors shadow-sm"
                >
                  Read Our Archival History
                </Link>
                <Link
                  href="/about/trustees"
                  className="text-xs font-bold text-starehe-maroon-800 hover:underline"
                >
                  Meet the Trustees &rarr;
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-elevation border-4 border-white aspect-[4/3]">
                <Image
                  src="/images/facilities/facilities-admin-block.jpg"
                  alt="Starehe Girls' Centre Main Administration Building"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Facts Summary */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Institutional Data"
            title="Starehe Girls' Centre at a Glance"
            description="Verified facts and statistics reflecting our 20-year commitment to secondary education in Kenya."
          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-100 text-center">
              <div className="font-serif text-3xl font-extrabold text-starehe-blue-950">
                2005
              </div>
              <div className="text-xs font-bold text-slate-700 mt-1">Founding Intake</div>
              <div className="text-[11px] text-slate-500 mt-0.5">72 pioneer students</div>
            </div>
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-100 text-center">
              <div className="font-serif text-3xl font-extrabold text-starehe-maroon-800">
                800
              </div>
              <div className="text-xs font-bold text-slate-700 mt-1">Current Enrollment</div>
              <div className="text-[11px] text-slate-500 mt-0.5">Across Form 1 to Form 4</div>
            </div>
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-100 text-center">
              <div className="font-serif text-3xl font-extrabold text-starehe-gold-600">
                94 Staff
              </div>
              <div className="text-xs font-bold text-slate-700 mt-1">Faculty &amp; Support</div>
              <div className="text-[11px] text-slate-500 mt-0.5">48 teachers, 46 non-teaching</div>
            </div>
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-100 text-center">
              <div className="font-serif text-3xl font-extrabold text-starehe-blue-900">
                95%
              </div>
              <div className="text-xs font-bold text-slate-700 mt-1">University Entry</div>
              <div className="text-[11px] text-slate-500 mt-0.5">18-year average</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
