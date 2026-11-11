import React from "react";
import { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  FlaskConical,
  Calculator,
  Languages,
  Globe2,
  Cpu,
  Music,
  CheckCircle2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Academic Departments | Faculty & Subject Disciplines",
  description:
    "Explore the academic departments of Starehe Girls' Centre: Sciences, Mathematics, Languages, Humanities, and Technical & Applied Studies, led by 48 expert teachers.",
};

export default function DepartmentsPage() {
  const departments = [
    {
      name: "Department of Sciences",
      icon: <FlaskConical className="w-6 h-6 text-starehe-blue-700" />,
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
      icon: <Calculator className="w-6 h-6 text-starehe-maroon-700" />,
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
      icon: <Languages className="w-6 h-6 text-starehe-gold-600" />,
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
      icon: <Globe2 className="w-6 h-6 text-emerald-700" />,
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
      icon: <Cpu className="w-6 h-6 text-purple-700" />,
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
    <div>
      <Breadcrumb
        items={[
          { label: "Academics", href: "/academics" },
          { label: "Academic Departments" },
        ]}
      />

      {/* Hero */}
      <section className="py-16 sm:py-20 bg-starehe-blue-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-starehe-gold-accent/20 text-starehe-gold-300 border border-starehe-gold-accent/30 mb-4">
              Faculty &amp; Disciplines
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              Academic Departments
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-200 leading-relaxed font-light">
              Guided by 48 passionate teachers and departmental heads, our academic
              departments blend rigorous subject mastery with supportive mentorship.
            </p>
          </div>
        </div>
      </section>

      {/* Departments Grid */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Instructional Faculties"
            title="Comprehensive Departmental Structure"
            description="Our academic departments nurture students across sciences, arts, languages, and technical disciplines."
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {departments.map((dept) => (
              <div
                key={dept.name}
                className="bg-white rounded-2xl p-8 border border-slate-200 shadow-subtle hover:shadow-elevation transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-3 rounded-xl bg-slate-100 flex-shrink-0">
                      {dept.icon}
                    </div>
                    <div>
                      <h3 className="font-serif text-xl font-bold text-starehe-blue-950">
                        {dept.name}
                      </h3>
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {dept.subjects.map((s) => (
                          <span
                            key={s}
                            className="text-[11px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">
                    {dept.description}
                  </p>

                  <div className="border-t border-slate-100 pt-4">
                    <div className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                      Department Highlights:
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-700">
                      {dept.highlights.map((h) => (
                        <li key={h} className="flex items-start space-x-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 flex-shrink-0" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
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
