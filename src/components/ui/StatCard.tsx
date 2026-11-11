import React from "react";

interface StatCardProps {
  value: string;
  label: string;
  description: string;
  icon?: React.ReactNode;
}

export const StatCard: React.FC<StatCardProps> = ({
  value,
  label,
  description,
  icon,
}) => {
  return (
    <div className="bg-white rounded-xl p-6 border border-slate-100 shadow-card hover:shadow-elevation transition-all duration-300 group">
      <div className="flex items-center justify-between mb-4">
        <span className="font-serif text-3xl sm:text-4xl font-extrabold text-starehe-blue-900 group-hover:text-starehe-maroon-800 transition-colors">
          {value}
        </span>
        {icon && (
          <div className="p-2.5 rounded-lg bg-starehe-blue-50 text-starehe-blue-800 group-hover:bg-starehe-maroon-50 group-hover:text-starehe-maroon-800 transition-colors">
            {icon}
          </div>
        )}
      </div>
      <h3 className="text-base font-bold text-slate-900 mb-1 tracking-tight">
        {label}
      </h3>
      <p className="text-xs text-slate-600 leading-relaxed">
        {description}
      </p>
    </div>
  );
};
