"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ChevronDown,
  GraduationCap,
  HeartHandshake,
  BookOpen,
  Users,
  Compass,
  FileText,
  PhoneCall,
  Sparkles,
} from "lucide-react";

interface NavDropdownItem {
  title: string;
  href: string;
  description: string;
  icon?: React.ReactNode;
}

interface NavItem {
  label: string;
  href: string;
  dropdown?: NavDropdownItem[];
}

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  const navItems: NavItem[] = [
    {
      label: "About Us",
      href: "/about",
      dropdown: [
        {
          title: "About the Centre",
          href: "/about",
          description: "Mission, vision, motto, and the core doctrine of 'The Starehe Way'.",
          icon: <Compass className="w-4 h-4 text-starehe-maroon-700" />,
        },
        {
          title: "Story & Heritage",
          href: "/about/history",
          description: "From Dr. Geoffrey Griffin's 1990s vision to the 2005 pioneer intake.",
          icon: <BookOpen className="w-4 h-4 text-starehe-blue-700" />,
        },
        {
          title: "Board of Trustees",
          href: "/about/trustees",
          description: "Custodians of governance led by Mrs. Eunice Mathu & Dr. Manu Chandaria.",
          icon: <Users className="w-4 h-4 text-starehe-gold-600" />,
        },
        {
          title: "Board of Management",
          href: "/about/management",
          description: "Strategic academic and operational oversight led by Prof. Mary Getui.",
          icon: <Users className="w-4 h-4 text-starehe-blue-600" />,
        },
        {
          title: "Administration & Principal",
          href: "/about/administration",
          description: "Executive leadership of Director Sr. Jane Soita & Principal Beatrice Shirao.",
          icon: <GraduationCap className="w-4 h-4 text-starehe-maroon-600" />,
        },
      ],
    },
    {
      label: "Academics",
      href: "/academics",
      dropdown: [
        {
          title: "Academic Excellence Hub",
          href: "/academics",
          description: "Holistic academic ethos, teacher mentorship, and faculty philosophy.",
          icon: <GraduationCap className="w-4 h-4 text-starehe-blue-700" />,
        },
        {
          title: "KCSE Performance",
          href: "/academics/performance",
          description: "2025 Mean Score 8.90 (B) positive deviation and 'Operation Plus 5'.",
          icon: <Sparkles className="w-4 h-4 text-starehe-gold-600" />,
        },
        {
          title: "Curriculum & CBC Transition",
          href: "/academics/curriculum",
          description: "8-4-4 transition into Senior School STEM, Social Sciences & Arts.",
          icon: <BookOpen className="w-4 h-4 text-starehe-maroon-700" />,
        },
        {
          title: "Departments",
          href: "/academics/departments",
          description: "Sciences, Mathematics, Languages, Humanities, and Technical Studies.",
          icon: <FileText className="w-4 h-4 text-starehe-blue-600" />,
        },
        {
          title: "KUCCPS University Placement",
          href: "/academics/kuccps",
          description: "Career advisory, university portal guidance, and TVET placement.",
          icon: <Compass className="w-4 h-4 text-starehe-gold-700" />,
        },
      ],
    },
    {
      label: "Admissions",
      href: "/admissions",
      dropdown: [
        {
          title: "Admissions Overview",
          href: "/admissions",
          description: "How 200 girls are admitted annually (75% sponsored, 25% self-supported).",
          icon: <Compass className="w-4 h-4 text-starehe-blue-700" />,
        },
        {
          title: "Form 1 Admission & Blue Form",
          href: "/admissions/form-one",
          description: "Eligibility criteria (<15 yrs, 1st choice), needs score 1-10, county quotas.",
          icon: <FileText className="w-4 h-4 text-starehe-maroon-700" />,
        },
        {
          title: "Senior School CBC (Grade 10)",
          href: "/admissions/senior-school",
          description: "2026/2027 Grade 10 CBE transition criteria and pathway placement.",
          icon: <GraduationCap className="w-4 h-4 text-starehe-blue-600" />,
        },
        {
          title: "Sponsorship & Fees Policy",
          href: "/admissions/fees-aid",
          description: "Comprehensive charitable support, free application policy, and aid.",
          icon: <HeartHandshake className="w-4 h-4 text-starehe-gold-600" />,
        },
      ],
    },
    {
      label: "Student Life",
      href: "/student-life",
      dropdown: [
        {
          title: "Student Life & Sisterhood",
          href: "/student-life",
          description: "Holistic character cultivation, spiritual nourishment, and daily routines.",
          icon: <Users className="w-4 h-4 text-starehe-maroon-700" />,
        },
        {
          title: "Clubs & Societies",
          href: "/student-life/clubs",
          description: "Robotics, Presidential Award, Model UN, Red Cross, Journalism & Drama.",
          icon: <Sparkles className="w-4 h-4 text-starehe-gold-600" />,
        },
        {
          title: "Sports & Athletics",
          href: "/student-life/sports",
          description: "Basketball, Volleyball, Football, Athletics, Badminton, and Tennis.",
          icon: <Compass className="w-4 h-4 text-starehe-blue-700" />,
        },
        {
          title: "Campus Facilities",
          href: "/student-life/facilities",
          description: "55-acre sanctuary: Griffin Dormitory, Science Labs, Library, Playing Fields.",
          icon: <BookOpen className="w-4 h-4 text-starehe-blue-600" />,
        },
        {
          title: "Photo Gallery",
          href: "/student-life/gallery",
          description: "High-resolution photo collection of campus life and ceremonies.",
          icon: <Sparkles className="w-4 h-4 text-starehe-gold-600" />,
        },
      ],
    },
    {
      label: "Support a Cause",
      href: "/giving",
      dropdown: [
        {
          title: "Ways to Give",
          href: "/giving",
          description: "Student sponsorship, Endowment Fund at KCDF, and gifts in kind.",
          icon: <HeartHandshake className="w-4 h-4 text-starehe-maroon-700" />,
        },
        {
          title: "Capital Projects",
          href: "/giving/projects",
          description: "Multipurpose Hall, Twin Science Labs, Library Extension & Dormitory.",
          icon: <BookOpen className="w-4 h-4 text-starehe-blue-700" />,
        },
        {
          title: "Annual Charity Events",
          href: "/giving/events",
          description: "Charity Golf (March), Charity Walk (June), Gala Dinner (October).",
          icon: <Sparkles className="w-4 h-4 text-starehe-gold-600" />,
        },
      ],
    },
    {
      label: "Careers & Tenders",
      href: "/careers-tenders",
    },
    {
      label: "Contact",
      href: "/contact",
    },
  ];

  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-all duration-300 ${
        scrolled ? "shadow-elevation py-2" : "py-3 border-b border-slate-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo & Title */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative w-12 h-14 md:w-14 md:h-16 flex-shrink-0">
              <Image
                src="/images/brand/logo.png"
                alt="Starehe Girls' Centre Logo"
                fill
                priority
                className="object-contain"
                sizes="(max-width: 768px) 48px, 56px"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-lg md:text-xl text-starehe-blue-900 group-hover:text-starehe-maroon-800 transition-colors tracking-tight leading-snug">
                Starehe Girls&apos; Centre
              </span>
              <span className="text-[11px] md:text-xs text-starehe-maroon-800 font-semibold tracking-wider uppercase">
                National Girls&apos; High School
              </span>
              <span className="text-[10px] text-slate-500 italic hidden sm:block">
                &ldquo;Elimu Yetu, Nguvu Yetu&rdquo;
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              if (item.dropdown) {
                return (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => setActiveDropdown(item.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button
                      className={`flex items-center space-x-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                        isActive
                          ? "text-starehe-maroon-800 font-semibold bg-starehe-maroon-50"
                          : "text-slate-700 hover:text-starehe-blue-900 hover:bg-slate-50"
                      }`}
                      aria-expanded={activeDropdown === item.label}
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          activeDropdown === item.label ? "rotate-180 text-starehe-maroon-700" : ""
                        }`}
                      />
                    </button>

                    {/* Mega Dropdown Panel */}
                    {activeDropdown === item.label && (
                      <div className="absolute top-full left-0 w-80 bg-white rounded-lg shadow-elevation border border-slate-100 p-2 mt-1 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                        <div className="space-y-1">
                          {item.dropdown.map((subItem) => (
                            <Link
                              key={subItem.title}
                              href={subItem.href}
                              className="flex items-start p-2.5 rounded-md hover:bg-slate-50 transition-colors group"
                            >
                              <div className="p-1.5 rounded-md bg-slate-100 group-hover:bg-white group-hover:shadow-sm mr-3 mt-0.5 transition-all">
                                {subItem.icon}
                              </div>
                              <div>
                                <div className="text-sm font-semibold text-slate-900 group-hover:text-starehe-maroon-800 transition-colors">
                                  {subItem.title}
                                </div>
                                <p className="text-xs text-slate-500 leading-snug line-clamp-2 mt-0.5">
                                  {subItem.description}
                                </p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? "text-starehe-maroon-800 font-semibold bg-starehe-maroon-50"
                      : "text-slate-700 hover:text-starehe-blue-900 hover:bg-slate-50"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center space-x-3">
            <Link
              href="/giving"
              className="inline-flex items-center space-x-1.5 text-xs font-semibold text-starehe-maroon-800 hover:text-starehe-maroon-900 border border-starehe-maroon-200 hover:border-starehe-maroon-400 px-3.5 py-2 rounded-full transition-all"
            >
              <HeartHandshake className="w-3.5 h-3.5 text-starehe-maroon-700" />
              <span>Support a Girl</span>
            </Link>
            <Link
              href="/admissions"
              className="inline-flex items-center space-x-1.5 text-xs font-semibold text-white bg-starehe-blue-900 hover:bg-starehe-blue-800 px-4 py-2 rounded-full shadow-sm hover:shadow transition-all"
            >
              <span>Admissions</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-slate-700 hover:text-starehe-blue-900 hover:bg-slate-100 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 max-h-[85vh] overflow-y-auto shadow-elevation animate-in slide-in-from-top-4 duration-200">
          <div className="space-y-1">
            {navItems.map((item) => {
              if (item.dropdown) {
                const isExpanded = mobileExpanded === item.label;
                return (
                  <div key={item.label} className="border-b border-slate-100 py-1">
                    <button
                      onClick={() =>
                        setMobileExpanded(isExpanded ? null : item.label)
                      }
                      className="flex items-center justify-between w-full py-2 text-left font-medium text-slate-800"
                    >
                      <span className="text-base font-semibold text-starehe-blue-950">
                        {item.label}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-500 transition-transform ${
                          isExpanded ? "rotate-180 text-starehe-maroon-700" : ""
                        }`}
                      />
                    </button>
                    {isExpanded && (
                      <div className="pl-3 py-1 space-y-2 bg-slate-50/70 rounded-md">
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.title}
                            href={subItem.href}
                            className="block py-1.5 text-sm font-medium text-slate-700 hover:text-starehe-maroon-800"
                          >
                            <div className="font-semibold">{subItem.title}</div>
                            <div className="text-xs text-slate-500 line-clamp-1">
                              {subItem.description}
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className="block py-2.5 text-base font-semibold text-starehe-blue-950 hover:text-starehe-maroon-800 border-b border-slate-100"
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Mobile CTAs */}
          <div className="mt-5 pt-4 border-t border-slate-200 flex flex-col space-y-2.5">
            <Link
              href="/admissions"
              className="w-full text-center py-2.5 rounded-lg bg-starehe-blue-900 text-white font-semibold text-sm shadow-sm"
            >
              Enroll / Form 1 Admissions
            </Link>
            <Link
              href="/giving"
              className="w-full text-center py-2.5 rounded-lg border border-starehe-maroon-700 text-starehe-maroon-800 font-semibold text-sm hover:bg-starehe-maroon-50"
            >
              Support a Disadvantaged Girl
            </Link>
          </div>

          <div className="mt-4 pt-3 text-xs text-slate-500 text-center">
            Hotlines: <a href="tel:0707900852" className="text-starehe-blue-900 font-medium">0707 900 852</a> / <a href="tel:0738255448" className="text-starehe-blue-900 font-medium">0738 255 448</a>
          </div>
        </div>
      )}
    </header>
  );
};
