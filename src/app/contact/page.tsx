"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  Building,
  Navigation,
} from "lucide-react";

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    category: "General Inquiry",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [referenceCode, setReferenceCode] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(
          json.error ||
            "Your inquiry could not be submitted right now. Please check all required fields or call 0707 900 852."
        );
      }

      setReferenceCode(json.referenceCode || "");
      setSubmitted(true);
      setFormState({
        name: "",
        email: "",
        phone: "",
        category: "General Inquiry",
        message: "",
      });
    } catch (err) {
      setErrorMsg(
        (err as Error).message ||
          "Unable to reach the server. Please verify your internet connection or call 0707 900 852."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Breadcrumb items={[{ label: "Contact Us" }]} />

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
        <div className="absolute inset-0 bg-gradient-to-r from-starehe-blue-950 via-starehe-blue-950/95 to-starehe-blue-900/70" />

        <div className="relative z-10 w-[92%] md:w-[90%] max-w-[1680px] mx-auto">
          <div className="max-w-3xl">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-starehe-gold-accent/20 text-starehe-gold-300 border border-starehe-gold-accent/30 mb-4">
              Get in Touch
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              Contact Starehe Girls&apos; Centre
            </h1>
            <p className="mt-3 text-sm sm:text-base text-slate-200 leading-relaxed font-light">
              We welcome prospective parents, sponsors, alumni, and educational partners
              to connect with our administrative and admissions team.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Grid: Details & Form */}
      <section className="py-20 bg-slate-50">
        <div className="w-[92%] md:w-[90%] max-w-[1680px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left: Contact Info & Driving Directions */}
            <div className="lg:col-span-5 space-y-8">
              <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-subtle space-y-6">
                <h2 className="font-serif text-2xl font-bold text-starehe-blue-950">
                  Official Contact Channels
                </h2>

                <div className="space-y-4 text-sm text-slate-700">
                  <div className="flex items-start space-x-3.5">
                    <MapPin className="w-5 h-5 text-starehe-maroon-700 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong className="block text-slate-900 font-semibold">Physical Location</strong>
                      <span>
                        Bustani Estate, Njathaini, Off Kiambu Road, Kasarani Sub-County,
                        Roysambu Constituency, Nairobi.
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3.5">
                    <Mail className="w-5 h-5 text-starehe-maroon-700 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong className="block text-slate-900 font-semibold">Postal Address</strong>
                      <span>P.O. Box 6847 - 00200, Nairobi, Kenya</span>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3.5">
                    <Phone className="w-5 h-5 text-starehe-blue-900 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong className="block text-slate-900 font-semibold">Telephone Hotlines</strong>
                      <div className="space-x-1">
                        <a href="tel:0707900852" className="text-starehe-blue-900 font-bold hover:underline">
                          0707 900 852
                        </a>
                        <span>/</span>
                        <a href="tel:0738255448" className="text-starehe-blue-900 font-bold hover:underline">
                          0738 255 448
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3.5">
                    <Mail className="w-5 h-5 text-starehe-blue-900 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong className="block text-slate-900 font-semibold">Email Addresses</strong>
                      <a
                        href="mailto:info@starehegirlscentre.co.ke"
                        className="text-starehe-blue-900 block hover:underline"
                      >
                        info@starehegirlscentre.co.ke
                      </a>
                      <a
                        href="mailto:recruitment@starehegirlscentre.co.ke"
                        className="text-starehe-blue-900 block hover:underline text-xs text-slate-500"
                      >
                        recruitment@starehegirlscentre.co.ke (Careers)
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3.5">
                    <Clock className="w-5 h-5 text-starehe-gold-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong className="block text-slate-900 font-semibold">Operating Hours</strong>
                      <span>Monday – Friday: 8:00 AM – 5:00 PM (EAT)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Driving Directions Box */}
              <div className="bg-starehe-blue-950 text-white rounded-3xl p-8 shadow-elevation space-y-3">
                <div className="flex items-center space-x-2 text-starehe-gold-300">
                  <Navigation className="w-5 h-5" />
                  <h3 className="font-serif text-lg font-bold">Directions to Campus</h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Drive along Kiambu Road past Muthaiga and Ridgeways to the Northern Bypass interchange.
                  Turn into Njathaini Road at Bustani Estate, approximately 5 kilometres from Kiambu Road.
                  The campus gate is signposted with the Starehe Girls&apos; Centre crest.
                </p>
              </div>
            </div>

            {/* Right: Interactive Contact Form */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-subtle">
                <h2 className="font-serif text-2xl font-bold text-starehe-blue-950 mb-2">
                  Send Us an Official Message
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mb-8 leading-relaxed">
                  Fill in your details below. Our administrative desk will attend to your
                  inquiry and respond within 24 to 48 business hours.
                </p>

                {submitted ? (
                  <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center animate-in fade-in duration-300">
                    <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center mb-4">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="font-serif text-xl font-bold text-emerald-950">
                      Message Received Successfully!
                    </h3>
                    {referenceCode && (
                      <div className="mt-2 inline-block px-3 py-1 rounded-full bg-white border border-emerald-200 font-mono text-xs font-bold text-emerald-900">
                        Reference: {referenceCode}
                      </div>
                    )}
                    <p className="text-xs sm:text-sm text-emerald-800 mt-2 leading-relaxed max-w-md mx-auto">
                      Thank you for contacting Starehe Girls&apos; Centre. A confirmation
                      has been logged in our registry, and an officer will reach out shortly.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setReferenceCode("");
                      }}
                      className="mt-6 px-6 py-2.5 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs transition-colors"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {errorMsg && (
                      <div
                        role="alert"
                        className="flex items-start gap-2.5 rounded-xl bg-rose-50 border border-rose-200 px-4 py-3 text-xs sm:text-sm text-rose-900"
                      >
                        <AlertCircle className="w-4 h-4 text-rose-700 flex-shrink-0 mt-0.5" />
                        <span>{errorMsg}</span>
                      </div>
                    )}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formState.name}
                          onChange={(e) =>
                            setFormState({ ...formState, name: e.target.value })
                          }
                          placeholder="e.g. Dr. Joyce Wanjiku"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-starehe-blue-900 focus:border-transparent transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={formState.email}
                          onChange={(e) =>
                            setFormState({ ...formState, email: e.target.value })
                          }
                          placeholder="e.g. joyce@example.com"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-starehe-blue-900 focus:border-transparent transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formState.phone}
                          onChange={(e) =>
                            setFormState({ ...formState, phone: e.target.value })
                          }
                          placeholder="e.g. 0712 345 678"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-starehe-blue-900 focus:border-transparent transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5">
                          Inquiry Department *
                        </label>
                        <select
                          value={formState.category}
                          onChange={(e) =>
                            setFormState({ ...formState, category: e.target.value })
                          }
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-starehe-blue-900 focus:border-transparent transition-all bg-white"
                        >
                          <option value="General Inquiry">General Inquiry</option>
                          <option value="Admissions & Blue Form">Admissions &amp; Blue Form</option>
                          <option value="Student Sponsorship & Giving">Student Sponsorship &amp; Giving</option>
                          <option value="Tenders & Procurement">Tenders &amp; Procurement</option>
                          <option value="KUCCPS Placement & Alumni">KUCCPS Placement &amp; Alumni</option>
                          <option value="Principal's Office">Principal&apos;s Office</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5">
                        Your Detailed Message *
                      </label>
                      <textarea
                        required
                        rows={5}
                        value={formState.message}
                        onChange={(e) =>
                          setFormState({ ...formState, message: e.target.value })
                        }
                        placeholder="Please write your inquiry, student index details, or questions here..."
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-starehe-blue-900 focus:border-transparent transition-all"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-3.5 rounded-full bg-starehe-maroon-800 hover:bg-starehe-maroon-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md disabled:opacity-50"
                    >
                      {loading ? (
                        <span>Submitting Your Message...</span>
                      ) : (
                        <>
                          <span>Send Message to Starehe</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
