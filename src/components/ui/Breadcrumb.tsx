import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav aria-label="Breadcrumb" className="py-1.5 bg-slate-100/80 border-b border-slate-200">
      <div className="w-[92%] md:w-[90%] max-w-[1680px] mx-auto flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-[11px] text-slate-600">
        <Link
          href="/"
          className="flex items-center space-x-1 hover:text-starehe-blue-900 transition-colors"
        >
          <Home className="w-3 h-3 text-slate-500" />
          <span>Home</span>
        </Link>
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <React.Fragment key={idx}>
              <ChevronRight className="w-2.5 h-2.5 text-slate-400" />
              {isLast || !item.href ? (
                <span className="font-semibold text-starehe-blue-950 truncate max-w-xs sm:max-w-md">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="hover:text-starehe-blue-900 transition-colors truncate max-w-xs sm:max-w-md"
                >
                  {item.label}
                </Link>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </nav>
  );
};
