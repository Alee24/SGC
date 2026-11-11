import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowRight,
  ShieldCheck,
  Heart,
  ExternalLink,
} from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-starehe-blue-950 text-slate-300 pt-16 pb-8 border-t-4 border-starehe-maroon-800">
      <div className="w-[92%] md:w-[90%] max-w-[1680px] mx-auto">
        {/* Main 4-column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-starehe-blue-900">
          {/* Column 1: Institutional Identity */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="relative w-12 h-14 flex-shrink-0 bg-white/10 p-1 rounded">
                <Image
                  src="/images/brand/logo.png"
                  alt="Starehe Girls' Centre Crest"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="font-serif font-bold text-white text-lg leading-tight">
                  Starehe Girls&apos; Centre
                </h3>
                <p className="text-xs text-starehe-gold-400 font-semibold tracking-wide uppercase">
                  Charitable Trust &bull; Nairobi
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Established in 2005 as a charitable national boarding institution
              nurturing bright but financially and socially disadvantaged young
              women from all 47 counties of Kenya.
            </p>

            <div className="p-3 rounded-lg bg-starehe-blue-900/60 border border-starehe-blue-800/80">
              <div className="text-[11px] uppercase tracking-wider text-starehe-gold-400 font-bold mb-1">
                Our School Motto
              </div>
              <div className="font-serif italic text-sm text-white font-medium">
                &ldquo;Elimu Yetu, Nguvu Yetu&rdquo;
              </div>
              <div className="text-xs text-slate-400 mt-0.5">
                (Our Education, Our Strength)
              </div>
            </div>

            <div className="flex items-center space-x-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-starehe-gold-accent flex-shrink-0" />
              <span>Registered Trust under Cap 164 &amp; Basic Education Act</span>
            </div>
          </div>

          {/* Column 2: Academics & Admissions */}
          <div className="space-y-3">
            <h4 className="font-serif font-semibold text-white text-base tracking-wide border-b border-starehe-blue-800 pb-2">
              Academics &amp; Admissions
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/admissions"
                  className="hover:text-white transition-colors flex items-center space-x-1.5"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-starehe-gold-accent" />
                  <span>Admissions Overview</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/admissions/form-one"
                  className="hover:text-white transition-colors flex items-center space-x-1.5"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-starehe-gold-accent" />
                  <span>Form 1 Application (Blue Form)</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/admissions/senior-school"
                  className="hover:text-white transition-colors flex items-center space-x-1.5"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-starehe-gold-accent" />
                  <span>Senior School Grade 10 (CBE)</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/academics/performance"
                  className="hover:text-white transition-colors flex items-center space-x-1.5"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-starehe-gold-accent" />
                  <span>KCSE 8.90 (B) Performance</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/academics/curriculum"
                  className="hover:text-white transition-colors flex items-center space-x-1.5"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-starehe-gold-accent" />
                  <span>Operation Plus 5 Slogan</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/academics/kuccps"
                  className="hover:text-white transition-colors flex items-center space-x-1.5"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-starehe-gold-accent" />
                  <span>KUCCPS University Advisory</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Governance & Giving */}
          <div className="space-y-3">
            <h4 className="font-serif font-semibold text-white text-base tracking-wide border-b border-starehe-blue-800 pb-2">
              Heritage &amp; Philanthropy
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/about/history"
                  className="hover:text-white transition-colors flex items-center space-x-1.5"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-starehe-gold-accent" />
                  <span>Dr. Griffin Heritage &amp; Limuru</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/about/trustees"
                  className="hover:text-white transition-colors flex items-center space-x-1.5"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-starehe-gold-accent" />
                  <span>Board of Trustees Directory</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/about/management"
                  className="hover:text-white transition-colors flex items-center space-x-1.5"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-starehe-gold-accent" />
                  <span>Board of Management (BOM)</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/giving/projects"
                  className="hover:text-white transition-colors flex items-center space-x-1.5"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-starehe-gold-accent" />
                  <span>Capital Infrastructure Needs</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/giving/events"
                  className="hover:text-white transition-colors flex items-center space-x-1.5"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-starehe-gold-accent" />
                  <span>Annual Charity Golf &amp; Walk</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/careers-tenders"
                  className="hover:text-white transition-colors flex items-center space-x-1.5"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-starehe-gold-accent" />
                  <span>Procurement Tenders &amp; Careers</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Location */}
          <div className="space-y-3">
            <h4 className="font-serif font-semibold text-white text-base tracking-wide border-b border-starehe-blue-800 pb-2">
              Contact &amp; Location
            </h4>
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-starehe-gold-accent mt-0.5 flex-shrink-0" />
                <span>
                  Bustani Estate, Njathaini, Off Kiambu Road, Kasarani Sub-County,
                  Roysambu Constituency, Nairobi.
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-starehe-gold-accent flex-shrink-0" />
                <span>P.O. Box 6847 - 00200, Nairobi, Kenya</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-starehe-gold-accent flex-shrink-0" />
                <div className="space-x-1">
                  <a href="tel:0707900852" className="hover:text-white font-medium">0707 900 852</a>
                  <span>/</span>
                  <a href="tel:0738255448" className="hover:text-white font-medium">0738 255 448</a>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-starehe-gold-accent flex-shrink-0" />
                <a
                  href="mailto:info@starehegirlscentre.co.ke"
                  className="hover:text-white font-medium"
                >
                  info@starehegirlscentre.co.ke
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-starehe-gold-accent flex-shrink-0" />
                <span>Monday – Friday: 8:00 AM – 5:00 PM (EAT)</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center space-x-1 text-xs font-semibold text-starehe-gold-400 hover:text-white underline underline-offset-4"
              >
                <span>Interactive Campus Map &amp; Directions</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Ethical Notice, Credit */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-400 space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2 text-center md:text-left">
            <span>
              &copy; {new Date().getFullYear()} Starehe Girls&apos; Centre. All Rights Reserved.
            </span>
            <span className="hidden sm:inline">|</span>
            <span className="hidden sm:inline text-slate-500">
              Charitable National Boarding Institution
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/admissions/fees-aid" className="hover:text-white transition-colors">
              Charity Ethics
            </Link>
            <span className="text-slate-700">&bull;</span>
            <Link href="/careers-tenders" className="hover:text-white transition-colors">
              Public Tenders
            </Link>
            <span className="text-slate-700">&bull;</span>
            <Link href="/contact" className="hover:text-white transition-colors">
              Official Inquiries
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
