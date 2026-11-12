"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Leader } from "@/data/school-data";
import { UserCheck, ChevronRight } from "lucide-react";

interface HierarchyOrgChartProps {
  title: string;
  subtitle?: string;
  chairperson: Leader;
  executiveTier: Leader[];
  membersTier: Leader[];
}

type RingColor = "navy" | "primary" | "secondary";

const RING_STYLES: Record<
  RingColor,
  { border: string; stroke: string; badgeBg: string; dot: string }
> = {
  navy: {
    border: "border-[#092D50]",
    stroke: "#092D50",
    badgeBg: "bg-[#092D50] text-white",
    dot: "bg-[#092D50]",
  },
  primary: {
    border: "border-[#07529A]",
    stroke: "#07529A",
    badgeBg: "bg-[#07529A] text-white",
    dot: "bg-[#07529A]",
  },
  secondary: {
    border: "border-[#E32620]",
    stroke: "#E32620",
    badgeBg: "bg-[#E32620] text-white",
    dot: "bg-[#E32620]",
  },
};

interface OrgNodeProps {
  leader: Leader;
  color: RingColor;
  size?: "lg" | "md";
  isSelected: boolean;
  onSelect: (leader: Leader) => void;
}

const OrgNode: React.FC<OrgNodeProps> = ({
  leader,
  color,
  size = "md",
  isSelected,
  onSelect,
}) => {
  const styles = RING_STYLES[color];
  const dimensionClass =
    size === "lg"
      ? "w-28 h-28 sm:w-32 sm:h-32"
      : "w-24 h-24 sm:w-28 sm:h-28";

  return (
    <button
      type="button"
      onClick={() => onSelect(leader)}
      aria-pressed={isSelected}
      className="group flex flex-col items-center text-center focus:outline-none w-full max-w-[210px] mx-auto"
    >
      <div className="relative flex items-center justify-center">
        {/* Concentric partial outer arc matching the reference org chart */}
        <svg
          className="pointer-events-none absolute -inset-2.5 h-[calc(100%+20px)] w-[calc(100%+20px)] transition-transform duration-500 group-hover:rotate-12"
          viewBox="0 0 120 120"
          fill="none"
          aria-hidden="true"
        >
          <circle
            cx="60"
            cy="60"
            r="56"
            stroke={styles.stroke}
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="95 260"
            strokeDashoffset="25"
            opacity="0.8"
          />
          <circle
            cx="60"
            cy="60"
            r="56"
            stroke={styles.stroke}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray="40 315"
            strokeDashoffset="205"
            opacity="0.45"
          />
        </svg>

        {/* Main circular portrait frame with centered image */}
        <div
          className={`relative ${dimensionClass} rounded-full border-[4px] ${styles.border} bg-white p-1 shadow-md transition-all duration-300 group-hover:scale-[1.03] group-hover:shadow-lg ${
            isSelected
              ? "ring-4 ring-[#07529A]/25 shadow-lg scale-[1.03]"
              : ""
          }`}
        >
          <div className="relative w-full h-full rounded-full overflow-hidden bg-[#F4F6F9]">
            <Image
              src={leader.image}
              alt={leader.name}
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 120px, 140px"
            />
          </div>
        </div>
      </div>

      {/* Member Name & Role */}
      <div className="mt-3.5 px-1">
        <h3 className="text-sm sm:text-[15px] font-bold text-[#092D50] leading-snug group-hover:text-[#07529A] transition-colors">
          {leader.name}
        </h3>
        <div className="w-10 h-[1.5px] bg-[#D1D5DB] mx-auto my-1.5" />
        <p className="text-[11px] font-semibold uppercase tracking-wider text-[#4B5563] leading-tight">
          {leader.role}
        </p>
        <p className="text-[11px] text-[#6B7280] mt-1 leading-snug line-clamp-2">
          {leader.title}
        </p>
      </div>
    </button>
  );
};

export const HierarchyOrgChart: React.FC<HierarchyOrgChartProps> = ({
  title,
  subtitle,
  chairperson,
  executiveTier,
  membersTier,
}) => {
  const [selectedLeader, setSelectedLeader] = useState<Leader>(chairperson);

  const getAlternatingColor = (index: number): RingColor =>
    index % 2 === 0 ? "primary" : "secondary";

  return (
    <section
      aria-label={title}
      className="relative overflow-hidden rounded-2xl border border-[#E5E7EB] bg-[#F4F6F9]/85 p-5 sm:p-8 lg:p-10 shadow-sm"
    >
      {/* Subtle decorative background shapes */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 -left-20 h-64 w-64 rounded-full bg-white/70"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-white/70"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none hidden md:block absolute top-14 right-[22%] h-7 w-7 rounded-full border border-dashed border-[#9CA3AF]/50"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none hidden md:block absolute top-52 left-[12%] h-8 w-8 rounded-full border border-dashed border-[#9CA3AF]/50"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none hidden md:block absolute bottom-44 right-[10%] h-7 w-7 rounded-full border border-dashed border-[#9CA3AF]/50"
      />

      {/* Section Heading */}
      <div className="relative z-10 text-center max-w-2xl mx-auto mb-8 sm:mb-10">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EAF3FC] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#07529A] border border-[#07529A]/15">
          <UserCheck className="w-3.5 h-3.5" />
          Governance Hierarchy
        </span>
        <h2 className="mt-3 font-serif text-2xl sm:text-3xl font-bold text-[#092D50]">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-1.5 text-xs sm:text-sm text-[#4B5563]">
            {subtitle}
          </p>
        )}
      </div>

      {/* HIERARCHY TREE */}
      <div className="relative z-10 flex flex-col items-center">
        {/* TIER 1: CHAIRPERSON + LEFT/RIGHT ELBOW CONNECTORS */}
        <div className="relative flex flex-col items-center w-full max-w-4xl">
          <div className="relative flex items-center justify-center w-full">
            {/* Left elbow connector (Desktop md+) */}
            {executiveTier.length >= 2 && (
              <div
                aria-hidden="true"
                className="hidden md:block absolute right-[calc(50%+82px)] top-[64px] w-[18%] lg:w-[21%] h-[88px] border-t-[2.5px] border-l-[2.5px] border-[#092D50] rounded-tl-[2px]"
              >
                <span className="absolute -top-[6px] -left-[6px] h-2.5 w-2.5 rounded-full bg-[#E32620] ring-2 ring-[#F4F6F9]" />
              </div>
            )}

            {/* Chairperson Node */}
            <div className="relative z-10">
              <OrgNode
                leader={chairperson}
                color="navy"
                size="lg"
                isSelected={selectedLeader.name === chairperson.name}
                onSelect={setSelectedLeader}
              />
            </div>

            {/* Right elbow connector (Desktop md+) */}
            {executiveTier.length >= 2 && (
              <div
                aria-hidden="true"
                className="hidden md:block absolute left-[calc(50%+82px)] top-[64px] w-[18%] lg:w-[21%] h-[88px] border-t-[2.5px] border-r-[2.5px] border-[#092D50] rounded-tr-[2px]"
              >
                <span className="absolute -top-[6px] -right-[6px] h-2.5 w-2.5 rounded-full bg-[#E32620] ring-2 ring-[#F4F6F9]" />
              </div>
            )}
          </div>

          {/* Mobile vertical connector below Tier 1 */}
          <div
            aria-hidden="true"
            className="md:hidden relative h-8 w-[2.5px] bg-[#092D50] my-1"
          >
            <span className="absolute top-1/2 -translate-y-1/2 -left-[4px] h-2.5 w-2.5 rounded-full bg-[#E32620]" />
          </div>
        </div>

        {/* TIER 2: EXECUTIVE / FOUNDING / EX-OFFICIO NODES */}
        {executiveTier.length > 0 && (
          <div className="relative w-full max-w-4xl md:mt-2">
            {/* Mobile horizontal bracket if >= 2 */}
            {executiveTier.length >= 2 && (
              <div
                aria-hidden="true"
                className="md:hidden mx-auto w-[60%] h-4 border-t-[2.5px] border-x-[2.5px] border-[#092D50]"
              />
            )}

            <div
              className={`grid gap-6 sm:gap-8 justify-items-center ${
                executiveTier.length === 1
                  ? "grid-cols-1 max-w-xs mx-auto"
                  : "grid-cols-1 sm:grid-cols-2 max-w-2xl md:max-w-3xl mx-auto"
              }`}
            >
              {executiveTier.map((leader, idx) => (
                <div key={leader.name} className="relative w-full flex flex-col items-center">
                  <OrgNode
                    leader={leader}
                    color={getAlternatingColor(idx)}
                    size="md"
                    isSelected={selectedLeader.name === leader.name}
                    onSelect={setSelectedLeader}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CONNECTOR TRUNK FROM TIER 2 TO TIER 3 */}
        {membersTier.length > 0 && (
          <div aria-hidden="true" className="w-full max-w-5xl flex flex-col items-center my-2 sm:my-4">
            {/* Top vertical stem with primary junction dot */}
            <div className="relative h-8 sm:h-10 w-[2.5px] bg-[#092D50]">
              <span className="absolute bottom-0 translate-y-1/2 -left-[4px] h-2.5 w-2.5 rounded-full bg-[#07529A] ring-2 ring-[#F4F6F9]" />
            </div>
            {/* Horizontal crossbar + end drops on tablet/desktop */}
            <div className="hidden md:block w-[78%] h-6 border-t-[2.5px] border-x-[2.5px] border-[#092D50]" />
          </div>
        )}

        {/* TIER 3: BOARD MEMBERS */}
        {membersTier.length > 0 && (
          <div
            className={`w-full max-w-6xl grid gap-y-8 gap-x-5 justify-items-center ${
              membersTier.length <= 3
                ? "grid-cols-1 sm:grid-cols-3 max-w-4xl"
                : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            }`}
          >
            {membersTier.map((leader, idx) => (
              <div key={leader.name} className="relative w-full flex flex-col items-center">
                {/* Small vertical connector tick above each Tier 3 node on desktop */}
                <span
                  aria-hidden="true"
                  className="hidden md:block w-[2px] h-3 bg-[#092D50]/50 mb-1"
                />
                <OrgNode
                  leader={leader}
                  color={getAlternatingColor(idx + 1)}
                  size="md"
                  isSelected={selectedLeader.name === leader.name}
                  onSelect={setSelectedLeader}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* INTERACTIVE MEMBER PROFILE PANEL */}
      <div className="relative z-10 mt-10 rounded-xl bg-white border border-[#E5E7EB] p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
          <div className="relative h-20 w-20 shrink-0 rounded-full border-[3px] border-[#07529A] overflow-hidden bg-[#F4F6F9]">
            <Image
              src={selectedLeader.image}
              alt={selectedLeader.name}
              fill
              className="object-cover object-center"
              sizes="80px"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#092D50]">
                {selectedLeader.name}
              </h3>
              <span className="inline-flex items-center rounded-full bg-[#EAF3FC] px-2.5 py-0.5 text-[11px] font-semibold text-[#07529A]">
                {selectedLeader.role}
              </span>
            </div>
            <p className="text-xs font-medium text-[#E32620] mt-1">
              {selectedLeader.title}
            </p>
            {selectedLeader.bio && (
              <p className="mt-2.5 text-sm text-[#4B5563] leading-relaxed">
                {selectedLeader.bio}
              </p>
            )}
          </div>
          <div className="hidden lg:flex items-center gap-1 text-xs text-[#6B7280] shrink-0 self-center">
            <span>Select any member above</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </section>
  );
};
