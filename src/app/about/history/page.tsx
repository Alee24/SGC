import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { EditorialPageLayout, SidebarLink, FactItem } from "@/components/layout/EditorialPageLayout";
import { HISTORY_TIMELINE } from "@/data/school-data";
import { BookOpen, Calendar, Award, Heart, CheckCircle2, Quote, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Story of Starehe Girls' Centre | History & Heritage",
  description:
    "The official historical archive of Starehe Girls' Centre: from Dr. Geoffrey Griffin's 1990s vision and the 55-acre Limuru bequest to the 2005 inaugural itega ceremony with First Lady Mama Lucy Kibaki.",
};

export default function HistoryPage() {
  const sidebarLinks: SidebarLink[] = [
    { label: "Story & Heritage", href: "/about/history", active: true },
    { label: "About the Centre", href: "/about" },
    { label: "Board of Trustees", href: "/about/trustees" },
    { label: "Board of Management", href: "/about/management" },
    { label: "Administration & Principal", href: "/about/administration" },
  ];

  const heroFacts: FactItem[] = [
    { label: "Trust Registered", value: "2003" },
    { label: "Pioneer Intake", value: "Jan 2005 (72 Girls)" },
    { label: "Land Bequest", value: "55 Acres (Njathaini)" },
    { label: "Griffin Endowment", value: "Kshs. 20 Million" },
  ];

  return (
    <EditorialPageLayout
      breadcrumbs={[
        { label: "About Us", href: "/about" },
        { label: "History & Heritage" },
      ]}
      kicker="Archival Heritage • Founded 2003 / 2005"
      title="The Story of Starehe Girls' Centre"
      description="From an enduring vision conceived in the 1990s to an acclaimed national centre of excellence nurturing over 800 young women in Nairobi, Kenya."
      heroFacts={heroFacts}
      sidebarTitle="About Starehe"
      sidebarLinks={sidebarLinks}
    >
      <div className="space-y-10 text-slate-700">
        {/* Editorial Lead Paragraph */}
        <div className="border-b border-slate-100 pb-8">
          <p className="font-serif text-lg sm:text-xl text-slate-900 leading-relaxed font-normal italic">
            &ldquo;The journey to establish a sister institution to the celebrated Starehe
            Boys&apos; Centre began with a solemn conviction: that academically gifted girls
            born into dire poverty across Kenya deserved an equal sanctuary of discipline,
            love, and transformative secondary education.&rdquo;
          </p>
        </div>

        {/* Section 1: Conception and Foundational Vision */}
        <section className="space-y-4">
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-starehe-maroon-800">
            <span className="w-2 h-2 rounded-full bg-starehe-maroon-800" />
            <span>The Genesis</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-starehe-blue-950 tracking-tight">
            Conception and Foundational Vision
          </h2>

          <p className="text-sm sm:text-base leading-relaxed">
            The journey of starting a girls&apos; school to complement the celebrated Starehe
            Boys&apos; Centre started in the 1990s with several efforts put forth by the Co-Founder
            and Director of Starehe Boys&apos; Centre, the late <strong>Dr. Geoffrey William Griffin</strong>.
            While Dr. Griffin focused on helping boys, he also personally sponsored a few girls—some
            of whom were sisters of boys at Starehe Boys&apos; Centre—in secondary schools across Kenya.
          </p>

          <p className="text-sm sm:text-base leading-relaxed">
            These efforts began to bear substantial fruit in 2003 when Dr. Geoffrey Griffin encouraged
            a team of prominent women educationalists under the leadership of renowned educator,{" "}
            <strong>Prof. Eddah Gachukia</strong>, to make the dream of Starehe Girls&apos; Centre a
            reality in his lifetime. The Starehe Girls&apos; Centre Trust was officially registered in
            2003 with the following registered trustees:
          </p>

          {/* First Registered Trustees Card */}
          <div className="my-6 p-6 rounded-2xl bg-slate-50 border border-slate-200">
            <h3 className="font-serif text-xs font-bold text-starehe-blue-950 uppercase tracking-wider mb-4 flex items-center justify-between">
              <span>First Registered Trustees (2003)</span>
              <Award className="w-4 h-4 text-starehe-gold-accent" />
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
              <div className="flex items-center space-x-2.5 p-2 rounded-lg bg-white border border-slate-100">
                <span className="w-2 h-2 rounded-full bg-starehe-maroon-700 flex-shrink-0" />
                <span><strong>Dr. Manu Chandaria</strong> (1st Board Chairman)</span>
              </div>
              <div className="flex items-center space-x-2.5 p-2 rounded-lg bg-white border border-slate-100">
                <span className="w-2 h-2 rounded-full bg-starehe-maroon-700 flex-shrink-0" />
                <span><strong>Dr. Geoffrey William Griffin</strong> (Co-Founder)</span>
              </div>
              <div className="flex items-center space-x-2.5 p-2 rounded-lg bg-white border border-slate-100">
                <span className="w-2 h-2 rounded-full bg-starehe-maroon-700 flex-shrink-0" />
                <span><strong>Prof. Eddah Gachukia</strong> (Founding Trustee)</span>
              </div>
              <div className="flex items-center space-x-2.5 p-2 rounded-lg bg-white border border-slate-100">
                <span className="w-2 h-2 rounded-full bg-starehe-maroon-700 flex-shrink-0" />
                <span><strong>Ms. Raychelle Omamo</strong> (Trustee)</span>
              </div>
              <div className="flex items-center space-x-2.5 p-2 rounded-lg bg-white border border-slate-100">
                <span className="w-2 h-2 rounded-full bg-starehe-maroon-700 flex-shrink-0" />
                <span><strong>Prof. Wanjiku Kabira</strong> (Trustee)</span>
              </div>
              <div className="flex items-center space-x-2.5 p-2 rounded-lg bg-white border border-slate-100">
                <span className="w-2 h-2 rounded-full bg-starehe-maroon-700 flex-shrink-0" />
                <span><strong>Mrs. Eunice Mathu</strong> (Current Board Chair)</span>
              </div>
              <div className="flex items-center space-x-2.5 p-2 rounded-lg bg-white border border-slate-100">
                <span className="w-2 h-2 rounded-full bg-starehe-maroon-700 flex-shrink-0" />
                <span><strong>Mrs. Margery Kabuya</strong> (Trustee)</span>
              </div>
              <div className="flex items-center space-x-2.5 p-2 rounded-lg bg-white border border-slate-100">
                <span className="w-2 h-2 rounded-full bg-starehe-maroon-700 flex-shrink-0" />
                <span><strong>Mrs. Lucy Gitonga</strong> (Trustee)</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: The 55-Acre Sanctuary at Njathaini */}
        <section className="space-y-4 pt-4 border-t border-slate-100">
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-starehe-blue-900">
            <span className="w-2 h-2 rounded-full bg-starehe-blue-900" />
            <span>The Campus Setting</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-starehe-blue-950 tracking-tight">
            The 55-Acre Sanctuary in Njathaini
          </h2>

          <p className="text-sm sm:text-base leading-relaxed">
            The Centre&apos;s campus is set on 55 acres of land in Njathaini, a serene setting
            in Roysambu Constituency, 18 kilometres north of Nairobi and five kilometres off
            Kiambu Road. This property had originally been bequeathed to the Limuru Girls&apos;
            Centre by a philanthropic farming couple, <strong>Mr. Duncan Gray and Mrs. Jane Auld Gray</strong>,
            specifically for furthering girls&apos; education.
          </p>

          <p className="text-sm sm:text-base leading-relaxed">
            Limuru Girls&apos; Centre ceased operations in 2002 following 20 years of successful
            training of young women in garment making, beekeeping, farming activities, and other
            life skills. The Trustees of Limuru Girls&apos; Centre—headed by Dr. Manu Chandaria,
            Mr. Eliud Njoroge, Mr. Jeffrey Robin Mein, Dr. Eddah Gachukia, and Mrs. Lucy Gitonga—agreed
            after extensive consultations to transfer the prime 55-acre parcel to Starehe Girls&apos;
            Centre since its mission was to continue the sacred mandate of girl-child empowerment.
          </p>

          {/* Archival Campus Photo */}
          <div className="my-6 rounded-2xl overflow-hidden border border-slate-200 shadow-subtle group">
            <div className="relative h-72 sm:h-96 w-full bg-slate-100">
              <Image
                src="/images/facilities/facilities-admin-block.jpg"
                alt="Central Administration Building and Quadrangle at Starehe Girls' Centre"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 1024px) 100vw, 750px"
              />
            </div>
            <div className="p-4 bg-slate-50 border-t border-slate-100 text-xs text-slate-600 flex items-center justify-between">
              <span>The historic administration block and quadrangle, Njathaini, Nairobi.</span>
              <span className="font-mono text-slate-400">Campus Archive</span>
            </div>
          </div>
        </section>

        {/* Section 3: Dr. Griffin Donation & The Inaugural Itega (2005) */}
        <section className="space-y-4 pt-4 border-t border-slate-100">
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-starehe-gold-700">
            <span className="w-2 h-2 rounded-full bg-starehe-gold-600" />
            <span>Pioneer Opening</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-starehe-blue-950 tracking-tight">
            Dr. Griffin&apos;s Donation &amp; The Historic &ldquo;Itega&rdquo; Ceremony
          </h2>

          <p className="text-sm sm:text-base leading-relaxed">
            Over the years, Dr. Geoffrey William Griffin had accumulated a total of{" "}
            <strong>Kshs. 20 million from generous donors</strong> specifically earmarked for
            girls&apos; education. He donated this entire sum to Starehe Girls&apos; Centre,
            which was used to build the first modern dormitory block named in his honor—the iconic
            Griffin Dormitory Block.
          </p>

          <p className="text-sm sm:text-base leading-relaxed">
            In <strong>January 2005</strong>, 72 young students from disadvantaged backgrounds
            joined the school as pioneer scholars. On <strong>12th February 2005</strong>, a welcoming
            party dubbed <em>itega</em> was held to officially welcome the first 72 girls.
          </p>

          {/* Historical Quote Block */}
          <div className="my-6 p-6 sm:p-8 rounded-2xl bg-starehe-blue-950 text-white relative overflow-hidden shadow-elevation">
            <div className="absolute top-4 right-4 text-white/10 pointer-events-none">
              <Quote className="w-20 h-20" />
            </div>
            <div className="relative z-10 space-y-3">
              <p className="font-serif italic text-base sm:text-lg leading-relaxed text-slate-200">
                &ldquo;This inaugural ceremony was graced by the First Lady Mama Lucy Kibaki,
                who was the Guest of Honour. The historic function was attended by the late
                Dr. Geoffrey William Griffin who expressed his profound happiness at seeing his
                lifelong dream of starting the girls&apos; school become a reality in his lifetime.
                Dr. Griffin sadly passed away soon after that joyous event.&rdquo;
              </p>
              <div className="pt-2 text-xs text-starehe-gold-300 font-bold uppercase tracking-wider">
                — Official Starehe Girls&apos; Centre Institutional Archive (February 12, 2005)
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Chronological Milestone Roadmap */}
        <section className="space-y-6 pt-4 border-t border-slate-100">
          <h2 className="font-serif text-2xl font-bold text-starehe-blue-950 tracking-tight">
            Two Decades of Excellence: Milestone Timeline
          </h2>

          <div className="relative pl-6 border-l-2 border-starehe-blue-900/30 space-y-8">
            {HISTORY_TIMELINE.map((item, idx) => (
              <div key={idx} className="relative group">
                <span className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-starehe-maroon-800 ring-4 ring-white" />
                <span className="text-xs font-mono font-bold text-starehe-maroon-800 uppercase tracking-wider">
                  {item.year}
                </span>
                <h3 className="font-serif text-lg font-bold text-starehe-blue-950 mt-1">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer Navigation within Article */}
        <div className="pt-8 border-t border-slate-200 flex flex-wrap gap-4 items-center justify-between">
          <Link
            href="/about/trustees"
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-starehe-blue-950 hover:bg-starehe-blue-900 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
          >
            <span>Meet the Board of Trustees</span>
            <ArrowRight className="w-4 h-4 text-starehe-gold-accent" />
          </Link>

          <Link
            href="/about/administration"
            className="text-xs font-bold text-starehe-maroon-800 hover:underline"
          >
            School Administration &amp; Staff &rarr;
          </Link>
        </div>
      </div>
    </EditorialPageLayout>
  );
}
