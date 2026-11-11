import React from "react";
import { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
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

export default function CareersTendersPage() {
  return (
    <div>
      <Breadcrumb items={[{ label: "Careers & Tenders" }]} />

      {/* Hero */}
      <section className="py-16 sm:py-20 bg-starehe-blue-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-starehe-gold-accent/20 text-starehe-gold-300 border border-starehe-gold-accent/30 mb-4">
              Governance &amp; Opportunities
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              Careers &amp; Procurement Tenders
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-200 leading-relaxed font-light">
              Starehe Girls&apos; Centre is an equal opportunity employer committed to merit-based
              recruitment, competitive compensation, and transparent public procurement in compliance
              with the Basic Education Act 2013 and our Trust Deed.
            </p>
          </div>
        </div>
      </section>

      {/* 1. Job Vacancies Section */}
      <section className="py-20 bg-white border-b border-slate-200" id="careers">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Employment Opportunities"
            title="Current Job Vacancies"
            description="Join our dedicated faculty and support staff community to inspire young women towards exemplary citizenship."
          />

          <div className="space-y-8">
            {JOB_VACANCIES.map((job) => (
              <div
                key={job.id}
                className="bg-slate-50 rounded-3xl p-8 border border-slate-200 shadow-subtle hover:border-starehe-blue-300 transition-all"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-5 mb-6">
                  <div>
                    <span className="text-xs uppercase font-mono font-bold text-starehe-blue-900">
                      Ref: {job.id}
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-starehe-blue-950 mt-1">
                      {job.title} — {job.posts} Post
                    </h3>
                  </div>
                  <div className="flex items-center space-x-2 text-xs">
                    <span className="px-3 py-1 rounded-full bg-starehe-maroon-50 text-starehe-maroon-800 font-semibold border border-starehe-maroon-200">
                      Deadline: {job.deadline}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-starehe-blue-50 text-starehe-blue-900 font-semibold border border-starehe-blue-200">
                      {job.type}
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-6">
                  {job.description}
                </p>

                {/* Requirements */}
                <div className="mb-6">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                    Key Requirements &amp; Qualifications:
                  </h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                    {job.requirements.map((req, i) => (
                      <li key={i} className="flex items-start space-x-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Application Procedure Box */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200 text-xs text-slate-700 space-y-2">
                  <div className="font-bold text-starehe-blue-950 uppercase tracking-wider text-[11px]">
                    Standard Application Procedure:
                  </div>
                  <p>
                    <strong>Step 1:</strong> Prepare an official application letter accompanied by an updated
                    Curriculum Vitae that includes the contact information of three (3) professional referees.
                  </p>
                  <p>
                    <strong>Step 2:</strong> Attach verified copies of your academic certificates, testimonials,
                    National ID card, and KRA PIN certificate.
                  </p>
                  <p>
                    <strong>Step 3:</strong> Send all documents via email to{" "}
                    <a
                      href={`mailto:${job.submissionEmail}`}
                      className="font-mono font-bold text-starehe-maroon-800 underline"
                    >
                      {job.submissionEmail}
                    </a>{" "}
                    on or before <strong>{job.deadline}</strong>.
                  </p>
                  <div className="text-[11px] text-slate-500 italic pt-1">
                    * Only applications submitted through the specified procedure will be considered.
                    Only shortlisted candidates will be contacted.
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Procurement Tenders Section */}
      <section className="py-20 bg-slate-50" id="tenders">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Public Procurement"
            title="Tenders &amp; Requests for Proposals (RFP)"
            description="Starehe Girls' Centre invites eligible, competent, and registered firms for annual tenders and specialized professional consultancy services."
          />

          <div className="space-y-6">
            {TENDERS_LIST.map((tender) => (
              <div
                key={tender.id}
                className="bg-white rounded-3xl p-8 border border-slate-200 shadow-subtle hover:shadow-elevation transition-all"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4 mb-4">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-xs font-bold text-starehe-blue-900">
                        {tender.id}
                      </span>
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                          tender.status === "Open"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {tender.status}
                      </span>
                    </div>
                    <h3 className="font-serif text-xl font-bold text-starehe-blue-950 mt-1">
                      {tender.title}
                    </h3>
                  </div>
                  <div className="text-xs text-slate-500 flex flex-col items-start sm:items-end">
                    <span>Published: {tender.publishedDate}</span>
                    {tender.closingDate && (
                      <span className="font-bold text-starehe-maroon-800 mt-0.5">
                        Closing: {tender.closingDate}
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">
                  {tender.description}
                </p>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                  <div className="text-slate-600">
                    Category: <strong>{tender.category}</strong>
                  </div>
                  <a
                    href="mailto:info@starehegirlscentre.co.ke?subject=Tender%20Document%20Request%20for%20"
                    className="inline-flex items-center space-x-1.5 font-bold text-starehe-blue-900 hover:text-starehe-maroon-800"
                  >
                    <span>Request Tender Dossier</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Statutory Notice */}
          <div className="mt-12 bg-white rounded-2xl p-6 border border-slate-200 text-xs text-slate-600 leading-relaxed">
            <strong>Statutory Disclosure:</strong> Starehe Girls&apos; Centre is established as a
            Trust Organization under the Trustees (Perpetual Succession) Act, Cap 164 of the
            Laws of Kenya, and registered with the Ministry of Education under the Basic Education
            Act 2013. Tenders are evaluated strictly according to statutory public procurement regulations.
          </div>
        </div>
      </section>
    </div>
  );
}
