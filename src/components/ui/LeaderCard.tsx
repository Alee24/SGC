import React from "react";
import Image from "next/image";
import { Leader } from "@/data/school-data";

interface LeaderCardProps {
  leader: Leader;
}

export const LeaderCard: React.FC<LeaderCardProps> = ({ leader }) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden border border-stone-200/90 shadow-subtle hover:shadow-elevation transition-all duration-300 flex flex-col group">
      <div className="relative h-64 sm:h-72 w-full bg-stone-100 overflow-hidden">
        <Image
          src={leader.image}
          alt={leader.name}
          fill
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-starehe-blue-950/85 via-starehe-blue-950/20 to-transparent" />
        <div className="absolute bottom-3 left-3 right-3 text-white">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-starehe-maroon-900/95 text-white tracking-wide shadow-sm border border-white/10">
            {leader.role}
          </span>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-serif text-lg font-bold text-starehe-blue-950 group-hover:text-starehe-maroon-800 transition-colors">
            {leader.name}
          </h3>
          <p className="text-xs font-medium text-starehe-gold-700 mt-1">
            {leader.title}
          </p>
          {leader.bio && (
            <p className="text-xs text-stone-600 mt-3 leading-relaxed">
              {leader.bio}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
