import React from "react";
import Link from "next/link";
import { Phone, Mail, MapPin, Award } from "lucide-react";

export const TopBar: React.FC = () => {
  return (
    <div className="bg-starehe-blue-950 text-slate-300 text-xs py-2 px-4 border-b border-starehe-blue-800 hidden md:block">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Contact Info & Campus */}
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <MapPin className="w-3.5 h-3.5 text-starehe-gold-accent" />
            <span>Bustani Estate, Njathaini, off Kiambu Rd, Nairobi</span>
          </div>
          <div className="flex items-center space-x-2">
            <Phone className="w-3.5 h-3.5 text-starehe-gold-accent" />
            <a href="tel:0707900852" className="hover:text-white transition-colors">0707 900 852</a>
            <span>/</span>
            <a href="tel:0738255448" className="hover:text-white transition-colors">0738 255 448</a>
          </div>
          <div className="flex items-center space-x-2">
            <Mail className="w-3.5 h-3.5 text-starehe-gold-accent" />
            <a href="mailto:info@starehegirlscentre.co.ke" className="hover:text-white transition-colors">
              info@starehegirlscentre.co.ke
            </a>
          </div>
        </div>

        {/* Right: Motto & Quick Portals */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1.5 text-starehe-gold-300 font-medium">
            <Award className="w-3.5 h-3.5 text-starehe-gold-accent" />
            <span>Elimu Yetu, Nguvu Yetu</span>
          </div>
          <span className="text-slate-600">|</span>
          <Link
            href="/careers-tenders"
            className="hover:text-white transition-colors hover:underline"
          >
            Tenders & Jobs
          </Link>
          <span className="text-slate-600">|</span>
          <Link
            href="/giving"
            className="text-starehe-gold-400 font-semibold hover:text-starehe-gold-300 transition-colors"
          >
            Support a Cause
          </Link>
        </div>
      </div>
    </div>
  );
};
