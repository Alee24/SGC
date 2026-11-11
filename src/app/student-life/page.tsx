import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  Users,
  Sparkles,
  Trophy,
  Building,
  Heart,
  Compass,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Student Life & Sisterhood | Holistic Character Development",
  description:
    "Life at Starehe Girls' Centre blends academic discipline with sisterhood, leadership, clubs, sports, and spiritual wellness on our 55-acre serene campus in Nairobi.",
};

export default function StudentLifePage() {
  return (
    <div>
      <Breadcrumb
        items={[
          { label: "Student Life", href: "/student-life" },
          { label: "Overview" },
        ]}
      />

      {/* Hero */}
      <section className="py-16 sm:py-20 bg-starehe-blue-950 text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-starehe-gold-accent/20 text-starehe-gold-300 border border-starehe-gold-accent/30 mb-4">
              Holistic Secondary Experience
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              Life at Starehe: Sisterhood, Service &amp; Character
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-200 leading-relaxed font-light">
              Student life at Starehe Girls&apos; Centre is designed to form the whole person:
              intellectual brilliance, moral fortitude, empathy, athletic fitness, and a
              lifelong bond of sisterhood uniting young women from every corner of Kenya.
            </p>
          </div>
        </div>
      </section>

      {/* Student Life Dimensions */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Holistic Formation"
            title="Beyond the Classroom Walls"
            description="Our students cultivate courage, leadership, and emotional resilience through a balanced calendar of extracurricular activities."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Clubs & Societies */}
            <div className="p-7 rounded-2xl bg-slate-50 border border-slate-200 hover:border-starehe-blue-300 shadow-subtle hover:shadow-elevation transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-starehe-blue-100 text-starehe-blue-900 flex items-center justify-center mb-5">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-bold text-starehe-blue-950 mb-2">
                  Clubs &amp; Societies
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  From Robotics and Science Innovation to Model UN, Journalism, and the
                  Presidential Award Kenya.
                </p>
              </div>
              <Link
                href="/student-life/clubs"
                className="text-xs font-bold text-starehe-blue-900 hover:underline flex items-center space-x-1"
              >
                <span>Explore Clubs</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Sports & Wellness */}
            <div className="p-7 rounded-2xl bg-slate-50 border border-slate-200 hover:border-starehe-maroon-300 shadow-subtle hover:shadow-elevation transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-starehe-maroon-100 text-starehe-maroon-800 flex items-center justify-center mb-5">
                  <Trophy className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-bold text-starehe-blue-950 mb-2">
                  Sports &amp; Athletics
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Basketball, volleyball, football, cross-country athletics, badminton, netball,
                  and lawn tennis on campus pitches.
                </p>
              </div>
              <Link
                href="/student-life/sports"
                className="text-xs font-bold text-starehe-maroon-800 hover:underline flex items-center space-x-1"
              >
                <span>View Sports</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Campus Sanctuary */}
            <div className="p-7 rounded-2xl bg-slate-50 border border-slate-200 hover:border-starehe-gold-300 shadow-subtle hover:shadow-elevation transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-starehe-gold-100 text-starehe-gold-800 flex items-center justify-center mb-5">
                  <Building className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-bold text-starehe-blue-950 mb-2">
                  55-Acre Sanctuary
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Griffin Dormitories, digital library, twin science laboratories, dining hall,
                  and organic farm.
                </p>
              </div>
              <Link
                href="/student-life/facilities"
                className="text-xs font-bold text-starehe-gold-700 hover:underline flex items-center space-x-1"
              >
                <span>Campus Facilities</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Photo Gallery */}
            <div className="p-7 rounded-2xl bg-slate-50 border border-slate-200 hover:border-purple-300 shadow-subtle hover:shadow-elevation transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center mb-5">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-bold text-starehe-blue-950 mb-2">
                  Photo Gallery
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  High-resolution photo archive capturing assemblies, national celebrations,
                  itega ceremonies, and daily life.
                </p>
              </div>
              <Link
                href="/student-life/gallery"
                className="text-xs font-bold text-purple-800 hover:underline flex items-center space-x-1"
              >
                <span>View Photo Archive</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* The Sisterhood Culture */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-elevation border-4 border-white aspect-[4/3]">
                <Image
                  src="/images/hero/hero-students-assembly.jpg"
                  alt="Starehe Girls' Centre Student Community"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>

            <div className="lg:col-span-6">
              <span className="text-xs uppercase font-bold tracking-wider text-starehe-maroon-800 bg-starehe-maroon-50 px-3 py-1 rounded-full border border-starehe-maroon-200">
                Enduring Sisterhood
              </span>
              <h2 className="font-serif text-3xl font-bold text-starehe-blue-950 mt-4 leading-tight">
                The Big Sister Mentorship Tradition
              </h2>
              <p className="mt-4 text-slate-700 leading-relaxed text-sm sm:text-base">
                From the moment a Form 1 student steps onto campus during the ceremonial{" "}
                <em>itega</em> welcoming, she is assigned an older &ldquo;sister&rdquo;—a senior
                student who assists her with settling in, understanding campus routines,
                navigating academic prep, and embracing &ldquo;The Starehe Way&rdquo;.
              </p>
              <p className="mt-3 text-slate-600 leading-relaxed text-xs sm:text-sm">
                This cherished peer-mentoring bond eliminates bullying, fosters emotional
                safety, and creates an empowering network of supportive sisters that endures
                long after graduation into university and professional life.
              </p>

              <div className="mt-6 space-y-2.5 text-xs text-slate-700">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Zero-tolerance policy towards bullying or hazing</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Student leadership council with elected captains and prefects</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Weekly ecumenical and inter-faith spiritual guidance</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
