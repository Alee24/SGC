import React from "react";
import { Metadata } from "next";
import { EditorialPageLayout } from "@/components/layout/EditorialPageLayout";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CLUBS_AND_SOCIETIES } from "@/data/school-data";
import {
  Cpu,
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

const STUDENT_LIFE_SIDEBAR_LINKS = [
  { label: "Student Life Overview", href: "/student-life" },
  { label: "Clubs & Societies", href: "/student-life/clubs", active: true },
  { label: "Sports & Athletics", href: "/student-life/sports" },
  { label: "Campus Facilities", href: "/student-life/facilities" },
  { label: "Photo & Campus Gallery", href: "/student-life/gallery" },
];

export default function ClubsPage() {
  const clubIcons: Record<string, React.ReactNode> = {
    "Presidential Award Kenya": <Award className="w-5 h-5 text-starehe-gold-600" />,
    "Robotics & Science Innovation Club": <Cpu className="w-5 h-5 text-starehe-blue-700" />,
    "Model United Nations (MUN)": <Globe2 className="w-5 h-5 text-starehe-blue-800" />,
    "Kenya Red Cross Society": <Heart className="w-5 h-5 text-starehe-maroon-700" />,
    "Journalism & Media Club": <Newspaper className="w-5 h-5 text-purple-700" />,
    "Drama & Music Society": <Music className="w-5 h-5 text-amber-700" />,
    "Environmental & Wildlife Club": <TreePine className="w-5 h-5 text-emerald-700" />,
    "St. John Ambulance & Girl Guides": <Shield className="w-5 h-5 text-starehe-blue-900" />,
  };

  return (
    <EditorialPageLayout
      breadcrumbs={[
        { label: "Student Life", href: "/student-life" },
        { label: "Clubs & Societies" },
      ]}
      kicker="Co-Curricular Engagement"
      title="Clubs & Societies"
      description="Every Wednesday afternoon, our campus comes alive with co-curricular passion. Every girl joins at least one active club, cultivating teamwork, communication, vocational discovery, and civic leadership."
      heroFacts={[
        { label: "Club Timetable", value: "Wednesdays 3:30 PM" },
        { label: "Participation", value: "100% Student Body" },
        { label: "Affiliations", value: "PA-K, Red Cross, MUN" },
        { label: "National Contests", value: "Science Fair & Drama" },
      ]}
      sidebarTitle="Student Life"
      sidebarLinks={STUDENT_LIFE_SIDEBAR_LINKS}
    >
      <div className="space-y-8">
        <div>
          <SectionHeading
            badge="Student Organizations"
            title="Nurturing Passions, Cultivating Leadership"
            description="Our clubs regularly compete at national symposiums, Model UN conferences, and science fairs across Kenya."
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {CLUBS_AND_SOCIETIES.map((club) => (
            <div
              key={club.name}
              className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-subtle hover:border-starehe-blue-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start space-x-3 mb-3">
                  <div className="p-2.5 rounded-xl bg-slate-100 flex-shrink-0">
                    {clubIcons[club.name] || <Award className="w-5 h-5 text-starehe-blue-900" />}
                  </div>
                  <div>
                    <h3 className="font-serif text-base font-bold text-starehe-blue-950">
                      {club.name}
                    </h3>
                    <span className="text-[10px] font-semibold text-starehe-maroon-800 uppercase tracking-wider">
                      {club.category}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {club.description}
                </p>
              </div>

              <div className="border-t border-slate-100 pt-3">
                <div className="text-[10px] font-bold text-slate-900 uppercase tracking-wider mb-2">
                  Key Activities &amp; Projects:
                </div>
                <div className="space-y-1.5 text-xs text-slate-700">
                  {club.activities.map((act) => (
                    <div key={act} className="flex items-center space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                      <span className="text-[11px]">{act}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </EditorialPageLayout>
  );
}
