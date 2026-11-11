import React from "react";
import { Metadata } from "next";
import { EditorialPageLayout } from "@/components/layout/EditorialPageLayout";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  FlaskConical,
  Calculator,
  Languages,
  Globe2,
  Cpu,
  CheckCircle2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Academic Departments | Faculty & Subject Disciplines",
  description:
    "Explore the academic departments of Starehe Girls' Centre: Sciences, Mathematics, Languages, Humanities, and Technical & Applied Studies, led by 48 expert teachers.",
};

const ACADEMICS_SIDEBAR_LINKS = [
  { label: "Academics Overview", href: "/academics" },
  { label: "KCSE Performance & Data", href: "/academics/performance" },
  { label: "Curriculum & CBC Pathways", href: "/academics/curriculum" },
  { label: "Academic Departments", href: "/academics/departments", active: true },
  { label: "KUCCPS & University Prep", href: "/academics/kuccps" },
];

export default function DepartmentsPage() {
  const departments = [
    {
      name: "Department of Sciences",
      icon: <FlaskConical className="w-5 h-5 text-starehe-blue-700" />,
      subjects: ["Biology", "Chemistry", "Physics"],
      description:
        "Cultivating empirical scientific rigor, laboratory mastery, and medical/engineering aspirations. Regularly ranking among the best performing science faculties in Nairobi County.",
      highlights: [
        "Equipped Physics, Chemistry and Biology laboratories",
        "Annual participation in Kenya National Science and Engineering Fair",
        "Intensive practical sessions and scientific congress mentorship",
      ],
    },
    {
      name: "Department of Mathematics",
      icon: <Calculator className="w-5 h-5 text-starehe-maroon-700" />,
      subjects: ["Pure Mathematics", "Applied Mathematics"],
      description:
        "Demystifying mathematical logic and problem-solving through peer study circles, remedial clinic sessions, and participation in the National Mathematics Contest.",
      highlights: [
        "Peer-to-peer mathematics coaching circles",
        "Consistent positive deviation in KCSE Mathematics papers",
        "Annual participation in University of Nairobi Mathematics Contests",
      ],
    },
    {
      name: "Department of Languages",
      icon: <Languages className="w-5 h-5 text-starehe-gold-600" />,
      subjects: ["English", "Kiswahili", "French", "German"],
      description:
        "Nurturing eloquent communicators, essayists, and multilingual diplomats. Emphasizing public speaking, creative composition, and literature analysis.",
      highlights: [
        "Inter-house public speaking and debate championships",
        "Foreign language cultural exchanges with French and German cultural institutes",
        "Active student journalism and creative writing workshops",
      ],
    },
    {
      name: "Department of Humanities",
      icon: <Globe2 className="w-5 h-5 text-emerald-700" />,
      subjects: [
        "History & Government",
        "Geography",
        "Christian Religious Education (CRE)",
        "Islamic Religious Education (IRE)",
      ],
      description:
        "Fostering civic consciousness, geographical exploration, and ethical character grounded in spiritual and constitutional understanding.",
      highlights: [
        "Geographical field expeditions to the Great Rift Valley and coast",
        "Model United Nations (MUN) diplomatic training",
        "Ecumenical spiritual wellness and moral instruction",
      ],
    },
    {
      name: "Technical & Applied Disciplines",
      icon: <Cpu className="w-5 h-5 text-purple-700" />,
      subjects: [
        "Business Studies",
        "Computer Studies",
        "Agriculture",
        "Home Science",
        "Music",
      ],
      description:
        "Instilling practical entrepreneurship, technological literacy, agronomy, and creative arts aligned with the Competency-Based Education framework.",
      highlights: [
        "Campus vegetable gardens and poultry practical projects",
        "Modern ICT lab with high-speed fiber internet",
        "National Music Festival award-winning vocal and instrumental ensemble",
      ],
    },
  ];

  return (
    <EditorialPageLayout
      breadcrumbs={[
        { label: "Academics", href: "/academics" },
        { label: "Academic Departments" },
      ]}
      kicker="Instructional Departments"
      title="Academic Departments & Disciplines"
      description="Guided by 48 passionate teachers and departmental heads, our academic departments blend rigorous subject mastery with supportive individualized mentorship."
      heroFacts={[
        { label: "Departments", value: "5 Core Faculties" },
        { label: "Teaching Faculty", value: "48 Specialized Masters" },
        { label: "Science Labs", value: "3 Dedicated Wings" },
        { label: "Languages Taught", value: "English, Kiswahili, French, German" },
      ]}
      sidebarTitle="Academics Hub"
      sidebarLinks={ACADEMICS_SIDEBAR_LINKS}
    >
      <div className="space-y-8">
        <div>
          <SectionHeading
            badge="Faculty Structure"
            title="Comprehensive Departmental Faculties"
            description="Our academic departments nurture students across sciences, arts, languages, and technical disciplines."
          />
        </div>

        <div className="grid grid-cols-1 gap-6">
          {departments.map((dept) => (
            <div
              key={dept.name}
              className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-subtle hover:border-starehe-blue-300 transition-all"
            >
              <div className="flex items-start space-x-3.5 mb-3">
                <div className="p-2.5 rounded-xl bg-slate-100 flex-shrink-0">
                  {dept.icon}
                </div>
                <div>
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-starehe-blue-950">
                    {dept.name}
                  </h3>
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    {dept.subjects.map((s) => (
                      <span
                        key={s}
                        className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                {dept.description}
              </p>

              <div className="border-t border-slate-100 pt-3">
                <div className="text-[10px] font-bold text-slate-900 uppercase tracking-wider mb-2">
                  Faculty Highlights &amp; Activities:
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                  {dept.highlights.map((h) => (
                    <li key={h} className="flex items-start space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 flex-shrink-0" />
                      <span className="text-[11px]">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </EditorialPageLayout>
  );
}
