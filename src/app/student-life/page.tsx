import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { EditorialPageLayout } from "@/components/layout/EditorialPageLayout";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  Users,
  Sparkles,
  Trophy,
  Building,
  Heart,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Student Life & Sisterhood | Holistic Character Development",
  description:
    "Life at Starehe Girls' Centre blends academic discipline with sisterhood, leadership, clubs, sports, and spiritual wellness on our 55-acre serene campus in Nairobi.",
};

const STUDENT_LIFE_SIDEBAR_LINKS = [
  { label: "Student Life Overview", href: "/student-life", active: true },
  { label: "Clubs & Societies", href: "/student-life/clubs" },
  { label: "Sports & Athletics", href: "/student-life/sports" },
  { label: "Campus Facilities", href: "/student-life/facilities" },
  { label: "Photo & Campus Gallery", href: "/student-life/gallery" },
];

export default function StudentLifePage() {
  return (
    <EditorialPageLayout
      breadcrumbs={[{ label: "Student Life", href: "/student-life" }, { label: "Overview" }]}
      kicker="Holistic Formation"
      title="Life at Starehe: Sisterhood, Service & Character"
      description="Student life at Starehe Girls' Centre is crafted to nurture the whole person: intellectual brilliance, moral fortitude, empathy, athletic fitness, and an enduring bond of sisterhood uniting young women from every corner of Kenya."
      heroFacts={[
        { label: "Student Body", value: "800 Boarding Girls" },
        { label: "Campus Scope", value: "55 Acres in Njathaini" },
        { label: "Active Clubs", value: "8 Specialized Societies" },
        { label: "Mentorship", value: "Big Sister Pairing System" },
      ]}
      sidebarTitle="Student Life"
      sidebarLinks={STUDENT_LIFE_SIDEBAR_LINKS}
    >
      <div className="space-y-10">
        <div>
          <SectionHeading
            badge="Holistic Formation"
            title="Beyond the Classroom Walls"
            description="Our students cultivate courage, leadership, and emotional resilience through a balanced calendar of extracurricular activities."
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Clubs & Societies */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-subtle hover:border-starehe-blue-300 transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-starehe-blue-100 text-starehe-blue-900 flex items-center justify-center mb-4">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-starehe-blue-950 mb-1.5">
                Clubs &amp; Societies
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                From Robotics and Science Innovation to Model UN, Journalism, and the
                Presidential Award Kenya.
              </p>
            </div>
            <Link
              href="/student-life/clubs"
              className="text-xs font-bold text-starehe-blue-900 hover:underline inline-flex items-center space-x-1 pt-3 border-t border-slate-100"
            >
              <span>Explore Clubs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Sports & Wellness */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-subtle hover:border-starehe-maroon-300 transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-starehe-maroon-100 text-starehe-maroon-800 flex items-center justify-center mb-4">
                <Trophy className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-starehe-blue-950 mb-1.5">
                Sports &amp; Athletics
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Basketball, volleyball, football, cross-country athletics, badminton, netball,
                and lawn tennis on campus pitches.
              </p>
            </div>
            <Link
              href="/student-life/sports"
              className="text-xs font-bold text-starehe-maroon-800 hover:underline inline-flex items-center space-x-1 pt-3 border-t border-slate-100"
            >
              <span>View Sports</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Campus Sanctuary */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-subtle hover:border-starehe-gold-300 transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-starehe-gold-100 text-starehe-gold-800 flex items-center justify-center mb-4">
                <Building className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-starehe-blue-950 mb-1.5">
                55-Acre Sanctuary
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Griffin Dormitories, digital library, twin science laboratories, dining hall,
                and botanical reading gardens.
              </p>
            </div>
            <Link
              href="/student-life/facilities"
              className="text-xs font-bold text-starehe-gold-700 hover:underline inline-flex items-center space-x-1 pt-3 border-t border-slate-100"
            >
              <span>Campus Facilities</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Photo Gallery */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-subtle hover:border-purple-300 transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center mb-4">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-starehe-blue-950 mb-1.5">
                Photo Gallery
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                High-resolution photo archive capturing assemblies, national celebrations,
                itega ceremonies, and daily life.
              </p>
            </div>
            <Link
              href="/student-life/gallery"
              className="text-xs font-bold text-purple-800 hover:underline inline-flex items-center space-x-1 pt-3 border-t border-slate-100"
            >
              <span>View Photo Archive</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* The Sisterhood Culture */}
        <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-subtle">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-md border-2 border-slate-100 aspect-[4/3]">
                <Image
                  src="/images/hero/hero-students-assembly.jpg"
                  alt="Starehe Girls' Centre Student Community"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 35vw"
                />
              </div>
            </div>

            <div className="md:col-span-7">
              <span className="text-[10px] uppercase font-bold tracking-wider text-starehe-maroon-800 bg-starehe-maroon-50 px-2.5 py-0.5 rounded-full border border-starehe-maroon-200 inline-block mb-2">
                Enduring Sisterhood
              </span>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-starehe-blue-950 leading-snug">
                The Big Sister Mentorship Tradition
              </h2>
              <p className="mt-3 text-slate-700 leading-relaxed text-xs sm:text-sm">
                From the moment a Form 1 student steps onto campus during the ceremonial{" "}
                <em>itega</em> welcoming, she is assigned an older &ldquo;sister&rdquo;—a senior
                student who assists her with settling in, understanding campus routines,
                navigating academic prep, and embracing &ldquo;The Starehe Way&rdquo;.
              </p>
              <p className="mt-2 text-slate-600 leading-relaxed text-xs">
                This cherished peer-mentoring bond eliminates bullying, fosters emotional
                safety, and creates an empowering network of supportive sisters that endures
                long after graduation into university and professional life.
              </p>

              <div className="mt-4 space-y-2 text-xs text-slate-700 border-t border-slate-100 pt-3">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>Zero-tolerance policy towards bullying or hazing</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>Student leadership council with elected captains and prefects</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>Weekly ecumenical and inter-faith spiritual guidance</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </EditorialPageLayout>
  );
}
