import React from "react";
import { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SPORTS_DISCIPLINES } from "@/data/school-data";
import { Trophy, Compass, CheckCircle2, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "Sports & Athletics | Physical Wellness & Inter-School Tournaments",
  description:
    "Athletics and sports disciplines at Starehe Girls' Centre: Basketball, Volleyball, Football, Netball, Cross Country, Badminton, and Tennis on our 55-acre campus grounds.",
};

export default function SportsPage() {
  return (
    <div>
      <Breadcrumb
        items={[
          { label: "Student Life", href: "/student-life" },
          { label: "Sports & Athletics" },
        ]}
      />

      {/* Hero */}
      <section className="py-16 sm:py-20 bg-starehe-blue-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-starehe-gold-accent/20 text-starehe-gold-300 border border-starehe-gold-accent/30 mb-4">
              Physical Fitness &amp; Teamwork
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              Sports &amp; Athletics
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-200 leading-relaxed font-light">
              We believe a sound mind resides in a sound body. Physical education
              and competitive inter-house and inter-school games foster stamina,
              strategic resilience, and sportsmanlike camaraderie.
            </p>
          </div>
        </div>
      </section>

      {/* Sports Grid */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Sporting Disciplines"
            title="Active Athletic Teams &amp; Tournaments"
            description="Our girls compete at sub-county, county, and regional secondary school athletic championships with distinction."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {SPORTS_DISCIPLINES.map((sport) => (
              <div
                key={sport.name}
                className="bg-white rounded-3xl p-7 border border-slate-200 shadow-subtle hover:shadow-elevation transition-all"
              >
                <div className="w-12 h-12 rounded-2xl bg-starehe-maroon-50 text-starehe-maroon-800 flex items-center justify-center mb-5">
                  <Trophy className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-bold text-starehe-blue-950 mb-2">
                  {sport.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {sport.description}
                </p>
              </div>
            ))}
          </div>

          {/* Inter-House Championship Card */}
          <div className="mt-16 bg-starehe-blue-950 text-white rounded-3xl p-8 sm:p-12 shadow-elevation">
            <div className="max-w-3xl">
              <span className="text-xs uppercase font-bold tracking-wider text-starehe-gold-300">
                School Tradition
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-2">
                Annual Inter-House Sports Gala
              </h3>
              <p className="mt-4 text-xs sm:text-sm text-slate-200 leading-relaxed">
                Every term culminates in our spirited Inter-House Athletic Championships,
                where dormitories compete for prestigious rolling trophies in track,
                field, basketball, and volleyball. The gala draws passionate support
                from teachers, alumni, and parents.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
