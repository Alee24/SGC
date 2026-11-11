import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { EditorialPageLayout } from "@/components/layout/EditorialPageLayout";
import { KUCCPS_ADVISORY } from "@/data/school-data";
import {
  GraduationCap,
  ExternalLink,
  Laptop,
  Mail,
  Phone,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title: "KUCCPS University Placement Advisory | Higher Education Guidance",
  description:
    "Official KUCCPS university and TVET placement guidance for Starehe Girls' Centre KCSE candidates. Access student portal links, course selection counseling, and IT Office support.",
};

const ACADEMICS_SIDEBAR_LINKS = [
  { label: "Academics Overview", href: "/academics" },
  { label: "KCSE Performance & Data", href: "/academics/performance" },
  { label: "Curriculum & CBC Pathways", href: "/academics/curriculum" },
  { label: "Academic Departments", href: "/academics/departments" },
  { label: "KUCCPS & University Prep", href: "/academics/kuccps", active: true },
];

export default function KuccpsPage() {
  return (
    <EditorialPageLayout
      breadcrumbs={[
        { label: "Academics", href: "/academics" },
        { label: "KUCCPS Placement Advisory" },
      ]}
      kicker="Higher Education Advisory"
      title="KUCCPS Placement & University Transition"
      description="Guidance, career counseling, and technical portal support for graduating KCSE candidates applying for competitive university degrees, KMTC health diplomas, and TVET programmes."
      heroFacts={[
        { label: "Portal Access", value: "students.kuccps.net" },
        { label: "2025 Transition", value: "93% Direct Entry" },
        { label: "Campus IT Support", value: "Complimentary Helpdesk" },
        { label: "Advisory Team", value: "Director & Career Masters" },
      ]}
      sidebarTitle="Academics Hub"
      sidebarLinks={ACADEMICS_SIDEBAR_LINKS}
    >
      <div className="space-y-8">
        {/* Main Advisory Letter Card */}
        <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-subtle">
          <div className="flex items-center justify-between border-b border-slate-100 pb-5 mb-5">
            <div>
              <span className="text-[11px] uppercase font-bold text-starehe-maroon-800 tracking-wider">
                Official Institutional Advisory
              </span>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-starehe-blue-950 mt-1">
                Information to the Graduating KCSE Class
              </h2>
            </div>
            <div className="w-10 h-10 rounded-xl bg-starehe-blue-50 text-starehe-blue-900 flex items-center justify-center flex-shrink-0">
              <GraduationCap className="w-5 h-5" />
            </div>
          </div>

          <div className="text-slate-700 leading-relaxed space-y-4 text-xs sm:text-sm">
            <p>
              <strong>Dear Esteemed Candidates and Alumni,</strong>
            </p>
            <p>
              We celebrate your remarkable academic diligence and character. With over{" "}
              <strong>93% of our candidates achieving direct university entry grades (C+ and above)</strong>,
              you have upheld the illustrious standard of Starehe Girls&apos; Centre.
            </p>
            <p>
              The Kenya Universities and Colleges Central Placement Service (KUCCPS) portal is
              active for applications to degree, KMTC, and TVET programmes. Kindly access the
              official placement portal at{" "}
              <a
                href={KUCCPS_ADVISORY.portalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-starehe-blue-900 font-bold underline inline-flex items-center space-x-1"
              >
                <span>students.kuccps.net</span>
                <ExternalLink className="w-3 h-3" />
              </a>{" "}
              to explore available courses and make your selections.
            </p>
            <p>
              We strongly advise you to review cut-off points, subject cluster weights, and
              submission deadlines regularly to maximize your placement in your desired profession.
            </p>

            {/* IT Support Box */}
            <div className="p-5 rounded-xl bg-starehe-blue-50 border border-starehe-blue-100">
              <div className="flex items-start space-x-3.5">
                <div className="p-2.5 rounded-xl bg-starehe-blue-900 text-white mt-0.5 flex-shrink-0">
                  <Laptop className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif text-sm font-bold text-starehe-blue-950">
                    Starehe Girls&apos; IT Office Technical Support
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Should you experience any technical difficulties, password reset issues, or challenges
                    with cluster points calculation during the placement window, our campus IT Office is
                    available to provide one-on-one assistance.
                  </p>
                  <div className="mt-2.5 flex flex-wrap items-center gap-3 text-xs font-semibold text-starehe-blue-900">
                    <span>Email: info@starehegirlscentre.co.ke</span>
                    <span>&bull;</span>
                    <span>Call: 0707 900 852</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-starehe-gold-50 border-l-4 border-starehe-gold-accent text-starehe-blue-950 italic text-xs leading-relaxed">
              &ldquo;Once again, congratulations on this remarkable achievement. As you step into the next chapter
              of your life, we encourage you to remain focused, purposeful, confident in your abilities and remember:
              wherever you go, carry with you the good name of Starehe Girls Centre. The future is bright, and we
              believe you will continue to make us proud.&rdquo;
            </div>

            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="font-serif font-bold text-starehe-blue-950 text-sm">
                  Sister Jane Soita
                </div>
                <div className="text-[11px] text-slate-500">
                  Director, Starehe Girls&apos; Centre
                </div>
              </div>

              <a
                href={KUCCPS_ADVISORY.portalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-starehe-blue-900 hover:bg-starehe-blue-800 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
              >
                <span>Launch KUCCPS Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </section>
      </div>
    </EditorialPageLayout>
  );
}
