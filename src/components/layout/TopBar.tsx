import React from "react";
import Link from "next/link";
import { Phone, Mail, MapPin, Award, HeartHandshake, ShieldCheck } from "lucide-react";

export const TopBar: React.FC = () => {
  return (
    <div className="bg-starehe-blue-950 text-slate-300 text-[11px] py-1.5 px-4 border-b border-starehe-blue-900/80 hidden md:block">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Physical Address & Hotlines */}
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-1.5">
            <MapPin className="w-3 h-3 text-starehe-gold-accent flex-shrink-0" />
            <span className="truncate">Bustani Estate, Njathaini, Off Kiambu Rd, Nairobi</span>
          </div>

          <div className="flex items-center space-x-2">
            <Phone className="w-3 h-3 text-starehe-gold-accent flex-shrink-0" />
            <span className="text-slate-400">Hotlines:</span>
            <a href="tel:0707900852" className="hover:text-white font-medium transition-colors">
              0707 900 852
            </a>
            <span className="text-slate-600">/</span>
            <a href="tel:0738255448" className="hover:text-white font-medium transition-colors">
              0738 255 448
            </a>
          </div>

          <div className="hidden lg:flex items-center space-x-1.5">
            <Mail className="w-3 h-3 text-starehe-gold-accent flex-shrink-0" />
            <a
              href="mailto:info@starehegirlscentre.co.ke"
              className="hover:text-white transition-colors"
            >
              info@starehegirlscentre.co.ke
            </a>
          </div>
        </div>

        {/* Right: Motto & Institutional Portals */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1 text-starehe-gold-300 font-serif italic">
            <Award className="w-3 h-3 text-starehe-gold-accent not-italic" />
            <span>&ldquo;Elimu Yetu, Nguvu Yetu&rdquo;</span>
          </div>

          <span className="text-starehe-blue-800">|</span>

          <Link
            href="/news"
            className="hover:text-white transition-colors text-slate-300"
          >
            News &amp; Notices
          </Link>

          <span className="text-starehe-blue-800">|</span>

          <Link
            href="/careers-tenders"
            className="hover:text-white transition-colors text-slate-300"
          >
            Tenders &amp; Careers
          </Link>

          <span className="text-starehe-blue-800">|</span>

          <Link
            href="/giving"
            className="inline-flex items-center space-x-1 font-semibold text-starehe-gold-400 hover:text-starehe-gold-300 transition-colors"
          >
            <HeartHandshake className="w-3 h-3 text-starehe-gold-accent" />
            <span>Support a Cause</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
