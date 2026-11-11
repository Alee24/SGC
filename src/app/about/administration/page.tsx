import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  GraduationCap,
  Users,
  Shield,
  HeartHandshake,
  CheckCircle2,
  Mail,
  Phone,
  Building,
} from "lucide-react";

export const metadata: Metadata = {
  title: "School Administration & Principal | Leadership Team",
  description:
    "Official messages from School Director Sister Jane Soita and Principal Beatrice Shirao, detailing academic strategies, staff breakdown (48 teachers, 46 support personnel), and student welfare.",
};

export default function AdministrationPage() {
  return (
    <div>
      <Breadcrumb
        items={[
          { label: "About Us", href: "/about" },
          { label: "Administration & Principal" },
        ]}
      />

      {/* Hero */}
      <section className="py-16 sm:py-20 bg-starehe-blue-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-starehe-gold-accent/20 text-starehe-gold-300 border border-starehe-gold-accent/30 mb-4">
              Executive Administration
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              School Leadership &amp; Administration
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-200 leading-relaxed font-light">
              Guided by Director Sister Jane Soita and Principal Beatrice Shirao,
              our community of 48 educators and 46 support personnel nurtures over
              800 students with love, discipline, and uncompromising academic rigor.
            </p>
          </div>
        </div>
      </section>

      {/* 1. Director's Desk Section */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-elevation border-4 border-slate-100 aspect-[4/5]">
                <Image
                  src="/images/leadership/director-sister-jane-soita-office.jpg"
                  alt="Director Sister Jane Soita at her desk"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
              <div className="mt-4 text-center">
                <h3 className="font-serif text-xl font-bold text-starehe-blue-950">
                  Sister Jane Soita
                </h3>
                <p className="text-xs text-starehe-maroon-800 font-semibold uppercase tracking-wider">
                  Director, Starehe Girls&apos; Centre
                </p>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-starehe-blue-50 text-starehe-blue-900 border border-starehe-blue-200 mb-4">
                Message from the Director
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-starehe-blue-950 leading-tight">
                Two Decades of God&apos;s Grace, Growth, and Girl-Child Transformation
              </h2>

              <div className="mt-5 space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">
                <p>
                  Welcome to Starehe Girls&apos; Centre. The Centre was established as a
                  charitable national girls high school for bright but financially and
                  socially disadvantaged students via the collective efforts of individuals
                  who envisioned an institution with a holistic educational approach.
                </p>
                <p>
                  When Starehe Girls&apos; Centre received seventy-two (72) girls from every
                  county in Kenya in January 2005, it had three little old dormitories inherited
                  from Limuru Girls&apos; Centre. Each dormitory held 24 girls. There were only two
                  classrooms that accommodated 36 students each, and two more that lacked equipment
                  were improvised into laboratories.
                </p>
                <p>
                  Today, our community has grown to over <strong>800 students</strong>. 70% are
                  sponsored students on full charitable scholarships, while 30% are self-supported.
                  Our motto, <em>&ldquo;Elimu Yetu, Nguvu Yetu&rdquo;</em> (Our Education, Our Strength),
                  reflects our unwavering dedication to academic achievement. Over the last
                  eighteen years of KCSE examinations, an average of <strong>95 percent of graduates
                  have been admitted to universities</strong> in Kenya and overseas.
                </p>
                <p className="italic text-slate-600 border-l-2 border-starehe-gold-accent pl-4">
                  &ldquo;Each year, our Trustees organize key fundraising traditions: the Annual
                  Charity Golf in Term 1, the Annual Charity Walk in Term 2, and the Annual Gala
                  Dinner in Term 3. We respectfully request everyone of goodwill to partner with
                  us in educating the African girl child.&rdquo;
                </p>
              </div>

              <div className="mt-6 flex items-center space-x-6 text-xs text-slate-600">
                <div className="flex items-center space-x-1.5">
                  <Mail className="w-4 h-4 text-starehe-maroon-700" />
                  <a href="mailto:info@starehegirlscentre.co.ke" className="hover:underline">
                    info@starehegirlscentre.co.ke
                  </a>
                </div>
                <div className="flex items-center space-x-1.5">
                  <Phone className="w-4 h-4 text-starehe-blue-900" />
                  <a href="tel:0707900852" className="hover:underline">0707 900 852</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Principal's Desk Section */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 order-2 lg:order-1">
              <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-starehe-maroon-50 text-starehe-maroon-800 border border-starehe-maroon-200 mb-4">
                Message from the Principal
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-starehe-blue-950 leading-tight">
                Academic Rigour, &ldquo;Operation Plus 5&rdquo; and CBC Transition
              </h2>

              <div className="mt-5 space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">
                <p>
                  <strong>Dear Future Students, Parents, and Valued Educational Partners,</strong>
                </p>
                <p>
                  I extend a warm welcome to Starehe Girls&apos; Centre, a beacon of academic
                  excellence, leadership, and holistic development. For the last three years,
                  our candidates have registered positive deviations in the Kenya Certificate of
                  Secondary Education (KCSE). In 2025, the school recorded a mean score of{" "}
                  <strong>8.90 (B)</strong> with a positive deviation of +0.07, building on the{" "}
                  <strong>8.83 (B)</strong> attained in 2024 (+0.34 dev).
                </p>
                <p>
                  This sustained excellence is driven by our signature academic slogan:{" "}
                  <strong>&ldquo;Operation Plus 5&rdquo;</strong>. Every student targets to add
                  at least 5 marks per subject from the previous examination. For every exam done,
                  we major in awarding the <em>Most Improved Students</em>, ensuring that every
                  single girl has the dignity and agency to be celebrated.
                </p>
                <p>
                  As Kenya rolls out the Competency-Based Curriculum (CBC), Starehe Girls&apos;
                  Centre is proud to lead the transition into Senior School Grade 10 across
                  three rich pathways: <strong>STEM</strong>, <strong>Social Sciences</strong>,
                  and <strong>Arts &amp; Sports Science</strong>. We also welcome 30% of self-supported
                  parents to join our family beginning in 2027.
                </p>
                <p className="font-serif font-bold text-starehe-blue-950">
                  &ldquo;At Starehe, we don&apos;t just educate girls—we ignite legacies.&rdquo;
                </p>
                <p className="text-xs text-slate-500 font-semibold">
                  — Beatrice Shirao, Principal
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/academics/performance"
                  className="px-6 py-3 rounded-full bg-starehe-maroon-800 hover:bg-starehe-maroon-700 text-white font-semibold text-xs uppercase tracking-wider transition-colors shadow-sm"
                >
                  View KCSE Results Breakdown
                </Link>
                <Link
                  href="/admissions"
                  className="px-6 py-3 rounded-full border border-starehe-blue-900 text-starehe-blue-950 font-semibold text-xs uppercase tracking-wider hover:bg-starehe-blue-50 transition-colors"
                >
                  Admissions Criteria
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 order-1 lg:order-2">
              <div className="relative rounded-2xl overflow-hidden shadow-elevation border-4 border-white aspect-[4/5]">
                <Image
                  src="/images/facilities/facilities-admin-block.jpg"
                  alt="Principal's Office Wing at Starehe Girls"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
              <div className="mt-4 text-center">
                <h3 className="font-serif text-xl font-bold text-starehe-blue-950">
                  Beatrice Shirao
                </h3>
                <p className="text-xs text-starehe-maroon-800 font-semibold uppercase tracking-wider">
                  Principal &amp; Chief Academic Officer
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Community Composition & Staff Statistics */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Institutional Structure"
            title="The Starehe Girls' Community Composition"
            description="Our administrative structure guarantees close personal attention, safety, and mentorship for every enrolled young woman."
          />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center">
              <div className="w-12 h-12 rounded-xl bg-starehe-blue-100 text-starehe-blue-900 mx-auto flex items-center justify-center mb-3">
                <Shield className="w-6 h-6" />
              </div>
              <div className="font-serif text-3xl font-extrabold text-starehe-blue-950">
                1 Director &amp; 2 Deputies
              </div>
              <div className="text-xs font-bold text-slate-700 mt-2">Executive Leadership</div>
              <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                Overseeing school governance, donor relations, and student welfare.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center">
              <div className="w-12 h-12 rounded-xl bg-starehe-maroon-100 text-starehe-maroon-800 mx-auto flex items-center justify-center mb-3">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div className="font-serif text-3xl font-extrabold text-starehe-maroon-800">
                48 Teachers
              </div>
              <div className="text-xs font-bold text-slate-700 mt-2">Teaching Faculty</div>
              <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                Specialised subject masters mentoring students in both 8-4-4 and CBE pathways.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center">
              <div className="w-12 h-12 rounded-xl bg-starehe-gold-100 text-starehe-gold-800 mx-auto flex items-center justify-center mb-3">
                <Users className="w-6 h-6" />
              </div>
              <div className="font-serif text-3xl font-extrabold text-starehe-gold-600">
                46 Support Staff
              </div>
              <div className="text-xs font-bold text-slate-700 mt-2">Non-Teaching Personnel</div>
              <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                Nurses, cateresses, laboratory technicians, ICT personnel, and security stewards.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 mx-auto flex items-center justify-center mb-3">
                <Building className="w-6 h-6" />
              </div>
              <div className="font-serif text-3xl font-extrabold text-emerald-700">
                800 Students
              </div>
              <div className="text-xs font-bold text-slate-700 mt-2">Total Student Body</div>
              <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                70% fully sponsored girls + 30% self-supported day/boarding scholars.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
