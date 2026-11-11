import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { EditorialPageLayout } from "@/components/layout/EditorialPageLayout";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  FileText,
  AlertTriangle,
  CheckCircle2,
  Users,
  ShieldCheck,
  Calendar,
  Download,
  Phone,
  Mail,
  Scale,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Form 1 Admission & The Blue Form | Application Guide",
  description:
    "Complete instructions for Form 1 admissions at Starehe Girls' Centre via the official Blue Form. Detailed eligibility, needs assessment (1–10), and 47-county selection process.",
};

const ADMISSIONS_SIDEBAR_LINKS = [
  { label: "Admissions Overview", href: "/admissions" },
  { label: "Online Grade 10 Application", href: "/admissions/apply" },
  { label: "Form 1 & The Blue Form", href: "/admissions/form-one", active: true },
  { label: "CBC Senior School (Grade 10)", href: "/admissions/senior-school" },
  { label: "Fees & Sponsorship Aid", href: "/admissions/fees-aid" },
];

export default function FormOneAdmissionPage() {
  const steps = [
    {
      step: "01",
      title: "First Choice Selection & Age Verification",
      description:
        "The applicant must be 15 years old or younger at the time of admission and must deliberately select Starehe Girls' Centre as her First Choice National School on the official Ministry of Education selection sheet.",
    },
    {
      step: "02",
      title: "Complete the Official Blue Application Form",
      description:
        "The Blue Application Form must be completed accurately in full by the candidate and family, and returned to the school by July 31st of the candidate's primary examination year. Forms can be acquired directly from the Centre or requested online.",
    },
    {
      step: "03",
      title: "Fourfold Community Authentication",
      description:
        "To ensure absolute authenticity and prevent fraud, the Blue Form must be officially stamped and signed by: 1) Parent/Guardian, 2) Primary School Headteacher, 3) Local Area Chief, and 4) Religious Minister (Pastor, Priest, or Imam) verifying family background.",
    },
    {
      step: "04",
      title: "Needs Assessment Grading (Scale 1–10)",
      description:
        "Every application is evaluated on an objective disadvantage index from 1 (most vulnerable, orphan, extreme poverty) to 10 (able). Shortlisted candidates in groups 1–5 are prioritized for full charitable sponsorship.",
    },
    {
      step: "05",
      title: "47-County Quota Sorting & 12-Member Committee",
      description:
        "Forms are organized into 47 distinct county files to ensure every region of Kenya is represented. Following national examination results, an independent 12-member select committee evaluates each case.",
    },
    {
      step: "06",
      title: "Home Verification Visits & Sister Welcoming Ceremony",
      description:
        "Where background uncertainties exist, officers from the Sponsorship Office conduct in-person home visits. Successful candidates receive their placement letters and are welcomed into the family with the ceremonial sister pairing.",
    },
  ];

  return (
    <EditorialPageLayout
      breadcrumbs={[
        { label: "Admissions", href: "/admissions" },
        { label: "Form 1 (The Blue Form)" },
      ]}
      kicker="Charitable National Admission"
      title="Form 1 Admission & The Blue Form"
      description="Since 2005, the iconic Blue Form has provided a life-changing gateway for academically gifted girls from disadvantaged backgrounds to access Kenya's premier secondary education free of charge."
      heroFacts={[
        { label: "Submission Deadline", value: "July 31st Annually" },
        { label: "Application Fee", value: "100% Free (Never Sold)" },
        { label: "Representation", value: "All 47 Counties" },
        { label: "Scholarship Coverage", value: "70% Full Charity" },
      ]}
      sidebarTitle="Admissions Hub"
      sidebarLinks={ADMISSIONS_SIDEBAR_LINKS}
    >
      <div className="space-y-10">
        {/* Anti-Fraud Banner */}
        <section className="bg-rose-50 border-2 border-rose-300/80 rounded-2xl p-5 sm:p-6 shadow-sm">
          <div className="flex items-start space-x-3.5">
            <AlertTriangle className="w-6 h-6 text-rose-700 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-rose-950 text-sm sm:text-base">
                CRITICAL NOTICE TO ALL PARENTS &amp; GUARDIANS: The Starehe Blue Form is 100% Free &amp; is NEVER SOLD
              </h3>
              <p className="text-xs sm:text-sm text-rose-900/90 mt-1.5 leading-relaxed">
                No official, broker, agent, or commercial cyber café has authority to demand payment
                for Blue Forms or promise guaranteed admission. Any solicitations are fraudulent
                criminal offenses. Report fraudulent activity directly to the Director&apos;s Office
                at <strong>0707 900 852</strong> or local police.
              </p>
            </div>
          </div>
        </section>

        {/* 6-Step Selection Process */}
        <section className="space-y-6">
          <div>
            <SectionHeading
              badge="Rigorous Transparency"
              title="Step-by-Step Blue Form Application Process"
              description="A multi-stage national selection model crafted to ensure merit, equity, and authentic disadvantage representation."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {steps.map((item) => (
              <div
                key={item.step}
                className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-subtle hover:border-starehe-blue-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-2xl font-black text-starehe-blue-900/30">
                      {item.step}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-starehe-blue-50 text-starehe-blue-900">
                      Stage {item.step}
                    </span>
                  </div>
                  <h3 className="font-serif text-base font-bold text-starehe-blue-950 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Fourfold Verification Card */}
        <section className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200">
          <div className="flex items-center space-x-3 mb-3 text-starehe-blue-950">
            <Scale className="w-5 h-5 text-starehe-gold-accent flex-shrink-0" />
            <h3 className="font-serif text-lg font-bold">
              The Four Mandatory Community Authentications
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
            Every candidate&apos;s financial necessity is rigorously vetted at the grass-roots level.
            Incomplete forms lacking any of the four community verifications cannot be processed:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-subtle">
              <div className="font-bold text-xs tracking-wide text-starehe-blue-950 mb-1 flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-starehe-maroon-800" />
                <span>1. Parent / Guardian Declaration</span>
              </div>
              <p className="text-xs text-slate-600">
                Detailed statement of family income, living conditions, and dependent siblings.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-subtle">
              <div className="font-bold text-xs tracking-wide text-starehe-blue-950 mb-1 flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-starehe-maroon-800" />
                <span>2. Primary School Headteacher</span>
              </div>
              <p className="text-xs text-slate-600">
                Official school stamp validating student discipline, mock scores, and fees history.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-subtle">
              <div className="font-bold text-xs tracking-wide text-starehe-blue-950 mb-1 flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-starehe-maroon-800" />
                <span>3. Local Area Chief / Assistant Chief</span>
              </div>
              <p className="text-xs text-slate-600">
                National Government Administration seal verifying local residency and genuine hardship.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-subtle">
              <div className="font-bold text-xs tracking-wide text-starehe-blue-950 mb-1 flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-starehe-maroon-800" />
                <span>4. Religious Minister (Priest/Pastor/Imam)</span>
              </div>
              <p className="text-xs text-slate-600">
                Faith community leader attestation confirming moral character and family distress.
              </p>
            </div>
          </div>
        </section>

        {/* Action Callout */}
        <section className="bg-gradient-to-br from-starehe-blue-950 to-starehe-blue-900 text-white rounded-2xl p-6 sm:p-8 shadow-md">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <span className="text-[11px] uppercase font-bold tracking-wider text-starehe-gold-300">
                Application Timelines &amp; Dispatch
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mt-1">
                Need Assistance with Form 1 Applications?
              </h3>
              <p className="text-xs sm:text-sm text-slate-200 mt-2 max-w-xl leading-relaxed">
                Forms must be delivered or mailed to the Centre by July 31st. Contact our Admissions
                Desk if you are a primary school headteacher requesting copies for your students.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5 w-full sm:w-auto flex-shrink-0">
              <a
                href="mailto:info@starehegirlscentre.co.ke?subject=Inquiry%20Regarding%20Form%201%20Blue%20Form"
                className="px-5 py-3 rounded-full bg-starehe-gold-500 hover:bg-starehe-gold-400 text-starehe-blue-950 font-bold text-xs uppercase tracking-wider text-center transition-colors shadow-sm"
              >
                Request Blue Form
              </a>
              <a
                href="tel:0707900852"
                className="px-5 py-3 rounded-full border border-white/30 text-white hover:bg-white/10 font-bold text-xs uppercase tracking-wider text-center transition-colors"
              >
                Call Help Desk
              </a>
            </div>
          </div>
        </section>
      </div>
    </EditorialPageLayout>
  );
}
