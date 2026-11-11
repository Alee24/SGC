import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { EditorialPageLayout } from "@/components/layout/EditorialPageLayout";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  GraduationCap,
  Users,
  Shield,
  CheckCircle2,
  Mail,
  Phone,
  Building,
  ArrowRight,
  Award,
} from "lucide-react";

export const metadata: Metadata = {
  title: "School Administration & Principal | Leadership Team",
  description:
    "Official messages from School Director Sister Jane Soita and Principal Beatrice Shirao, detailing academic strategies, staff breakdown (48 teachers, 46 support personnel), and student welfare.",
};

const ABOUT_SIDEBAR_LINKS = [
  { label: "Overview & Mission", href: "/about" },
  { label: "History & Heritage", href: "/about/history" },
  { label: "Board of Trustees", href: "/about/trustees" },
  { label: "Board of Management (BOM)", href: "/about/management" },
  { label: "Administration & Leadership", href: "/about/administration", active: true },
  { label: "Principal's Desk", href: "/about/principal" },
];

export default function AdministrationPage() {
  return (
    <EditorialPageLayout
      breadcrumbs={[
        { label: "About Us", href: "/about" },
        { label: "Administration & Principal" },
      ]}
      kicker="Executive Administration"
      title="School Leadership & Administration"
      description="Guided by Director Sister Jane Soita and Principal Beatrice Shirao, our dedicated faculty of 48 educators and 46 support personnel nurtures over 800 young women with love, discipline, and uncompromising academic rigor."
      heroFacts={[
        { label: "School Director", value: "Sister Jane Soita" },
        { label: "School Principal", value: "Beatrice Shirao" },
        { label: "Teaching Faculty", value: "48 Specialized Teachers" },
        { label: "Support Personnel", value: "46 Welfare & Lab Staff" },
      ]}
      sidebarTitle="About Starehe"
      sidebarLinks={ABOUT_SIDEBAR_LINKS}
    >
      <div className="space-y-12">
        {/* 1. Director's Desk Section */}
        <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-subtle">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-4">
              <div className="relative rounded-2xl overflow-hidden shadow-md border-2 border-slate-100 aspect-[4/5]">
                <Image
                  src="/images/leadership/director-sister-jane-soita-office.jpg"
                  alt="Director Sister Jane Soita at her desk"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 30vw"
                />
              </div>
              <div className="mt-4 text-center">
                <h3 className="font-serif text-lg font-bold text-starehe-blue-950">
                  Sister Jane Soita
                </h3>
                <p className="text-[11px] text-starehe-maroon-800 font-bold uppercase tracking-wider">
                  Director, Starehe Girls&apos; Centre
                </p>
                <div className="mt-3 flex flex-col items-center space-y-1 text-xs text-slate-600">
                  <a
                    href="mailto:info@starehegirlscentre.co.ke"
                    className="inline-flex items-center space-x-1 hover:text-starehe-blue-900"
                  >
                    <Mail className="w-3.5 h-3.5 text-starehe-maroon-700" />
                    <span>info@starehegirlscentre.co.ke</span>
                  </a>
                  <a
                    href="tel:0707900852"
                    className="inline-flex items-center space-x-1 hover:text-starehe-blue-900"
                  >
                    <Phone className="w-3.5 h-3.5 text-starehe-blue-900" />
                    <span>0707 900 852</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="md:col-span-8">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold bg-starehe-blue-50 text-starehe-blue-900 border border-starehe-blue-200 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-starehe-blue-800" />
                <span>Message from the Director</span>
              </div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-starehe-blue-950 leading-snug">
                Two Decades of God&apos;s Grace, Growth, and Girl-Child Transformation
              </h2>

              <div className="mt-4 space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <p>
                  Welcome to Starehe Girls&apos; Centre. The Centre was established as a charitable
                  national girls high school for bright but financially and socially disadvantaged
                  students via the collective efforts of individuals who envisioned an institution
                  with a holistic educational approach.
                </p>
                <p>
                  When Starehe Girls&apos; Centre received seventy-two (72) girls from every county in
                  Kenya in January 2005, it had three little old dormitories inherited from Limuru
                  Girls&apos; Centre. Each dormitory held 24 girls. There were only two classrooms that
                  accommodated 36 students each, and two more that lacked equipment were improvised
                  into laboratories.
                </p>
                <p>
                  Today, our community has grown to over <strong>800 students</strong>. 70% are
                  sponsored students on full charitable scholarships, while 30% are self-supported.
                  Our motto, <em>Elimu Yetu, Nguvu Yetu</em> (Our Education, Our Strength),
                  reflects our unwavering dedication to academic achievement. Over the last eighteen years
                  of KCSE examinations, an average of <strong>95 percent of graduates have been admitted
                  to universities</strong> in Kenya and overseas.
                </p>
                <div className="p-4 rounded-xl bg-starehe-gold-50 border-l-4 border-starehe-gold-accent text-starehe-blue-950 italic text-xs leading-relaxed">
                  &ldquo;Each year, our Trustees organize key fundraising traditions: the Annual Charity Golf
                  in Term 1, the Annual Charity Walk in Term 2, and the Annual Gala Dinner in Term 3. We
                  respectfully request everyone of goodwill to partner with us in educating the African girl child.&rdquo;
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Principal's Desk Section */}
        <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-subtle">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-8 order-2 md:order-1">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold bg-starehe-maroon-50 text-starehe-maroon-900 border border-starehe-maroon-200 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-starehe-maroon-800" />
                <span>Message from the Principal</span>
              </div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-starehe-blue-950 leading-snug">
                Academic Rigour, &ldquo;Operation Plus 5&rdquo; and CBC Transition
              </h2>

              <div className="mt-4 space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <p>
                  <strong>Dear Future Students, Parents, and Valued Educational Partners,</strong>
                </p>
                <p>
                  I extend a warm welcome to Starehe Girls&apos; Centre, a beacon of academic excellence,
                  leadership, and holistic development. For the last three years, our candidates have
                  registered positive deviations in the Kenya Certificate of Secondary Education (KCSE).
                  In 2025, the school recorded a mean score of <strong>8.90 (B)</strong> with a positive
                  deviation of +0.07, building on the <strong>8.83 (B)</strong> attained in 2024 (+0.34 dev).
                </p>
                <p>
                  This sustained excellence is driven by our signature academic slogan:{" "}
                  <strong>&ldquo;Operation Plus 5&rdquo;</strong>. Every student targets to add at least
                  5 marks per subject from the previous examination. For every exam done, we major in awarding
                  the <em>Most Improved Students</em>, ensuring that every single girl has the dignity and
                  agency to be celebrated.
                </p>
                <p>
                  As Kenya rolls out the Competency-Based Curriculum (CBC), Starehe Girls&apos; Centre is
                  proud to lead the transition into Senior School Grade 10 across three rich pathways:{" "}
                  <strong>STEM</strong>, <strong>Social Sciences</strong>, and <strong>Arts &amp; Sports Science</strong>.
                </p>
                <p className="font-serif font-bold text-starehe-blue-950 text-base">
                  &ldquo;At Starehe, we don&apos;t just educate girls—we ignite legacies.&rdquo;
                </p>
                <p className="text-xs text-slate-500 font-semibold">
                  — Beatrice Shirao, Principal
                </p>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/about/principal"
                  className="px-5 py-2.5 rounded-full bg-starehe-blue-900 hover:bg-starehe-blue-800 text-white font-bold text-xs uppercase tracking-wider transition-colors inline-flex items-center space-x-1.5"
                >
                  <span>Full Principal&apos;s Message</span>
                  <ArrowRight className="w-3.5 h-3.5 text-starehe-gold-accent" />
                </Link>
                <Link
                  href="/academics/performance"
                  className="px-5 py-2.5 rounded-full bg-starehe-maroon-800 hover:bg-starehe-maroon-700 text-white font-bold text-xs uppercase tracking-wider transition-colors inline-flex items-center space-x-1.5"
                >
                  <span>View KCSE Breakdown</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/admissions"
                  className="px-5 py-2.5 rounded-full border border-starehe-blue-900 text-starehe-blue-950 font-bold text-xs uppercase tracking-wider hover:bg-starehe-blue-50 transition-colors"
                >
                  Admissions Criteria
                </Link>
              </div>
            </div>

            <div className="md:col-span-4 order-1 md:order-2">
              <div className="relative rounded-2xl overflow-hidden shadow-md border-2 border-slate-100 aspect-[4/5]">
                <Image
                  src="/images/facilities/facilities-admin-block.jpg"
                  alt="Principal's Office Wing at Starehe Girls"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 30vw"
                />
              </div>
              <div className="mt-4 text-center">
                <h3 className="font-serif text-lg font-bold text-starehe-blue-950">
                  Beatrice Shirao
                </h3>
                <p className="text-[11px] text-starehe-maroon-800 font-bold uppercase tracking-wider">
                  Principal &amp; Chief Academic Officer
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Community Composition & Staff Statistics */}
        <section className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200">
          <div className="mb-6">
            <h3 className="font-serif text-xl font-bold text-starehe-blue-950">
              Community Composition &amp; Staff Distribution
            </h3>
            <p className="text-xs text-slate-600 mt-1">
              Close mentorship ratios ensuring pastoral care, academic rigor, and campus safety.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-white border border-slate-200/80 text-center shadow-subtle">
              <div className="w-10 h-10 rounded-lg bg-starehe-blue-100 text-starehe-blue-900 mx-auto flex items-center justify-center mb-2">
                <Shield className="w-5 h-5" />
              </div>
              <div className="font-serif text-2xl font-black text-starehe-blue-950">
                1 Dir + 2 Dep
              </div>
              <div className="text-[11px] font-bold text-slate-700 mt-1">Executive Officers</div>
              <p className="text-[10px] text-slate-500 mt-1">Governance &amp; welfare</p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200/80 text-center shadow-subtle">
              <div className="w-10 h-10 rounded-lg bg-starehe-maroon-100 text-starehe-maroon-800 mx-auto flex items-center justify-center mb-2">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div className="font-serif text-2xl font-black text-starehe-maroon-800">
                48 Teachers
              </div>
              <div className="text-[11px] font-bold text-slate-700 mt-1">Faculty Masters</div>
              <p className="text-[10px] text-slate-500 mt-1">8-4-4 &amp; CBC Senior School</p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200/80 text-center shadow-subtle">
              <div className="w-10 h-10 rounded-lg bg-starehe-gold-100 text-starehe-gold-800 mx-auto flex items-center justify-center mb-2">
                <Users className="w-5 h-5" />
              </div>
              <div className="font-serif text-2xl font-black text-starehe-gold-600">
                46 Support
              </div>
              <div className="text-[11px] font-bold text-slate-700 mt-1">Non-Teaching Staff</div>
              <p className="text-[10px] text-slate-500 mt-1">Nurses, lab techs &amp; chefs</p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200/80 text-center shadow-subtle">
              <div className="w-10 h-10 rounded-lg bg-starehe-maroon-50 text-starehe-maroon-800 mx-auto flex items-center justify-center mb-2">
                <Building className="w-5 h-5" />
              </div>
              <div className="font-serif text-2xl font-black text-starehe-maroon-900">
                800 Girls
              </div>
              <div className="text-[11px] font-bold text-slate-700 mt-1">Total Enrolled</div>
              <p className="text-[10px] text-slate-500 mt-1">70% full scholarship</p>
            </div>
          </div>
        </section>
      </div>
    </EditorialPageLayout>
  );
}
