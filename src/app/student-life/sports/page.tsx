import React from "react";
import { Metadata } from "next";
import { EditorialPageLayout } from "@/components/layout/EditorialPageLayout";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SPORTS_DISCIPLINES } from "@/data/school-data";
import { Trophy, Compass, CheckCircle2, Award, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Sports & Athletics | Physical Wellness & Inter-School Tournaments",
  description:
    "Athletics and sports disciplines at Starehe Girls' Centre: Basketball, Volleyball, Football, Netball, Cross Country, Badminton, and Tennis on our 55-acre campus grounds.",
};

const STUDENT_LIFE_SIDEBAR_LINKS = [
  { label: "Student Life Overview", href: "/student-life" },
  { label: "Clubs & Societies", href: "/student-life/clubs" },
  { label: "Sports & Athletics", href: "/student-life/sports", active: true },
  { label: "Campus Facilities", href: "/student-life/facilities" },
  { label: "Photo & Campus Gallery", href: "/student-life/gallery" },
];

export default function SportsPage() {
  return (
    <EditorialPageLayout
      breadcrumbs={[
        { label: "Student Life", href: "/student-life" },
        { label: "Sports & Athletics" },
      ]}
      kicker="Physical Fitness & Wellness"
      title="Sports & Athletics"
      description="We believe a sound mind resides in a healthy body. Physical education and competitive inter-school tournaments foster stamina, strategic resilience, leadership, and true sportsmanlike camaraderie."
      heroFacts={[
        { label: "Campus Sports Fields", value: "Football, Netball, Track" },
        { label: "Court Facilities", value: "Basketball, Volleyball, Tennis" },
        { label: "Competition Level", value: "Sub-County to Regional" },
        { label: "Key Tradition", value: "Termly Inter-House Gala" },
      ]}
      sidebarTitle="Student Life"
      sidebarLinks={STUDENT_LIFE_SIDEBAR_LINKS}
    >
      <div className="space-y-10">
        <div>
          <SectionHeading
            badge="Sporting Disciplines"
            title="Active Athletic Teams &amp; Tournaments"
            description="Our girls compete at sub-county, county, and regional secondary school athletic championships with distinction."
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SPORTS_DISCIPLINES.map((sport) => (
            <div
              key={sport.name}
              className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-subtle hover:border-starehe-blue-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-starehe-maroon-50 text-starehe-maroon-800 flex items-center justify-center mb-3.5">
                  <Trophy className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg font-bold text-starehe-blue-950 mb-1.5">
                  {sport.name}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {sport.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Inter-House Championship Card */}
        <section className="bg-gradient-to-br from-starehe-blue-950 to-starehe-blue-900 text-white rounded-2xl p-6 sm:p-8 shadow-md">
          <span className="text-[11px] uppercase font-bold tracking-wider text-starehe-gold-300">
            School Tradition
          </span>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mt-1">
            Annual Inter-House Sports Gala
          </h3>
          <p className="mt-3 text-xs sm:text-sm text-slate-200 leading-relaxed max-w-2xl">
            Every term culminates in our spirited Inter-House Athletic Championships, where dormitories
            compete for prestigious rolling trophies in track, field, basketball, and volleyball.
            The gala draws passionate support from teachers, alumni, and parents.
          </p>
        </section>
      </div>
    </EditorialPageLayout>
  );
}
