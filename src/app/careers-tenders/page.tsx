import React from "react";
import { Metadata } from "next";
import { EditorialPageLayout } from "@/components/layout/EditorialPageLayout";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TENDERS_LIST, JOB_VACANCIES } from "@/data/school-data";
import {
  Briefcase,
  FileCheck,
  Calendar,
  Mail,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Careers & Tenders | Vacancies & Public Procurement",
  description:
    "Official procurement tenders (FY 2026/2027) and employment vacancies at Starehe Girls' Centre. Apply for Administration Officer and School Cateress positions.",
};

const CAREERS_SIDEBAR_LINKS = [
  { label: "Current Job Vacancies", href: "#careers", active: true },
  { label: "Procurement Tenders", href: "#tenders" },
  { label: "Board of Management", href: "/about/management" },
  { label: "General Contact", href: "/contact" },
];

export default function CareersTendersPage() {
  return (
    <EditorialPageLayout
      breadcrumbs={[{ label: "Careers & Tenders" }]}
      kicker="Institutional Opportunities"
      title="Careers & Procurement Tenders"
      description="Starehe Girls' Centre is an equal opportunity employer committed to merit-based recruitment, competitive compensation, and transparent public procurement in strict compliance with the Basic Education Act 2013 and our Trust Deed."
      heroFacts={[
        { label: "Recruitment Policy", value: "Merit-Based Equal Opportunity" },
        { label: "Procurement Law", value: "Public Procurement Act" },
        { label: "Current Openings", value: "2 Positions (Admin, Catering)" },
        { label: "Tender Dossiers", value: "Free Online Request" },
      ]}
      sidebarTitle="Opportunities"
      sidebarLinks={CAREERS_SIDEBAR_LINKS}
    >
      <div className="space-y-12">
        {/* 1. Job Vacancies Section */}
        <section id="careers" className="space-y-6">
          <SectionHeading
            badge="Employment Opportunities"
            title="Current Job Vacancies"
            description="Join our dedicated faculty and support staff community to inspire young women towards exemplary citizenship."
          />

          <div className="space-y-6">
            {JOB_VACANCIES.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-subtle hover:border-starehe-blue-300 transition-all"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-4 mb-4">
                  <div>
                    <span className="text-[11px] uppercase font-mono font-bold text-starehe-blue-900">
                      Ref: {job.id}
                    </span>
                    <h3 className="font-serif text-xl font-bold text-starehe-blue-950 mt-0.5">
                      {job.title} — {job.posts} Post
                    </h3>
                  </div>
                  <div className="flex items-center space-x-2 text-xs">
                    <span className="px-2.5 py-0.5 rounded-full bg-starehe-maroon-50 text-starehe-maroon-800 font-bold border border-starehe-maroon-200 text-[10px]">
                      Deadline: {job.deadline}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-starehe-blue-50 text-starehe-blue-900 font-bold border border-starehe-blue-200 text-[10px]">
                      {job.type}
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-5">
                  {job.description}
                </p>

                {/* Requirements */}
                <div className="mb-5">
                  <h4 className="text-[11px] font-bold text-slate-900 uppercase tracking-wider mb-2">
                    Key Requirements &amp; Qualifications:
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    {job.requirements.map((req, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-starehe-maroon-800 mt-0.5 flex-shrink-0" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Application Procedure Box */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700 space-y-1.5">
                  <div className="font-bold text-starehe-blue-950 uppercase tracking-wider text-[10px]">
                    Application Procedure:
                  </div>
                  <p className="text-[11px]">
                    Send cover letter, CV with 3 referees, academic certificates, National ID, and KRA PIN to{" "}
                    <a
                      href={`mailto:${job.submissionEmail}`}
                      className="font-mono font-bold text-starehe-maroon-800 underline"
                    >
                      {job.submissionEmail}
                    </a>{" "}
                    by <strong>{job.deadline}</strong>.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 2. Procurement Tenders Section */}
        <section id="tenders" className="space-y-6 pt-6 border-t border-slate-200">
          <SectionHeading
            badge="Public Procurement"
            title="Tenders &amp; Requests for Proposals (RFP)"
            description="Starehe Girls' Centre invites eligible, tax-compliant, and registered firms for annual supply tenders and specialized services."
          />

          <div className="space-y-5">
            {TENDERS_LIST.map((tender) => (
              <div
                key={tender.id}
                className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-subtle hover:border-starehe-blue-300 transition-all"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-3 mb-3">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-xs font-bold text-starehe-blue-900">
                        {tender.id}
                      </span>
                      <span
                        className={`text-[10px] font-semibold tracking-wide px-2 py-0.5 rounded-full ${
                          tender.status === "Open"
                            ? "bg-starehe-blue-50 text-starehe-blue-900 border border-starehe-blue-200"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {tender.status}
                      </span>
                    </div>
                    <h3 className="font-serif text-lg font-bold text-starehe-blue-950 mt-1">
                      {tender.title}
                    </h3>
                  </div>
                  <div className="text-[11px] text-slate-500 flex flex-col items-start sm:items-end">
                    <span>Published: {tender.publishedDate}</span>
                    {tender.closingDate && (
                      <span className="font-bold text-starehe-maroon-800 mt-0.5">
                        Closing: {tender.closingDate}
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {tender.description}
                </p>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
                  <div className="text-slate-600 text-[11px]">
                    Category: <strong>{tender.category}</strong>
                  </div>
                  <a
                    href="mailto:info@starehegirlscentre.co.ke?subject=Tender%20Document%20Request%20for%20"
                    className="inline-flex items-center space-x-1 font-bold text-starehe-blue-900 hover:text-starehe-maroon-800 text-[11px]"
                  >
                    <span>Request Tender Dossier</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Statutory Notice */}
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 text-xs text-slate-600 leading-relaxed">
            <strong>Statutory Disclosure:</strong> Starehe Girls&apos; Centre is established as a
            Trust Organization under the Trustees (Perpetual Succession) Act, Cap 164 of the
            Laws of Kenya, and registered with the Ministry of Education under the Basic Education
            Act 2013. Tenders are evaluated strictly according to statutory public procurement regulations.
          </div>
        </section>
      </div>
    </EditorialPageLayout>
  );
}
