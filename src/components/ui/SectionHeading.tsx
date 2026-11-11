import React from "react";

interface SectionHeadingProps {
  badge?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  theme?: "light" | "dark";
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badge,
  title,
  description,
  align = "center",
  theme = "light",
  className = "",
}) => {
  const isCenter = align === "center";
  const isDark = theme === "dark";

  return (
    <div
      className={`max-w-3xl ${
        isCenter ? "mx-auto text-center" : "text-left"
      } mb-12 ${className}`}
    >
      {badge && (
        <div
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase mb-3 ${
            isDark
              ? "bg-starehe-gold-accent/20 text-starehe-gold-300 border border-starehe-gold-accent/30"
              : "bg-starehe-maroon-50 text-starehe-maroon-800 border border-starehe-maroon-200"
          }`}
        >
          {badge}
        </div>
      )}
      <h2
        className={`font-serif text-3xl sm:text-4xl lg:text-4xl font-bold tracking-tight leading-tight ${
          isDark ? "text-white" : "text-starehe-blue-950"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-base sm:text-lg leading-relaxed ${
            isDark ? "text-slate-300" : "text-slate-600"
          }`}
        >
          {description}
        </p>
      )}
      <div
        className={`w-16 h-1 mt-5 rounded-full ${
          isCenter ? "mx-auto" : ""
        } ${isDark ? "bg-starehe-gold-accent" : "bg-starehe-maroon-800"}`}
      />
    </div>
  );
};
