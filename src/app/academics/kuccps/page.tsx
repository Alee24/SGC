import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { KUCCPS_ADVISORY } from "@/data/school-data";
import {
  GraduationCap,
  ExternalLink,
  HelpCircle,
  Laptop,
  CheckCircle2,
  Mail,
  Phone,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "KUCCPS University Placement Advisory | Higher Education Guidance",
  description:
    "Official KUCCPS university and TVET placement guidance for Starehe Girls' Centre KCSE candidates. Access student portal links, course selection counseling, and IT Office support.",
};

export default function KuccpsPage() {
  return (
    <div>
      <Breadcrumb
        items={[
          { label: "Academics", href: "/academics" },
          { label: "KUCCPS Placement Advisory" },
        ]}
      />

      {/* Hero */}
      <section className="py-16 sm:py-20 bg-starehe-blue-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-starehe-gold-accent/20 text-starehe-gold-300 border border-starehe-gold-accent/30 mb-4">
              Higher Education Advisory
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              KUCCPS Placement &amp; University Transition
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-200 leading-relaxed font-light">
              Guidance, counseling, and technical support for graduating KCSE candidates
              as they apply for competitive university degrees, KMTC health diplomas,
              and TVET programmes through the Kenya Universities and Colleges Central Placement Service.
            </p>
          </div>
        </div>
      </section>

      {/* Main Advisory Letter */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-elevation">
            <div className="flex items-center justify-between border-b border-slate-100 pb-6 mb-6">
              <div>
                <span className="text-xs uppercase font-bold text-starehe-maroon-800 tracking-wider">
                  Official Communication
                </span>
                <h2 className="font-serif text-2xl font-bold text-starehe-blue-950 mt-1">
                  Information to the Graduating KCSE Class
                </h2>
              </div>
              <div className="w-12 h-12 rounded-xl bg-starehe-blue-50 text-starehe-blue-900 flex items-center justify-center flex-shrink-0">
                <GraduationCap className="w-6 h-6" />
              </div>
            </div>

            <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4 text-sm sm:text-base">
              <p>
                <strong>Dear Esteemed Candidates and Alumni,</strong>
              </p>
              <p>
                We celebrate your remarkable academic diligence and character. With over{" "}
                <strong>93% of our candidates achieving direct university entry grades (C+ and above)</strong>,
                you have upheld the illustrious standard of Starehe Girls&apos; Centre.
              </p>
              <p>
                The Kenya Universities and Colleges Central Placement Service (KUCCPS) portal
                is open for applications to degree, KMTC, and TVET programmes. Kindly access
                the official placement portal at{" "}
                <a
                  href={KUCCPS_ADVISORY.portalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-starehe-blue-900 font-bold underline inline-flex items-center space-x-1"
                >
                  <span>students.kuccps.net</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>{" "}
                to explore available courses and make your selections.
              </p>
              <p>
                We strongly advise you to review cutoff points, prerequisites, and deadlines
                regularly to maximize your placement in your desired profession.
              </p>

              {/* IT Support Box */}
              <div className="my-6 p-6 rounded-2xl bg-starehe-blue-50 border border-starehe-blue-100 not-prose">
                <div className="flex items-start space-x-4">
                  <div className="p-2.5 rounded-xl bg-starehe-blue-900 text-white mt-1">
                    <Laptop className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-base font-bold text-starehe-blue-950">
                      Starehe Girls&apos; IT Office Technical Support
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                      Should you experience any technical difficulties, forgotten passwords,
                      or challenges with cluster points calculation during the placement window,
                      our campus IT Office is available to provide one-on-one assistance.
                    </p>
                    <div className="mt-3 flex items-center space-x-4 text-xs font-semibold text-starehe-blue-900">
                      <span>Email: info@starehegirlscentre.co.ke</span>
                      <span>&bull;</span>
                      <span>Call: 0707 900 852</span>
                    </div>
                  </div>
                </div>
              </div>

              <p className="italic text-slate-600">
                &ldquo;Once again, congratulations on this remarkable achievement. As you step
                into the next chapter of your life, we encourage you to remain focused,
                purposeful, confident in your abilities and remember: wherever you go, carry
                with you the good name of Starehe Girls Centre. The future is bright, and we
                believe you will continue to make us proud.&rdquo;
              </p>

              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="font-serif font-bold text-starehe-blue-950">
                    Sister Jane Soita
                  </div>
                  <div className="text-xs text-slate-500">
                    Director, Starehe Girls&apos; Centre
                  </div>
                </div>

                <a
                  href={KUCCPS_ADVISORY.portalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-starehe-blue-900 hover:bg-starehe-blue-800 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
                >
                  <span>Launch KUCCPS Portal</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
