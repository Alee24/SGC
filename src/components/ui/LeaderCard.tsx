import React from "react";
import Image from "next/image";
import { Leader } from "@/data/school-data";

interface LeaderCardProps {
  leader: Leader;
}

export const LeaderCard: React.FC<LeaderCardProps> = ({ leader }) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden border border-slate-200/80 shadow-subtle hover:shadow-elevation transition-all duration-300 flex flex-col group">
      <div className="relative h-64 sm:h-72 w-full bg-slate-100 overflow-hidden">
        <Image
          src={leader.image}
          alt={leader.name}
          fill
          className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-starehe-blue-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
        <div className="absolute bottom-3 left-3 right-3 text-white">
          <span className="inline-block px-2.5 py-1 rounded-full text-[11px] font-semibold bg-starehe-maroon-800/90 backdrop-blur-sm tracking-wide text-white">
            {leader.role}
          </span>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-serif text-lg font-bold text-starehe-blue-950 group-hover:text-starehe-maroon-800 transition-colors">
            {leader.name}
          </h3>
          <p className="text-xs font-medium text-starehe-gold-700 mt-0.5">
            {leader.title}
          </p>
          {leader.bio && (
            <p className="text-xs text-slate-600 mt-3 leading-relaxed">
              {leader.bio}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
