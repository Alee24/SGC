import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { EditorialPageLayout, SidebarLink, FactItem } from "@/components/layout/EditorialPageLayout";
import {
  TrendingUp,
  Award,
  BookOpen,
  Compass,
  Mail,
  Phone,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Target,
  GraduationCap,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Principal's Desk | Welcome Message by Beatrice Shirao",
  description:
    "Official welcome address by Starehe Girls' Centre Principal Beatrice Shirao on academic performance, Operation Plus 5, university transitions, and CBC Senior School preparations.",
};

const ABOUT_SIDEBAR_LINKS: SidebarLink[] = [
  { label: "Overview & Mission", href: "/about" },
  { label: "Story & Heritage", href: "/about/history" },
  { label: "Board of Trustees", href: "/about/trustees" },
  { label: "Board of Management", href: "/about/management" },
  { label: "Administration & Leadership", href: "/about/administration" },
  { label: "Principal's Desk", href: "/about/principal", active: true },
];

const HERO_FACTS: FactItem[] = [
  { label: "Principal", value: "Mrs. Beatrice Shirao" },
  { label: "2025 KCSE Mean", value: "8.90 (B) [+0.07]" },
  { label: "Univ. Transition", value: "93% C+ & Above" },
  { label: "2026 Target", value: "9.50 Mean (100%)" },
];

export default function PrincipalPage() {
  return (
    <EditorialPageLayout
      breadcrumbs={[
        { label: "About Us", href: "/about" },
        { label: "Principal's Desk" },
      ]}
      kicker="Academic Leadership • Message from the Principal"
      title="At Starehe, We Don't Just Educate Girls — We Ignite Legacies"
      description="A warm welcome from Principal Beatrice Shirao, outlining our continuous positive KCSE academic trajectory, 'Operation Plus 5' momentum, CBC Senior School readiness, and nurturing learning sanctuary."
      heroFacts={HERO_FACTS}
      sidebarTitle="About Starehe"
      sidebarLinks={ABOUT_SIDEBAR_LINKS}
    >
      <div className="space-y-12">
        {/* Principal Portrait & Address Header */}
        <section className="bg-white rounded-2xl p-6 sm:p-10 border border-stone-200/90 shadow-subtle">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-4">
              <div className="relative rounded-2xl overflow-hidden shadow-md border-2 border-stone-100 aspect-[4/5] bg-stone-100">
                <Image
                  src="/images/facilities/facilities-admin-block.jpg"
                  alt="Principal's Office & Administration Block at Starehe Girls' Centre"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 30vw"
                  priority
                />
              </div>
              <div className="mt-4 text-center">
                <h3 className="font-serif text-lg font-bold text-starehe-blue-950">
                  Mrs. Beatrice Shirao
                </h3>
                <p className="text-[11px] text-starehe-maroon-800 font-bold uppercase tracking-wider">
                  Principal, Starehe Girls&apos; Centre
                </p>
                <div className="mt-3 flex flex-col items-center space-y-1 text-xs text-stone-600">
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

            <div className="md:col-span-8 space-y-5">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold bg-starehe-maroon-50 text-starehe-maroon-900 border border-starehe-maroon-200">
                <span>Official Address to Candidates, Parents & Partners</span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-starehe-blue-950 leading-tight">
                Welcome Message from the Principal
              </h2>

              <div className="text-stone-700 space-y-4 text-sm sm:text-base leading-relaxed">
                <p className="font-semibold text-starehe-blue-900">
                  Dear Future Students, Parents, and Valued Educational Partners,
                </p>
                <p>
                  I extend a warm welcome to Starehe Girls Centre, a beacon of academic excellence,
                  leadership, and holistic development, with a sense of immense pride and pleasure.
                  I am pleased to provide updates that demonstrate our unwavering dedication to the
                  development of resilient, innovative, and compassionate young women as we celebrate
                  our accomplishments and seize new opportunities.
                </p>
              </div>

              {/* Highlight Quote */}
              <div className="p-5 rounded-xl bg-starehe-blue-50/70 border-l-4 border-starehe-blue-900 text-starehe-blue-950 text-sm italic font-serif leading-relaxed">
                &ldquo;As Principal, I find myself continually motivated by the determination and intelligence of our students. Alongside our committed team and stakeholders, we continue to uphold our mission to provide care and education for girls in need and inspire them to transform into productive and exemplary members of society.&rdquo;
              </div>
            </div>
          </div>
        </section>

        {/* KCSE Performance & Operation Plus 5 */}
        <section className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200/90 shadow-subtle space-y-6">
          <div className="flex items-center space-x-3 text-starehe-maroon-800">
            <TrendingUp className="w-6 h-6" />
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-starehe-blue-950">
              KCSE Performance &amp; &ldquo;Operation Plus 5&rdquo;
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-5 rounded-xl bg-stone-50 border border-stone-200">
              <div className="text-xs font-bold text-starehe-maroon-800 uppercase tracking-wider mb-1">
                2025 KCSE Results
              </div>
              <div className="font-serif text-3xl font-bold text-starehe-blue-950">
                8.90 <span className="text-lg font-sans text-stone-500">(B)</span>
              </div>
              <p className="text-xs text-emerald-700 font-bold mt-1">
                +0.07 Positive Deviation
              </p>
              <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                Out of 187 candidates, 93% scored C+ and above. Only 7% scored C plain and below.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-stone-50 border border-stone-200">
              <div className="text-xs font-bold text-starehe-blue-900 uppercase tracking-wider mb-1">
                2024 KCSE Results
              </div>
              <div className="font-serif text-3xl font-bold text-starehe-blue-950">
                8.83 <span className="text-lg font-sans text-stone-500">(B)</span>
              </div>
              <p className="text-xs text-emerald-700 font-bold mt-1">
                +0.34 Positive Deviation
              </p>
              <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                Sustained consecutive annual gains across all examined academic departments.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-starehe-blue-900 text-white border border-starehe-blue-950">
              <div className="text-xs font-bold text-starehe-gold-accent uppercase tracking-wider mb-1">
                2026 Target
              </div>
              <div className="font-serif text-3xl font-bold text-starehe-gold-accent">
                9.50 <span className="text-lg font-sans text-stone-300">(B+)</span>
              </div>
              <p className="text-xs text-stone-200 font-medium mt-1">
                100% University Transition
              </p>
              <p className="text-xs text-stone-300 mt-2 leading-relaxed">
                Institutional target with every candidate and faculty member focused on excellence.
              </p>
            </div>
          </div>

          <div className="text-stone-700 space-y-4 text-sm sm:text-base leading-relaxed pt-2">
            <h4 className="font-bold text-starehe-blue-900 text-base">
              The &ldquo;Operation Plus 5&rdquo; Slogan
            </h4>
            <p>
              This positive deviation is attributed to different strategies that motivate both the teachers and the students to work hard. One of the principal strategies is <strong>&ldquo;Operation Plus 5&rdquo;</strong>.
            </p>
            <p>
              This is a self-evaluation slogan in which every student targets to add at least 5 marks for every subject from the last exam done. This targets that the student moves at least to the next grade band. For every exam done, the school majors on awarding the most improved so that every student has an equal and inspiring chance of being recognized and celebrated.
            </p>
            <p>
              Our students receive individualized, rigorous academic mentoring facilitated by renowned educators, complemented by comprehensive psychosocial counselling to guarantee success not only in examinations but as future change-makers.
            </p>
          </div>
        </section>

        {/* CBC Transition Section */}
        <section className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200/90 shadow-subtle space-y-4">
          <div className="flex items-center space-x-3 text-starehe-blue-900">
            <BookOpen className="w-6 h-6 text-starehe-gold-accent" />
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-starehe-blue-950">
              Seamless CBC Transition Preparations
            </h3>
          </div>
          <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
            As Kenya advances with the Competency-Based Curriculum (CBC), Starehe Girls Centre leads the way in this transformative journey. Currently the School is making significant investments in teacher training, upgrading our infrastructure, and introducing innovative learning tools to align with CBC&apos;s focus on creativity, critical thinking, and problem-solving.
          </p>
          <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
            We aim to provide students with the necessary skills to thrive in a rapidly changing world, all while upholding our fundamental principles of discipline and integrity towards all people, through dedicated service to our nation, with head, heart, and hand committed to justice, zeal, and care.
          </p>
        </section>

        {/* Join Our Family in 2027: A Sanctuary for Learning */}
        <section className="bg-stone-50 rounded-2xl p-6 sm:p-8 border border-stone-200 space-y-4">
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-starehe-blue-950">
            Join Our Family in 2027: A Sanctuary for Learning
          </h3>
          <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
            To potential parents looking for a quality education for their girls, we encourage you to enroll at Starehe Girls Centre beginning in 2027. Our campus, nestled in a tranquil, secure location off Kiambu Road, offers the ideal setting for intellectual advancement, artistic expression, and spiritual development. Students thrive here, surrounded by abundant nature, cutting-edge facilities, and a loving community that believes in each girl&apos;s boundless potential.
          </p>
          <div className="p-4 rounded-xl bg-white border border-stone-200 text-xs sm:text-sm text-stone-700 space-y-1">
            <span className="font-bold text-starehe-maroon-800">Enrollment Policy:</span>
            <p>
              The School operates a dual intake model: 70% of spaces are reserved for sponsored bright girls from economically disadvantaged backgrounds across Kenya, and 30% are allocated to self-sponsored students who meet academic standards.
            </p>
          </div>
        </section>

        {/* Closing & Signoff */}
        <section className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200/90 shadow-subtle space-y-6">
          <div className="space-y-3">
            <h3 className="font-serif text-xl font-bold text-starehe-blue-950">
              Our Promise: Holistic Excellence
            </h3>
            <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
              In addition to academics, we emphasize leadership, character development, and community engagement. Through clubs, sports, and partnerships, we shape individuals who are prepared to lead with compassion and bravery.
            </p>
            <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
              We invite you to explore our campus, connect with our lively community, and experience the essence of the Starehe spirit firsthand. For inquiries or enrollment details regarding our upcoming intakes, please reach out to us at <strong className="text-starehe-blue-900">0707 900 852</strong> or <strong className="text-starehe-blue-900">info@starehegirlscentre.co.ke</strong>.
            </p>
          </div>

          <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-xs font-serif italic text-starehe-maroon-800 text-base font-bold">
                &ldquo;Elimu Yetu, Nguvu Yetu&rdquo; — Our Education, Our Strength
              </p>
              <div className="mt-2">
                <p className="text-sm font-bold text-starehe-blue-950">Mrs. Beatrice Shirao</p>
                <p className="text-xs text-stone-600">Principal, Starehe Girls&apos; Centre</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Link
                href="/admissions"
                className="px-5 py-2.5 rounded-full bg-starehe-blue-900 hover:bg-starehe-blue-800 text-white font-semibold text-xs tracking-wide transition-colors"
              >
                Admissions Information
              </Link>
              <Link
                href="/contact"
                className="px-5 py-2.5 rounded-full border border-stone-300 hover:bg-stone-50 text-starehe-blue-950 font-semibold text-xs tracking-wide transition-colors"
              >
                Contact Principal&apos;s Desk
              </Link>
            </div>
          </div>
        </section>
      </div>
    </EditorialPageLayout>
  );
}

