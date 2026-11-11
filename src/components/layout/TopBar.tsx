import React from "react";
import Link from "next/link";
import { Phone, Mail, MapPin, HeartHandshake, FileText, Lock } from "lucide-react";

export const TopBar: React.FC = () => {
  return (
    <div className="bg-starehe-blue-950 text-slate-300 text-[11px] py-1.5 border-b border-starehe-blue-900/80 hidden md:block">
      <div className="w-[92%] md:w-[90%] max-w-[1680px] mx-auto flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
        {/* Left: Physical Address & Hotlines */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 min-w-0">
          <div className="hidden lg:flex items-center space-x-1.5">
            <MapPin className="w-3 h-3 text-starehe-gold-accent flex-shrink-0" />
            <span className="truncate">Bustani Estate, Njathaini, Nairobi</span>
          </div>

          <div className="flex items-center space-x-1.5 whitespace-nowrap">
            <Phone className="w-3 h-3 text-starehe-gold-accent flex-shrink-0" />
            <a href="tel:0707900852" className="hover:text-white font-medium transition-colors">
              0707 900 852
            </a>
            <span className="text-slate-500">/</span>
            <a href="tel:0738255448" className="hover:text-white font-medium transition-colors">
              0738 255 448
            </a>
          </div>

          <div className="hidden xl:flex items-center space-x-1.5 whitespace-nowrap">
            <Mail className="w-3 h-3 text-starehe-gold-accent flex-shrink-0" />
            <a
              href="mailto:info@starehegirlscentre.co.ke"
              className="hover:text-white transition-colors"
            >
              info@starehegirlscentre.co.ke
            </a>
          </div>
        </div>

        {/* Right: Quick Action Links */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 whitespace-nowrap">
          <Link
            href="/admissions/apply"
            className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded bg-brand-secondary hover:bg-brand-secondaryHover text-white font-semibold transition-colors shadow-sm"
          >
            <FileText className="w-3 h-3 text-white" />
            <span>Grade 10 Application</span>
          </Link>

          <span className="text-slate-600 hidden lg:inline">|</span>

          <Link
            href="/news"
            className="hover:text-white transition-colors text-slate-300"
          >
            News
          </Link>

          <span className="text-slate-600 hidden lg:inline">|</span>

          <Link
            href="/careers-tenders"
            className="hover:text-white transition-colors text-slate-300 hidden lg:inline"
          >
            Tenders &amp; Careers
          </Link>

          <span className="text-slate-600 hidden lg:inline">|</span>

          <Link
            href="/admin"
            className="inline-flex items-center space-x-1 hover:text-white transition-colors text-slate-300"
          >
            <Lock className="w-2.5 h-2.5 text-starehe-gold-accent" />
            <span>Portal</span>
          </Link>

          <span className="text-slate-600 hidden lg:inline">|</span>

          <Link
            href="/giving"
            className="inline-flex items-center space-x-1 font-semibold text-starehe-gold-400 hover:text-starehe-gold-300 transition-colors"
          >
            <HeartHandshake className="w-3 h-3 text-starehe-gold-accent" />
            <span>Support</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
