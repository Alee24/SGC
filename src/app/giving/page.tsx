"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  HeartHandshake,
  Shield,
  Building,
  Gift,
  CheckCircle2,
  ArrowRight,
  Copy,
  Check,
  CreditCard,
  Phone,
} from "lucide-react";

export default function GivingPage() {
  const [pledgeType, setPledgeType] = useState<string>("sponsorship");
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAccount(id);
    setTimeout(() => setCopiedAccount(null), 2500);
  };

  return (
    <div>
      <Breadcrumb
        items={[
          { label: "Support a Cause", href: "/giving" },
          { label: "Ways to Give" },
        ]}
      />

      {/* Hero */}
      <section className="relative py-14 sm:py-18 bg-starehe-blue-950 text-white overflow-hidden border-b-4 border-starehe-maroon-800">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 pointer-events-none hidden lg:block">
          <Image
            src="/images/brand/logo.png"
            alt="Starehe Crest Watermark"
            fill
            className="object-contain object-right"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-starehe-blue-950 via-starehe-blue-950/95 to-starehe-maroon-900/60" />

        <div className="relative z-10 w-[92%] md:w-[90%] max-w-[1680px] mx-auto">
          <div className="max-w-3xl">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-starehe-gold-accent/20 text-starehe-gold-300 border border-starehe-gold-accent/30 mb-4">
              Philanthropy &amp; Giving
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              Invest in a Girl. Transform a Generation.
            </h1>
            <p className="mt-3 text-sm sm:text-base text-slate-200 leading-relaxed font-light">
              Over 70% of our students are daughters of widows, orphans, or from families
              struggling in extreme poverty across Kenya. Your donation provides secondary
              tuition, nutritious meals, warm boarding, healthcare, and dignity.
            </p>
          </div>
        </div>
      </section>

      {/* 4 Pillars of Giving */}
      <section className="py-20 bg-white">
        <div className="w-[92%] md:w-[90%] max-w-[1680px] mx-auto">
          <SectionHeading
            badge="Philanthropic Channels"
            title="Ways to Support Starehe Girls' Centre"
            description="Whether sponsoring a student, contributing to our permanent endowment, or supporting capital infrastructure, every gift directly empowers a young woman."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* 1. Student Sponsorship */}
            <div className="p-7 rounded-3xl bg-slate-50 border border-slate-200 shadow-subtle hover:shadow-elevation transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-starehe-maroon-100 text-starehe-maroon-800 flex items-center justify-center mb-5">
                  <HeartHandshake className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-bold text-starehe-blue-950 mb-2">
                  Student Sponsorship
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  Sponsor one or more girls through their secondary education journey.
                  Sponsors receive termly reports and personal letters from their sponsored scholars.
                </p>
                <div className="space-y-1.5 p-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-800">
                  <div className="flex justify-between font-semibold">
                    <span>1 Year (8.4.4):</span>
                    <strong className="text-starehe-maroon-800 font-mono">Kshs. 90,000</strong>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span>2 Years (8.4.4):</span>
                    <strong className="text-starehe-maroon-800 font-mono">Kshs. 180,000</strong>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span>3 Years (CBE Senior):</span>
                    <strong className="text-starehe-blue-950 font-mono">Kshs. 270,000</strong>
                  </div>
                </div>
              </div>
              <div className="text-xs font-bold text-starehe-maroon-800 mt-4">
                Full Educational Sponsorship
              </div>
            </div>

            {/* 2. Endowment Fund at KCDF */}
            <div className="p-7 rounded-3xl bg-slate-50 border border-slate-200 shadow-subtle hover:shadow-elevation transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-starehe-blue-100 text-starehe-blue-900 flex items-center justify-center mb-5">
                  <Shield className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-bold text-starehe-blue-950 mb-2">
                  KCDF Endowment Fund
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Held at Kenya Community Development Foundation. Only interest earned
                  is withdrawn to fund deficits, leaving the principal for future generations.
                </p>
              </div>
              <div className="text-xs font-bold text-starehe-blue-900">
                Perpetual Legacy Fund
              </div>
            </div>

            {/* 3. Capital Infrastructure */}
            <div className="p-7 rounded-3xl bg-slate-50 border border-slate-200 shadow-subtle hover:shadow-elevation transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-starehe-gold-100 text-starehe-gold-800 flex items-center justify-center mb-5">
                  <Building className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-bold text-starehe-blue-950 mb-2">
                  Capital Projects
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Constructing twin science laboratories, a 1,200-seat multipurpose auditorium,
                  a 160-bed dormitory, and acquiring a 62-seater school bus.
                </p>
              </div>
              <Link
                href="/giving/projects"
                className="text-xs font-bold text-starehe-gold-700 hover:underline flex items-center space-x-1"
              >
                <span>View Projects</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* 4. Gifts in Kind */}
            <div className="p-7 rounded-3xl bg-slate-50 border border-slate-200 shadow-subtle hover:shadow-elevation transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center mb-5">
                  <Gift className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-bold text-starehe-blue-950 mb-2">
                  Gifts in Kind
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Food provisions, laboratory chemicals, computing hardware, sanitary wear,
                  or professional medical and counseling services.
                </p>
              </div>
              <div className="text-xs font-bold text-purple-800">
                Goods &amp; Specialized Services
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Official Banking & Donation Accounts */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Direct Giving Accounts"
            title="Official School Bank &amp; Mobile Money Accounts"
            description="All contributions are received directly into the audited Starehe Girls' Centre accounts, receipted, and accounted for with utmost fidelity."
          />

          <div className="space-y-6">
            {/* Account 1: Bank Wire Transfer */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-subtle">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 rounded-xl bg-starehe-blue-50 text-starehe-blue-900">
                    <Building className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-starehe-blue-950">
                      Standard Chartered Bank Kenya / KCB Bank
                    </h3>
                    <p className="text-xs text-slate-500">Official Institutional Account</p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-starehe-blue-50 text-starehe-blue-900 border border-starehe-blue-200">
                  Verified Trust Account
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-700 bg-slate-50 p-4 rounded-xl">
                <div>
                  <span className="text-slate-500 block">Account Name:</span>
                  <strong className="text-slate-900 font-mono text-sm">Starehe Girls&apos; Centre</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">Account Currency:</span>
                  <strong className="text-slate-900">Kenya Shillings (KES) / USD Available</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">Bank Branch:</span>
                  <strong className="text-slate-900">Kenyatta Avenue / Kiambu Road Branch</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">Audited By:</span>
                  <strong className="text-slate-900">Certified Public Accountants of Kenya</strong>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
                <span>Kindly forward deposit slips to info@starehegirlscentre.co.ke for official receipting.</span>
              </div>
            </div>

            {/* Account 2: MPESA Paybill */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-subtle">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 rounded-xl bg-starehe-maroon-50 text-starehe-maroon-800">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-starehe-blue-950">
                      Safaricom M-PESA Paybill
                    </h3>
                    <p className="text-xs text-slate-500">Fast Mobile Giving</p>
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard("0707900852", "mpesa")}
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                >
                  {copiedAccount === "mpesa" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedAccount === "mpesa" ? "Copied!" : "Copy Details"}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-700 bg-slate-50 p-4 rounded-xl">
                <div>
                  <span className="text-slate-500 block">Inquiries / Support Line:</span>
                  <strong className="text-slate-900 font-mono text-sm">0707 900 852 / 0738 255 448</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">Account Reference:</span>
                  <strong className="text-slate-900 font-mono text-sm">&ldquo;SPONSORSHIP&rdquo; or &ldquo;CAPITAL&rdquo;</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Bursary */}
          <div className="mt-12 text-center">
            <p className="text-xs text-slate-600">
              Need formal tax-deductible donation receipts, CSR partnership agreements, or wire instructions?
            </p>
            <div className="mt-3 flex items-center justify-center space-x-4">
              <a
                href="mailto:info@starehegirlscentre.co.ke?subject=Philanthropic%20Partnership%20Inquiry"
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-starehe-blue-900 hover:bg-starehe-blue-800 text-white font-bold text-xs uppercase tracking-wider transition-colors"
              >
                <span>Contact Sponsorship Office</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                href="/giving/events"
                className="text-xs font-bold text-starehe-maroon-800 hover:underline"
              >
                View Annual Events &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
