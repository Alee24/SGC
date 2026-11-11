"use client";

import React, { useState, useEffect, useRef } from "react";
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
  Award,
  ArrowRight,
  ShieldCheck,
  Building,
  Trophy,
  Calendar,
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
  const navRef = useRef<HTMLElement | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openDropdown = (label: string) => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setActiveDropdown(label);
  };

  const scheduleCloseDropdown = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }
    closeTimerRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 180);
  };

  const closeDropdownImmediately = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setActiveDropdown(null);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        closeDropdownImmediately();
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeDropdownImmediately();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    setIsOpen(false);
    closeDropdownImmediately();
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
          title: "Administration",
          href: "/about/administration",
          description: "Executive leadership & welcome remarks from Director Sr. Jane Soita.",
          icon: <Building className="w-4 h-4 text-starehe-blue-700" />,
        },
        {
          title: "Principal's Desk",
          href: "/about/principal",
          description: "Welcome address, 'Operation Plus 5' and KCSE performance by Beatrice Shirao.",
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
          icon: <Award className="w-4 h-4 text-starehe-gold-600" />,
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
          title: "Apply for Grade 10 (Online & PDF)",
          href: "/admissions/apply",
          description: "Complete Senior School admission form & download official 4-page PDF.",
          icon: <FileText className="w-4 h-4 text-starehe-maroon-800" />,
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
          icon: <Compass className="w-4 h-4 text-starehe-maroon-700" />,
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
          icon: <Compass className="w-4 h-4 text-starehe-blue-700" />,
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
          icon: <Calendar className="w-4 h-4 text-starehe-gold-600" />,
        },
      ],
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
      <div className="w-[92%] md:w-[90%] max-w-[1680px] mx-auto">
        <div className="flex items-center justify-between gap-2 xl:gap-3 min-w-0">
          {/* Institutional Brand Identity */}
          <Link href="/" className="flex items-center space-x-2.5 xl:space-x-3 group flex-shrink-0 min-w-0">
            <div className="relative w-10 h-11 sm:w-11 sm:h-12 2xl:w-12 2xl:h-14 flex-shrink-0">
              <Image
                src="/images/brand/logo.png"
                alt="Starehe Girls' Centre Crest"
                fill
                priority
                className="object-contain"
                sizes="(max-width: 768px) 40px, 48px"
              />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-serif font-bold text-base sm:text-lg xl:text-[17px] 2xl:text-xl text-starehe-blue-950 group-hover:text-brand-primary transition-colors tracking-tight leading-tight whitespace-nowrap">
                Starehe Girls&apos; Centre
              </span>
              <span className="text-[10px] sm:text-[11px] text-slate-500 font-serif italic whitespace-nowrap mt-0.5">
                &ldquo;Elimu Yetu, Nguvu Yetu&rdquo;
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav ref={navRef} className="hidden xl:flex items-center gap-1 2xl:gap-2 flex-shrink-0">
            {navItems.map((item, idx) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              if (item.dropdown) {
                const isOpenMenu = activeDropdown === item.label;
                const alignRight = idx >= 4;

                return (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => openDropdown(item.label)}
                    onMouseLeave={scheduleCloseDropdown}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        isOpenMenu
                          ? closeDropdownImmediately()
                          : openDropdown(item.label)
                      }
                      className={`inline-flex items-center space-x-1 px-2 2xl:px-3 py-1.5 2xl:py-2 text-[11.5px] 2xl:text-xs font-semibold tracking-wide transition-colors whitespace-nowrap ${
                        isActive || isOpenMenu
                          ? "text-brand-secondary border-b-2 border-brand-secondary"
                          : "text-brand-navy hover:text-brand-primary hover:bg-brand-primaryLight rounded-md"
                      }`}
                      aria-haspopup="true"
                      aria-expanded={isOpenMenu}
                    >
                      <span className="whitespace-nowrap">{item.label}</span>
                      <ChevronDown
                        className={`w-3 h-3 2xl:w-3.5 2xl:h-3.5 transition-transform duration-200 ${
                          isOpenMenu ? "rotate-180 text-starehe-maroon-800" : "text-slate-400"
                        }`}
                      />
                    </button>

                    {/* Mega Dropdown Panel with seamless pt-2 hover bridge (no gap) */}
                    {isOpenMenu && (
                      <div
                        className={`absolute top-full pt-2 z-50 ${
                          alignRight ? "right-0 2xl:left-0 2xl:right-auto" : "left-0"
                        }`}
                        onMouseEnter={() => openDropdown(item.label)}
                        onMouseLeave={scheduleCloseDropdown}
                      >
                        <div
                          role="menu"
                          className="w-[340px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-elevation border border-slate-200/90 p-3 animate-in fade-in slide-in-from-top-1 duration-150"
                        >
                          <div className="space-y-1">
                            {item.dropdown.map((subItem) => (
                              <Link
                                key={subItem.title}
                                href={subItem.href}
                                role="menuitem"
                                onClick={closeDropdownImmediately}
                                className="flex items-start p-2.5 rounded-xl hover:bg-brand-primaryLight transition-colors group/item"
                              >
                                <div className="p-2 rounded-lg bg-slate-50 group-hover/item:bg-white group-hover/item:shadow-sm mr-3 mt-0.5 transition-all flex-shrink-0">
                                  {subItem.icon}
                                </div>
                                <div>
                                  <div className="text-xs font-bold text-brand-navy group-hover/item:text-brand-primary transition-colors whitespace-nowrap">
                                    {subItem.title}
                                  </div>
                                  <p className="text-[11px] text-brand-textSecondary leading-snug line-clamp-2 mt-0.5">
                                    {subItem.description}
                                  </p>
                                </div>
                              </Link>
                            ))}
                          </div>
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
                  className={`px-2 2xl:px-3 py-1.5 2xl:py-2 text-[11.5px] 2xl:text-xs font-semibold tracking-wide transition-colors whitespace-nowrap ${
                    isActive
                      ? "text-brand-secondary border-b-2 border-brand-secondary"
                      : "text-brand-navy hover:text-brand-primary hover:bg-brand-primaryLight rounded-md"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Action CTAs */}
          <div className="hidden xl:flex items-center gap-2 2xl:gap-2.5 flex-shrink-0">
            <Link
              href="/giving"
              className="group inline-flex items-center space-x-1.5 text-[11.5px] 2xl:text-xs font-bold text-white bg-brand-secondary hover:bg-brand-secondaryHover px-3 2xl:px-3.5 py-1.5 2xl:py-2 rounded-full transition-all whitespace-nowrap shadow-subtle"
            >
              <HeartHandshake className="w-3.5 h-3.5 text-white transition-colors flex-shrink-0" />
              <span>Support a Girl</span>
            </Link>

            <Link
              href="/admissions"
              className="inline-flex items-center space-x-1.5 text-[11.5px] 2xl:text-xs font-bold text-white bg-brand-primary hover:bg-brand-primaryHover px-3 2xl:px-4 py-1.5 2xl:py-2 rounded-full shadow-subtle hover:shadow transition-all whitespace-nowrap"
            >
              <span>Admissions</span>
              <ArrowRight className="w-3.5 h-3.5 text-white flex-shrink-0" />
            </Link>
          </div>

          {/* Mobile & Tablet Actions */}
          <div className="xl:hidden flex items-center gap-2 flex-shrink-0">
            <Link
              href="/admissions"
              className="hidden sm:inline-flex items-center space-x-1.5 text-xs font-bold text-white bg-brand-primary hover:bg-brand-primaryHover px-3.5 py-1.5 rounded-full shadow-subtle whitespace-nowrap"
            >
              <span>Admissions</span>
              <ArrowRight className="w-3.5 h-3.5 text-white" />
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl text-slate-800 hover:text-starehe-blue-950 hover:bg-slate-100 transition-colors"
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
          <div className="mt-6 pt-4 border-t border-brand-border flex flex-col space-y-3">
            <Link
              href="/admissions"
              className="w-full text-center py-3 rounded-full bg-brand-primary hover:bg-brand-primaryHover text-white font-semibold text-xs tracking-wide shadow-sm transition-colors"
            >
              Admissions &amp; Blue Form
            </Link>
            <Link
              href="/giving"
              className="w-full text-center py-3 rounded-full bg-brand-secondary hover:bg-brand-secondaryHover text-white font-semibold text-xs tracking-wide transition-colors"
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
