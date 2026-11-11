import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  FileText,
  AlertTriangle,
  CheckCircle2,
  Users,
  Home,
  ShieldCheck,
  Calendar,
  Download,
  Phone,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Form 1 Admission & The Blue Form | Application Guide",
  description:
    "Complete instructions for Form 1 admissions at Starehe Girls' Centre via the official Blue Form. Detailed eligibility, needs assessment (1–10), and 47-county selection process.",
};

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
        "The Blue Application Form must be completed accurately in full by the candidate and family, and returned to the school by July 31st of the candidate's primary examination year. Forms can be acquired directly from the Centre or downloaded online.",
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
    <div>
      <Breadcrumb
        items={[
          { label: "Admissions", href: "/admissions" },
          { label: "Form 1 (The Blue Form)" },
        ]}
      />

      {/* Hero */}
      <section className="py-16 sm:py-20 bg-starehe-blue-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-starehe-gold-accent/20 text-starehe-gold-300 border border-starehe-gold-accent/30 mb-4">
              Charitable National Admission
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              Form 1 Admission &amp; The Blue Form
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-200 leading-relaxed font-light">
              Since 2005, the iconic Blue Form has provided a life-changing gateway for
              academically talented girls from impoverished backgrounds to access Kenya&apos;s
              highest standard of secondary education free of charge.
            </p>
          </div>
        </div>
      </section>

      {/* Fraud Warning Banner */}
      <section className="py-6 bg-rose-50 border-y border-rose-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start space-x-3 text-rose-950 text-xs sm:text-sm">
            <AlertTriangle className="w-5 h-5 text-rose-700 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold">CRITICAL NOTICE TO ALL PARENTS &amp; GUARDIANS:</strong>{" "}
              The Starehe Blue Form Application is <strong>100% FREE</strong> and is <strong>NEVER SOLD</strong> under
              any circumstances. No official, broker, or agent has authority to demand payment
              for forms or admission consideration. Report any extortion to the school leadership or police.
            </div>
          </div>
        </div>
      </section>

      {/* 6-Step Selection Process */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Rigorous Transparency"
            title="Step-by-Step Blue Form Application Process"
            description="Our admissions process is crafted to ensure objectivity, county representation, and genuine need."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((item) => (
              <div
                key={item.step}
                className="p-8 rounded-2xl bg-slate-50 border border-slate-200 hover:border-starehe-blue-300 shadow-subtle hover:shadow-elevation transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-3xl font-extrabold text-starehe-blue-900/30">
                    {item.step}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-starehe-blue-950 mt-2 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Download & Notice Card */}
          <div className="mt-16 bg-starehe-blue-950 text-white rounded-3xl p-8 sm:p-12 shadow-elevation relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl">
              <span className="text-xs uppercase font-bold tracking-wider text-starehe-gold-300">
                Application Timelines
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-2">
                Download the Form 1 Blue Form Instructions
              </h3>
              <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                Completed forms must be physically delivered or mailed to the Centre by{" "}
                <strong className="text-white">July 31st</strong> of the candidate&apos;s examination year.
                Ensure all four community stamps and signatures are affixed before submission.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto flex-shrink-0">
              <a
                href="mailto:info@starehegirlscentre.co.ke?subject=Inquiry%20Regarding%20Form%201%20Blue%20Form"
                className="px-6 py-3.5 rounded-full bg-starehe-gold-500 hover:bg-starehe-gold-400 text-starehe-blue-950 font-bold text-xs uppercase tracking-wider text-center transition-colors shadow-sm"
              >
                Request Blue Form via Email
              </a>
              <a
                href="tel:0707900852"
                className="px-6 py-3.5 rounded-full border border-white/30 text-white hover:bg-white/10 font-bold text-xs uppercase tracking-wider text-center transition-colors"
              >
                Call Help Desk: 0707 900 852
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
