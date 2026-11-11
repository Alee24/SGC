import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  GraduationCap,
  HeartHandshake,
  Award,
  BookOpen,
  ArrowRight,
  Shield,
  Users,
  Building,
  CheckCircle2,
  Calendar,
  Briefcase,
  FileCheck,
  Phone,
} from "lucide-react";
import {
  SCHOOL_INFO,
  KEY_STATS,
  HISTORY_TIMELINE,
  CAPITAL_PROJECTS,
  TENDERS_LIST,
  JOB_VACANCIES,
  CLUBS_AND_SOCIETIES,
} from "@/data/school-data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatCard } from "@/components/ui/StatCard";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center justify-center bg-starehe-blue-950 overflow-hidden">
        {/* Photographic Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero/hero-students-assembly.jpg"
            alt="Starehe Girls' Centre Students Assembly on Campus"
            fill
            priority
            className="object-cover object-center opacity-30 mix-blend-luminosity scale-105"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-starehe-blue-950 via-starehe-blue-950/85 to-starehe-blue-900/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-starehe-blue-950 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 w-[92%] md:w-[90%] max-w-[1680px] mx-auto py-20 lg:py-28 text-white">
          <div className="max-w-3xl">
            {/* National School Status Pill */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-starehe-blue-900/90 border border-white/20 text-xs font-semibold text-starehe-gold-300 mb-6 shadow-sm">
              <Award className="w-4 h-4 text-starehe-gold-accent" />
              <span>Charitable Educational Institution &amp; Trust</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.15] text-white">
              Nurturing Exemplary Leaders, Transforming Society.
            </h1>

            {/* School Motto & Subhead */}
            <p className="mt-6 text-lg sm:text-xl text-slate-200 leading-relaxed font-light">
              Founded on the enduring legacy of Dr. Geoffrey Griffin and sustained
              by the doctrine of <strong className="text-white font-medium">&ldquo;The Starehe Way&rdquo;</strong>.
              Providing comprehensive holistic secondary education and full boarding
              scholarships to academically gifted girls from all 47 counties of Kenya.
            </p>

            <div className="mt-4 flex items-center space-x-2 text-starehe-gold-300 italic text-base">
              <span>Elimu Yetu, Nguvu Yetu</span>
              <span className="text-slate-400 not-italic font-normal text-xs">
                &bull; (Our Education, Our Strength)
              </span>
            </div>

            {/* Primary Action Buttons */}
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/admissions"
                className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-full bg-starehe-maroon-800 hover:bg-starehe-maroon-700 text-white font-semibold text-sm shadow-elevation hover:shadow-lg transition-all group"
              >
                <span>Admissions &amp; Blue Form</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/giving"
                className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/30 font-semibold text-sm transition-all"
              >
                <HeartHandshake className="w-4 h-4 text-starehe-gold-accent" />
                <span>Support a Cause</span>
              </Link>
              <Link
                href="/about/history"
                className="inline-flex items-center space-x-2 px-5 py-3.5 rounded-full text-slate-300 hover:text-white text-sm font-medium transition-colors"
              >
                <BookOpen className="w-4 h-4" />
                <span>Our 20-Year Heritage</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Highlights Floating Bar */}
        <div className="absolute bottom-0 left-0 right-0 transform translate-y-1/2 z-20 hidden md:block w-[92%] md:w-[90%] max-w-[1680px] mx-auto">
          <div className="bg-white rounded-2xl shadow-elevation border border-slate-100 p-6 grid grid-cols-4 gap-6">
            <div className="border-r border-slate-100 pr-4">
              <div className="font-serif text-3xl font-extrabold text-starehe-blue-950">
                800+
              </div>
              <div className="text-xs font-semibold text-slate-900 mt-0.5">
                Young Women Enrolled
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                Representing all 47 counties
              </div>
            </div>
            <div className="border-r border-slate-100 pr-4">
              <div className="font-serif text-3xl font-extrabold text-starehe-maroon-800">
                8.90 (B)
              </div>
              <div className="text-xs font-semibold text-slate-900 mt-0.5">
                2025 KCSE Mean Score
              </div>
              <div className="text-[11px] text-starehe-blue-900 font-semibold mt-0.5">
                +0.07 positive deviation
              </div>
            </div>
            <div className="border-r border-slate-100 pr-4">
              <div className="font-serif text-3xl font-extrabold text-starehe-blue-900">
                95%
              </div>
              <div className="text-xs font-semibold text-slate-900 mt-0.5">
                University Transition
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                18-year proven track record
              </div>
            </div>
            <div>
              <div className="font-serif text-3xl font-extrabold text-starehe-gold-600">
                55 Acres
              </div>
              <div className="text-xs font-semibold text-slate-900 mt-0.5">
                Serene Sanctuary
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                Bustani Estate, Njathaini
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Spacer for floating bar on desktop */}
      <div className="hidden md:block h-20 bg-slate-50" />

      {/* 2. INSTITUTIONAL WELCOME FROM LEADERSHIP */}
      <section className="py-20 bg-slate-50">
        <div className="w-[92%] md:w-[90%] max-w-[1680px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Imagery Grid */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-elevation border-4 border-white aspect-[4/3]">
                <Image
                  src="/images/leadership/director-sister-jane-soita-office.jpg"
                  alt="Director Sister Jane Soita in Office at Starehe Girls' Centre"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
              {/* Secondary badge overlay */}
              <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-elevation border border-slate-100 p-4 max-w-xs hidden sm:block">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-starehe-maroon-50 flex items-center justify-center text-starehe-maroon-800 flex-shrink-0">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">
                      Sister Jane Soita
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Director, Starehe Girls&apos; Centre
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Welcome Remarks */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-starehe-blue-50 text-starehe-blue-900 border border-starehe-blue-200 mb-4">
                Welcome Remarks from Executive Leadership
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-starehe-blue-950 leading-tight">
                An Educational Sanctuary Empowering the African Girl Child
              </h2>

              <p className="mt-5 text-base sm:text-lg text-slate-700 leading-relaxed">
                Welcome to Starehe Girls&apos; Centre. The Centre was established
                as a charitable national girls high school for bright but financially
                and socially disadvantaged students via the collective efforts of
                visionary individuals who envisioned an institution with a holistic
                educational approach.
              </p>

              <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
                Located on 55 acres of tranquil parkland in Njathaini, Kasarani, our
                community currently nurtures over 800 young women guided by 48 dedicated
                teachers and 46 support personnel. With 70% of students supported on
                full charitable sponsorships and 30% self-supported, we take profound
                pride in cultivating well-rounded leaders equipped for life.
              </p>

              {/* Pillars list */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-starehe-maroon-800 mt-1 flex-shrink-0" />
                  <span className="text-xs sm:text-sm text-slate-700 font-medium">
                    Rigorous Academic Excellence &amp; &ldquo;Operation Plus 5&rdquo;
                  </span>
                </div>
                <div className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-starehe-maroon-800 mt-1 flex-shrink-0" />
                  <span className="text-xs sm:text-sm text-slate-700 font-medium">
                    Strict Disciplinary Standard &amp; &ldquo;The Starehe Way&rdquo;
                  </span>
                </div>
                <div className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-starehe-maroon-800 mt-1 flex-shrink-0" />
                  <span className="text-xs sm:text-sm text-slate-700 font-medium">
                    Comprehensive Holistic Mentorship &amp; Psychosocial Care
                  </span>
                </div>
                <div className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-starehe-maroon-800 mt-1 flex-shrink-0" />
                  <span className="text-xs sm:text-sm text-slate-700 font-medium">
                    Structured Senior School CBC / CBE Transition
                  </span>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/about/administration"
                  className="inline-flex items-center space-x-2 text-sm font-bold text-starehe-blue-900 hover:text-starehe-maroon-800 transition-colors"
                >
                  <span>Read Full Address from the Director &amp; Principal</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <span className="text-slate-300">|</span>
                <Link
                  href="/about"
                  className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
                >
                  Our Mission &amp; Values
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ACADEMIC EXCELLENCE & OPERATION PLUS 5 */}
      <section className="py-20 bg-white border-y border-slate-200">
        <div className="w-[92%] md:w-[90%] max-w-[1680px] mx-auto">
          <SectionHeading
            badge="Academic Rigour &amp; Performance"
            title="Consistent Positive Deviation &amp; University Transition"
            description="Starehe Girls' Centre has consistently registered stellar national results, preparing young women to enter the world's most prestigious universities and profession pathways."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1: 2025 KCSE Highlights */}
            <div className="bg-slate-50 rounded-2xl p-7 border border-slate-200 shadow-subtle hover:shadow-elevation transition-all">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-starehe-maroon-800 bg-starehe-maroon-100/70 px-2.5 py-1 rounded">
                  KCSE 2025 Official Results
                </span>
                <GraduationCap className="w-5 h-5 text-starehe-maroon-700" />
              </div>
              <div className="font-serif text-4xl font-extrabold text-starehe-blue-950">
                8.90 Mean (B)
              </div>
              <p className="text-xs text-starehe-blue-900 font-bold mt-1">
                +0.07 Positive Deviation from 8.83 in 2024
              </p>
              <p className="mt-4 text-xs text-slate-600 leading-relaxed">
                Out of 187 candidates, 93% achieved a C+ and above, earning direct
                placement into public universities and overseas scholarships. Only
                7% scored C plain or below.
              </p>
              <div className="mt-5 pt-4 border-t border-slate-200 flex items-center justify-between text-xs">
                <span className="text-slate-500">2026 Target:</span>
                <span className="font-bold text-starehe-blue-900">9.50 Mean Score &amp; 100% Transition</span>
              </div>
            </div>

            {/* Card 2: Operation Plus 5 */}
            <div className="bg-starehe-blue-950 text-white rounded-2xl p-7 shadow-elevation relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-starehe-gold-accent/10 rounded-full blur-2xl pointer-events-none" />
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold tracking-wide text-starehe-gold-300 bg-white/10 px-2.5 py-1 rounded">
                  Signature Strategy
                </span>
                <Award className="w-5 h-5 text-starehe-gold-accent" />
              </div>
              <div className="font-serif text-2xl font-bold text-white">
                &ldquo;Operation Plus 5&rdquo;
              </div>
              <p className="text-xs text-starehe-gold-400 font-medium mt-1">
                Student Self-Evaluation Slogan
              </p>
              <p className="mt-4 text-xs text-slate-300 leading-relaxed">
                Every student sets a personal commitment to gain at least 5 marks
                per subject from the previous exam to jump to the next grade. The
                school actively celebrates &ldquo;Most Improved&rdquo; awards so every
                girl has the agency to triumph.
              </p>
              <div className="mt-5 pt-4 border-t border-white/10">
                <Link
                  href="/academics/performance"
                  className="text-xs font-semibold text-starehe-gold-300 hover:text-white flex items-center space-x-1"
                >
                  <span>Explore Academic Statistics</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Card 3: CBC Senior School Pathways */}
            <div className="bg-slate-50 rounded-2xl p-7 border border-slate-200 shadow-subtle hover:shadow-elevation transition-all">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-starehe-blue-800 bg-starehe-blue-100/70 px-2.5 py-1 rounded">
                  CBE Transition (Grade 10)
                </span>
                <BookOpen className="w-5 h-5 text-starehe-blue-700" />
              </div>
              <div className="font-serif text-2xl font-bold text-starehe-blue-950">
                3 Senior Pathways
              </div>
              <p className="text-xs text-slate-500 font-medium mt-1">
                Competency-Based Education Ready
              </p>
              <ul className="mt-4 space-y-2 text-xs text-slate-600">
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-starehe-maroon-700" />
                  <strong>STEM:</strong> Pure Sciences, Engineering, Robotics
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-starehe-blue-700" />
                  <strong>Social Sciences:</strong> Humanities, Business Studies
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-starehe-gold-600" />
                  <strong>Arts &amp; Sports Science:</strong> Performing Arts, Athletics
                </li>
              </ul>
              <div className="mt-5 pt-4 border-t border-slate-200">
                <Link
                  href="/academics/curriculum"
                  className="text-xs font-semibold text-starehe-blue-900 hover:text-starehe-maroon-800 flex items-center space-x-1"
                >
                  <span>Senior School Curriculum Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. HERITAGE & THE STAREHE WAY */}
      <section className="py-20 bg-starehe-blue-950 text-white relative">
        <div className="w-[92%] md:w-[90%] max-w-[1680px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Heritage Text */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-white/10 text-starehe-gold-300 border border-white/20 mb-4">
                Institutional Heritage Since 2003
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight">
                Born From Vision, Grounded in Charity: The Story of Starehe
              </h2>
              <p className="mt-5 text-sm sm:text-base text-slate-300 leading-relaxed">
                The journey to establish a sister school to the renowned Starehe Boys&apos;
                Centre began in the 1990s through the persistence of the late{" "}
                <strong className="text-white">Dr. Geoffrey William Griffin</strong>. In
                2003, Dr. Griffin rallied prominent women educationalists under{" "}
                <strong className="text-white">Prof. Eddah Gachukia</strong> and industrialist{" "}
                <strong className="text-white">Dr. Manu Chandaria</strong> to bring the dream
                to life.
              </p>
              <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
                Endowed with 55 acres of land in Njathaini bequeathed by Duncan and
                Jane Auld Gray (formerly Limuru Girls&apos; Centre), and propelled by
                Dr. Griffin&apos;s personal donation of Kshs. 20 million from donors, the
                school welcomed its first 72 pioneer girls in January 2005. On 12th February
                2005, the historic <em>itega</em> welcoming ceremony was graced by First Lady
                Mama Lucy Kibaki as Chief Guest.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/about/history"
                  className="inline-flex items-center space-x-2 px-5 py-3 rounded-full bg-starehe-gold-500 hover:bg-starehe-gold-400 text-starehe-blue-950 font-bold text-xs uppercase tracking-wider transition-colors"
                >
                  <span>Explore Archival Heritage</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/about/trustees"
                  className="inline-flex items-center space-x-2 px-5 py-3 rounded-full border border-white/30 text-white hover:bg-white/10 font-semibold text-xs tracking-wider transition-colors"
                >
                  <span>Board of Trustees</span>
                </Link>
              </div>
            </div>

            {/* Heritage Visual & Timeline Snapshot */}
            <div className="lg:col-span-5 space-y-4">
              <div className="relative rounded-2xl overflow-hidden shadow-elevation border-4 border-starehe-blue-800 aspect-[16/10]">
                <Image
                  src="/images/facilities/facilities-admin-block.jpg"
                  alt="Starehe Girls' Centre Administrative Block"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>

              {/* Milestones list */}
              <div className="bg-starehe-blue-900/60 rounded-xl p-5 border border-starehe-blue-800/80 space-y-3">
                <div className="text-xs uppercase tracking-wider text-starehe-gold-400 font-bold">
                  Key Historical Milestones
                </div>
                <div className="flex items-start space-x-3 text-xs text-slate-200">
                  <span className="font-bold text-starehe-gold-300">2003:</span>
                  <span>Registration of Starehe Girls&apos; Centre Trust.</span>
                </div>
                <div className="flex items-start space-x-3 text-xs text-slate-200">
                  <span className="font-bold text-starehe-gold-300">2004:</span>
                  <span>Dr. Griffin Kshs 20M donation; Griffin Dormitory built.</span>
                </div>
                <div className="flex items-start space-x-3 text-xs text-slate-200">
                  <span className="font-bold text-starehe-gold-300">2005:</span>
                  <span>72 pioneer girls received; inaugural Itega with First Lady Lucy Kibaki.</span>
                </div>
                <div className="flex items-start space-x-3 text-xs text-slate-200">
                  <span className="font-bold text-starehe-gold-300">Today:</span>
                  <span>800+ students, 95% university progression rate, national leader.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CAMPUS FACILITIES & ENVIRONMENT */}
      <section className="py-20 bg-slate-50">
        <div className="w-[92%] md:w-[90%] max-w-[1680px] mx-auto">
          <SectionHeading
            badge="55-Acre Sanctuary"
            title="A Serene Environment Built for Holistic Growth"
            description="Set in Njathaini, Kasarani, 18 km north of Nairobi CBD, our expansive campus provides a tranquil, secure, and technologically enabled space for intellectual, artistic, and spiritual advancement."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-subtle group hover:shadow-elevation transition-all">
              <div className="relative h-48 w-full">
                <Image
                  src="/images/facilities/facilities-aerial-campus.jpg"
                  alt="Aerial view of Starehe Girls' Centre campus"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-5">
                <h3 className="font-serif text-lg font-bold text-starehe-blue-950">
                  55-Acre Expansive Grounds
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Lush, manicured parkland featuring tree groves, vegetable farming,
                  spacious sports pitches, and quiet courtyards conducive to study.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-subtle group hover:shadow-elevation transition-all">
              <div className="relative h-48 w-full">
                <Image
                  src="/images/facilities/campus-building-front.jpg"
                  alt="Classroom and academic wings at Starehe Girls"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-5">
                <h3 className="font-serif text-lg font-bold text-starehe-blue-950">
                  Modern Academic Wings
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Equipped classrooms, science laboratories (Physics, Chemistry, Biology),
                  computer labs, and dedicated study halls for elective disciplines.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-subtle group hover:shadow-elevation transition-all">
              <div className="relative h-48 w-full">
                <Image
                  src="/images/facilities/facilities-admin-block.jpg"
                  alt="Administration block and Griffin Hall"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-5">
                <h3 className="font-serif text-lg font-bold text-starehe-blue-950">
                  Dormitories &amp; Residential Care
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Comfortable, supervised boarding facilities including the iconic Griffin
                  Dormitory Block, dining hall, dispensary, and chaplaincy support.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/student-life/facilities"
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-starehe-blue-900 hover:bg-starehe-blue-800 text-white font-semibold text-xs uppercase tracking-wider transition-colors shadow-sm"
            >
              <span>View All Campus Facilities &amp; Virtual Tour</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. SUPPORT A CAUSE / PHILANTHROPY & CAPITAL PROJECTS */}
      <section className="py-20 bg-starehe-maroon-900 text-white relative">
        <div className="w-[92%] md:w-[90%] max-w-[1680px] mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-white/10 text-starehe-gold-300 border border-white/20 mb-3">
              Giving &amp; Philanthropy
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight">
              Transforming Lives Through Charitable Partnership
            </h2>
            <p className="mt-4 text-sm sm:text-base text-starehe-maroon-100 leading-relaxed">
              70% of our students are supported through charitable sponsorships from
              individuals, corporations, and trust endowments. Together, we remove
              economic barriers so brilliance can flourish.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Pillar 1: Student Sponsorship */}
            <div className="bg-starehe-maroon-950/70 rounded-2xl p-6 border border-white/15 shadow-subtle">
              <div className="w-10 h-10 rounded-lg bg-starehe-gold-accent/20 flex items-center justify-center text-starehe-gold-300 mb-4">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl font-bold text-white mb-2">
                Student Sponsorship
              </h3>
              <p className="text-xs text-starehe-maroon-100 leading-relaxed">
                Cover the tuition, boarding, healthcare, uniform, and educational
                supplies for a high-potential girl from an impoverished background.
              </p>
              <div className="mt-5 pt-4 border-t border-white/15">
                <Link
                  href="/giving"
                  className="text-xs font-bold text-starehe-gold-300 hover:text-white flex items-center space-x-1"
                >
                  <span>Sponsor a Girl Child</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Pillar 2: Endowment Fund at KCDF */}
            <div className="bg-starehe-maroon-950/70 rounded-2xl p-6 border border-white/15 shadow-subtle">
              <div className="w-10 h-10 rounded-lg bg-starehe-gold-accent/20 flex items-center justify-center text-starehe-gold-300 mb-4">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl font-bold text-white mb-2">
                KCDF Endowment Fund
              </h3>
              <p className="text-xs text-starehe-maroon-100 leading-relaxed">
                Contribute to our permanent endowment held at the Kenya Community
                Development Foundation. The principal remains intact, generating interest
                to educate future generations.
              </p>
              <div className="mt-5 pt-4 border-t border-white/15">
                <Link
                  href="/giving"
                  className="text-xs font-bold text-starehe-gold-300 hover:text-white flex items-center space-x-1"
                >
                  <span>Endowment Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Pillar 3: Urgent Capital Infrastructure */}
            <div className="bg-starehe-maroon-950/70 rounded-2xl p-6 border border-white/15 shadow-subtle">
              <div className="w-10 h-10 rounded-lg bg-starehe-gold-accent/20 flex items-center justify-center text-starehe-gold-300 mb-4">
                <Building className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl font-bold text-white mb-2">
                Capital Infrastructure
              </h3>
              <p className="text-xs text-starehe-maroon-100 leading-relaxed">
                Support our urgent capital expansion: Twin Science Laboratories,
                Multipurpose Hall, 160-Bed Dormitory, and Library Expansion.
              </p>
              <div className="mt-5 pt-4 border-t border-white/15">
                <Link
                  href="/giving/projects"
                  className="text-xs font-bold text-starehe-gold-300 hover:text-white flex items-center space-x-1"
                >
                  <span>View Capital Campaign</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Annual Events Banner */}
          <div className="mt-12 bg-starehe-blue-950/80 rounded-2xl p-6 sm:p-8 border border-white/15 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="text-xs uppercase tracking-wider text-starehe-gold-400 font-bold mb-1">
                Annual Signature Fundraising Traditions
              </div>
              <div className="font-serif text-xl sm:text-2xl font-bold text-white">
                Join Us at the Charity Golf, Annual Walk &amp; Gala Dinner
              </div>
              <p className="text-xs text-slate-300 mt-1 max-w-2xl">
                Every year, our friends gather for the Charity Golf (March, Term 1),
                Annual Charity Walk (June, Term 2), and Annual Gala Dinner (October/November, Term 3).
              </p>
            </div>
            <Link
              href="/giving/events"
              className="flex-shrink-0 px-6 py-3 rounded-full bg-starehe-gold-accent hover:bg-starehe-gold-400 text-starehe-blue-950 font-bold text-xs uppercase tracking-wider transition-colors"
            >
              Event Calendar &amp; RSVP
            </Link>
          </div>
        </div>
      </section>

      {/* 7. ACTIVE NOTICES: TENDERS & VACANCIES */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="w-[92%] md:w-[90%] max-w-[1680px] mx-auto">
          <SectionHeading
            badge="Institutional Governance &amp; Careers"
            title="Active Tenders &amp; Professional Vacancies"
            description="In compliance with the Basic Education Act 2013 and our Trust Deed, Starehe Girls' Centre upholds transparent procurement and merit-based recruitment."
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Tenders Column */}
            <div className="bg-white rounded-2xl p-7 border border-slate-200 shadow-subtle">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2.5">
                  <FileCheck className="w-5 h-5 text-starehe-blue-900" />
                  <h3 className="font-serif text-xl font-bold text-starehe-blue-950">
                    Procurement Tenders
                  </h3>
                </div>
                <Link
                  href="/careers-tenders"
                  className="text-xs font-semibold text-starehe-maroon-800 hover:underline"
                >
                  View All Tenders
                </Link>
              </div>

              <div className="space-y-4">
                {TENDERS_LIST.slice(0, 2).map((tender) => (
                  <div
                    key={tender.id}
                    className="p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-starehe-blue-200 transition-colors"
                  >
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                      <span className="font-mono">{tender.id}</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-starehe-blue-50 text-starehe-blue-900 border border-starehe-blue-200">
                        {tender.status}
                      </span>
                    </div>
                    <div className="text-sm font-bold text-slate-900">
                      {tender.title}
                    </div>
                    <p className="text-xs text-slate-600 line-clamp-2 mt-1">
                      {tender.description}
                    </p>
                    <div className="mt-3 text-[11px] text-slate-500 flex items-center justify-between">
                      <span>Published: {tender.publishedDate}</span>
                      {tender.closingDate && (
                        <span className="font-semibold text-starehe-maroon-800">
                          Closes: {tender.closingDate}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Careers Column */}
            <div className="bg-white rounded-2xl p-7 border border-slate-200 shadow-subtle">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2.5">
                  <Briefcase className="w-5 h-5 text-starehe-maroon-800" />
                  <h3 className="font-serif text-xl font-bold text-starehe-blue-950">
                    Careers &amp; Recruitment
                  </h3>
                </div>
                <Link
                  href="/careers-tenders"
                  className="text-xs font-semibold text-starehe-maroon-800 hover:underline"
                >
                  Application Procedure
                </Link>
              </div>

              <div className="space-y-4">
                {JOB_VACANCIES.map((job) => (
                  <div
                    key={job.id}
                    className="p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-starehe-maroon-200 transition-colors"
                  >
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                      <span className="font-bold text-starehe-blue-900">
                        {job.posts} Open Post
                      </span>
                      <span className="text-starehe-maroon-800 font-semibold">
                        Deadline: {job.deadline}
                      </span>
                    </div>
                    <div className="text-sm font-bold text-slate-900">
                      {job.title}
                    </div>
                    <p className="text-xs text-slate-600 line-clamp-2 mt-1">
                      {job.description}
                    </p>
                    <div className="mt-3 flex items-center justify-between text-[11px]">
                      <span className="text-slate-500 font-mono">
                        {job.submissionEmail}
                      </span>
                      <Link
                        href="/careers-tenders"
                        className="text-starehe-blue-900 font-bold hover:underline"
                      >
                        Apply Now &rarr;
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. ADMISSIONS & BLUE FORM CALLOUT BANNER */}
      <section className="py-16 bg-starehe-blue-900 text-white border-t border-starehe-blue-800">
        <div className="w-[92%] md:w-[90%] max-w-[1680px] mx-auto">
          <div className="bg-starehe-blue-950 rounded-3xl p-8 sm:p-12 border border-starehe-blue-800 shadow-elevation relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-starehe-gold-accent/20 text-starehe-gold-300 border border-starehe-gold-accent/30 mb-4">
                Form 1 &amp; Senior School Grade 10
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight">
                Apply for Form 1 Admission via the Official Blue Form
              </h2>
              <p className="mt-4 text-sm text-slate-300 leading-relaxed">
                Starehe Girls&apos; Centre admits 200 girls annually (75% sponsored,
                25% self-supported). All candidates must be 15 years old or younger
                and select Starehe Girls&apos; as their First Choice National School.
              </p>
              <div className="mt-4 p-3 rounded-lg bg-starehe-maroon-900/60 border border-starehe-maroon-700/80 text-xs text-starehe-maroon-200">
                <strong>Crucial Integrity Notice:</strong> The official Starehe Blue
                Form application is 100% FREE and is NEVER sold under any circumstances.
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3.5 w-full sm:w-auto flex-shrink-0">
              <Link
                href="/admissions/form-one"
                className="px-8 py-4 rounded-full bg-starehe-maroon-800 hover:bg-starehe-maroon-700 text-white font-bold text-sm text-center shadow-lg transition-all"
              >
                Blue Form Application Guide
              </Link>
              <Link
                href="/admissions"
                className="px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-sm text-center border border-white/20 transition-all"
              >
                Senior School (CBE) Details
              </Link>
              <a
                href="tel:0707900852"
                className="text-xs text-center text-starehe-gold-300 hover:text-white transition-colors"
              >
                Admissions Desk: 0707 900 852
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
