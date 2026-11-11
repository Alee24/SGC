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
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Building,
  Trophy,
} from "lucide-react";

interface NavDropdownItem {
  title: string;
  href: string;
  description: string;
  icon: React.ReactNode;
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
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
          icon: <Compass className="w-4 h-4 text-starehe-blue-700" />,
        },
        {
          title: "Story & Heritage",
          href: "/about/history",
          description: "From Dr. Geoffrey Griffin's 1990s vision to the 2005 inaugural itega.",
          icon: <BookOpen className="w-4 h-4 text-starehe-maroon-700" />,
        },
        {
          title: "Board of Trustees",
          href: "/about/trustees",
          description: "Fiduciary custodians led by Mrs. Eunice Mathu & Dr. Manu Chandaria.",
          icon: <Users className="w-4 h-4 text-starehe-gold-600" />,
        },
        {
          title: "Board of Management",
          href: "/about/management",
          description: "Strategic academic and operational oversight led by Prof. Mary Getui.",
          icon: <ShieldCheck className="w-4 h-4 text-starehe-blue-800" />,
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
          description: "Senior School Grade 10 pathways: STEM, Social Sciences & Arts.",
          icon: <BookOpen className="w-4 h-4 text-starehe-maroon-700" />,
        },
        {
          title: "Academic Departments",
          href: "/academics/departments",
          description: "Sciences, Mathematics, Languages, Humanities, and Technical Studies.",
          icon: <FileText className="w-4 h-4 text-starehe-blue-600" />,
        },
        {
          title: "KUCCPS Placement Advisory",
          href: "/academics/kuccps",
          description: "Advisory, university portal procedures, and campus IT Office support.",
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
          title: "Form 1 (The Blue Form)",
          href: "/admissions/form-one",
          description: "Criteria (<15 yrs, 1st choice), needs assessment 1-10, county quotas.",
          icon: <FileText className="w-4 h-4 text-starehe-maroon-700" />,
        },
        {
          title: "Senior School CBC (Grade 10)",
          href: "/admissions/senior-school",
          description: "CBE transition pathways and 2027 self-supported enrollment.",
          icon: <GraduationCap className="w-4 h-4 text-starehe-blue-600" />,
        },
        {
          title: "Sponsorship & Fees Policy",
          href: "/admissions/fees-aid",
          description: "Charitable full sponsorship breakdown, tuition, and zero hidden costs.",
          icon: <HeartHandshake className="w-4 h-4 text-starehe-gold-600" />,
        },
      ],
    },
    {
      label: "Student Life",
      href: "/student-life",
      dropdown: [
        {
          title: "Life at Starehe",
          href: "/student-life",
          description: "Daily routines, spiritual care, and the enduring Sisterhood tradition.",
          icon: <Users className="w-4 h-4 text-starehe-maroon-700" />,
        },
        {
          title: "Clubs & Societies",
          href: "/student-life/clubs",
          description: "Robotics, Presidential Award, Model UN, Red Cross, Journalism, Drama.",
          icon: <Sparkles className="w-4 h-4 text-starehe-gold-600" />,
        },
        {
          title: "Sports & Athletics",
          href: "/student-life/sports",
          description: "Basketball, Volleyball, Football, Athletics, Badminton, Tennis.",
          icon: <Trophy className="w-4 h-4 text-starehe-blue-700" />,
        },
        {
          title: "Campus Facilities",
          href: "/student-life/facilities",
          description: "55-acre sanctuary: Griffin Dormitory, Science Labs, Library, Grounds.",
          icon: <Building className="w-4 h-4 text-starehe-blue-600" />,
        },
        {
          title: "Photo Gallery",
          href: "/student-life/gallery",
          description: "Visual archive of student assemblies, campus grounds, and ceremonies.",
          icon: <Sparkles className="w-4 h-4 text-purple-700" />,
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
          description: "Student sponsorship, KCDF Endowment Fund, grants, and gifts in kind.",
          icon: <HeartHandshake className="w-4 h-4 text-starehe-maroon-700" />,
        },
        {
          title: "Capital Projects",
          href: "/giving/projects",
          description: "Twin Science Labs, Multipurpose Hall, 160-Bed Dormitory, Library.",
          icon: <Building className="w-4 h-4 text-starehe-blue-700" />,
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
        scrolled
          ? "shadow-elevation py-2 border-b border-slate-200/80"
          : "py-3.5 border-b border-slate-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Institutional Brand Identity */}
          <Link href="/" className="flex items-center space-x-3.5 group flex-shrink-0">
            <div className="relative w-12 h-14 md:w-14 md:h-16 flex-shrink-0">
              <Image
                src="/images/brand/logo.png"
                alt="Starehe Girls' Centre Crest"
                fill
                priority
                className="object-contain"
                sizes="(max-width: 768px) 48px, 56px"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-lg md:text-xl text-starehe-blue-950 group-hover:text-starehe-maroon-800 transition-colors tracking-tight leading-tight whitespace-nowrap">
                Starehe Girls&apos; Centre
              </span>
              <span className="text-[10px] md:text-[11px] text-starehe-maroon-800 font-bold tracking-wider uppercase whitespace-nowrap mt-0.5">
                National Girls&apos; High School
              </span>
              <span className="text-[10px] text-slate-500 font-serif italic hidden sm:block whitespace-nowrap">
                &ldquo;Elimu Yetu, Nguvu Yetu&rdquo;
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              if (item.dropdown) {
                const isOpenMenu = activeDropdown === item.label;

                return (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => setActiveDropdown(item.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button
                      className={`inline-flex items-center space-x-1 px-3 py-2 text-xs font-semibold tracking-wide uppercase transition-colors whitespace-nowrap ${
                        isActive
                          ? "text-starehe-maroon-800 border-b-2 border-starehe-maroon-800"
                          : "text-slate-700 hover:text-starehe-blue-950 hover:bg-slate-50 rounded-md"
                      }`}
                      aria-expanded={isOpenMenu}
                    >
                      <span className="whitespace-nowrap">{item.label}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          isOpenMenu ? "rotate-180 text-starehe-maroon-800" : "text-slate-400"
                        }`}
                      />
                    </button>

                    {/* Mega Dropdown Panel */}
                    {isOpenMenu && (
                      <div className="absolute top-full left-0 w-84 bg-white rounded-2xl shadow-elevation border border-slate-200/90 p-3 mt-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                        <div className="space-y-1">
                          {item.dropdown.map((subItem) => (
                            <Link
                              key={subItem.title}
                              href={subItem.href}
                              className="flex items-start p-2.5 rounded-xl hover:bg-slate-50 transition-colors group/item"
                            >
                              <div className="p-2 rounded-lg bg-slate-100 group-hover/item:bg-white group-hover/item:shadow-sm mr-3 mt-0.5 transition-all flex-shrink-0">
                                {subItem.icon}
                              </div>
                              <div>
                                <div className="text-xs font-bold text-slate-900 group-hover/item:text-starehe-maroon-800 transition-colors whitespace-nowrap">
                                  {subItem.title}
                                </div>
                                <p className="text-[11px] text-slate-500 leading-snug line-clamp-2 mt-0.5">
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
                  className={`px-3 py-2 text-xs font-semibold tracking-wide uppercase transition-colors whitespace-nowrap ${
                    isActive
                      ? "text-starehe-maroon-800 border-b-2 border-starehe-maroon-800"
                      : "text-slate-700 hover:text-starehe-blue-950 hover:bg-slate-50 rounded-md"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden lg:flex items-center space-x-3 flex-shrink-0">
            <Link
              href="/giving"
              className="inline-flex items-center space-x-1.5 text-xs font-bold text-starehe-maroon-800 hover:text-white bg-starehe-maroon-50 hover:bg-starehe-maroon-800 border border-starehe-maroon-200 hover:border-starehe-maroon-800 px-3.5 py-2 rounded-full transition-all whitespace-nowrap"
            >
              <HeartHandshake className="w-3.5 h-3.5 text-starehe-maroon-700 group-hover:text-white" />
              <span>Support a Girl</span>
            </Link>

            <Link
              href="/admissions"
              className="inline-flex items-center space-x-1.5 text-xs font-bold text-white bg-starehe-blue-950 hover:bg-starehe-blue-900 px-4 py-2 rounded-full shadow-subtle hover:shadow transition-all whitespace-nowrap border border-starehe-blue-900"
            >
              <span>Admissions</span>
              <ArrowRight className="w-3.5 h-3.5 text-starehe-gold-accent" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="xl:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-xl text-slate-800 hover:text-starehe-blue-950 hover:bg-slate-100 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-5 pt-3 pb-8 max-h-[85vh] overflow-y-auto shadow-elevation animate-in slide-in-from-top-4 duration-200">
          <div className="space-y-1">
            {navItems.map((item) => {
              if (item.dropdown) {
                const isExpanded = mobileExpanded === item.label;
                return (
                  <div key={item.label} className="border-b border-slate-100 py-1.5">
                    <button
                      onClick={() =>
                        setMobileExpanded(isExpanded ? null : item.label)
                      }
                      className="flex items-center justify-between w-full py-2 text-left font-semibold text-starehe-blue-950 text-sm"
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 transition-transform ${
                          isExpanded ? "rotate-180 text-starehe-maroon-800" : ""
                        }`}
                      />
                    </button>
                    {isExpanded && (
                      <div className="pl-3 py-2 space-y-2 bg-slate-50/80 rounded-xl my-1">
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.title}
                            href={subItem.href}
                            className="block py-1.5 text-xs font-semibold text-slate-700 hover:text-starehe-maroon-800"
                          >
                            <div>{subItem.title}</div>
                            <div className="text-[11px] text-slate-500 font-normal line-clamp-1 mt-0.5">
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
                  className="block py-3 text-sm font-semibold text-starehe-blue-950 hover:text-starehe-maroon-800 border-b border-slate-100"
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Mobile CTAs */}
          <div className="mt-6 pt-4 border-t border-slate-200 flex flex-col space-y-3">
            <Link
              href="/admissions"
              className="w-full text-center py-3 rounded-full bg-starehe-blue-950 text-white font-bold text-xs uppercase tracking-wider shadow-sm"
            >
              Admissions &amp; Blue Form
            </Link>
            <Link
              href="/giving"
              className="w-full text-center py-3 rounded-full border border-starehe-maroon-800 text-starehe-maroon-800 font-bold text-xs uppercase tracking-wider hover:bg-starehe-maroon-50"
            >
              Support a Disadvantaged Girl
            </Link>
          </div>

          <div className="mt-5 text-xs text-slate-500 text-center">
            Admissions Desk: <a href="tel:0707900852" className="text-starehe-blue-950 font-bold">0707 900 852</a>
          </div>
        </div>
      )}
    </header>
  );
};
