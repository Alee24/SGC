import React from "react";
import { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CLUBS_AND_SOCIETIES } from "@/data/school-data";
import {
  Sparkles,
  Award,
  Globe2,
  Heart,
  Newspaper,
  Music,
  TreePine,
  Shield,
  CheckCircle2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Clubs & Societies | Co-Curricular Excellence",
  description:
    "Explore the vibrant clubs and societies at Starehe Girls' Centre: Robotics & Science, Model United Nations, Presidential Award, Red Cross, Journalism, Drama & Music.",
};

export default function ClubsPage() {
  const clubIcons: Record<string, React.ReactNode> = {
    "Presidential Award Kenya": <Award className="w-6 h-6 text-starehe-gold-600" />,
    "Robotics & Science Innovation Club": <Sparkles className="w-6 h-6 text-starehe-blue-700" />,
    "Model United Nations (MUN)": <Globe2 className="w-6 h-6 text-starehe-blue-800" />,
    "Kenya Red Cross Society": <Heart className="w-6 h-6 text-starehe-maroon-700" />,
    "Journalism & Media Club": <Newspaper className="w-6 h-6 text-purple-700" />,
    "Drama & Music Society": <Music className="w-6 h-6 text-amber-700" />,
    "Environmental & Wildlife Club": <TreePine className="w-6 h-6 text-emerald-700" />,
    "St. John Ambulance & Girl Guides": <Shield className="w-6 h-6 text-starehe-blue-900" />,
  };

  return (
    <div>
      <Breadcrumb
        items={[
          { label: "Student Life", href: "/student-life" },
          { label: "Clubs & Societies" },
        ]}
      />

      {/* Hero */}
      <section className="py-16 sm:py-20 bg-starehe-blue-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-starehe-gold-accent/20 text-starehe-gold-300 border border-starehe-gold-accent/30 mb-4">
              Co-Curricular Engagement
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              Clubs &amp; Societies
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-200 leading-relaxed font-light">
              Every Wednesday afternoon, the Starehe campus comes alive with co-curricular
              passion. Every girl belongs to at least one active club, building hands-on
              leadership, teamwork, and vocational discovery.
            </p>
          </div>
        </div>
      </section>

      {/* Clubs Grid */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Student Organizations"
            title="Nurturing Passions, Cultivating Leadership"
            description="Our clubs regularly compete at national symposiums, model UN conferences, and science fairs across Kenya."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {CLUBS_AND_SOCIETIES.map((club) => (
              <div
                key={club.name}
                className="bg-white rounded-3xl p-8 border border-slate-200 shadow-subtle hover:shadow-elevation transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-3 rounded-2xl bg-slate-100 flex-shrink-0">
                        {clubIcons[club.name] || <Sparkles className="w-6 h-6 text-starehe-blue-900" />}
                      </div>
                      <div>
                        <h3 className="font-serif text-xl font-bold text-starehe-blue-950">
                          {club.name}
                        </h3>
                        <span className="text-[11px] font-semibold text-starehe-maroon-800 uppercase tracking-wider">
                          {club.category}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                    {club.description}
                  </p>

                  <div className="border-t border-slate-100 pt-5">
                    <div className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                      Key Activities &amp; Projects:
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                      {club.activities.map((act) => (
                        <div key={act} className="flex items-center space-x-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                          <span>{act}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
