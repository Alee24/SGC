import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { HISTORY_TIMELINE } from "@/data/school-data";
import { BookOpen, Calendar, Award, Heart, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "School History & Heritage | Dr. Geoffrey Griffin Legacy",
  description:
    "The story of Starehe Girls' Centre from Dr. Geoffrey William Griffin's 1990s vision, the 55-acre bequest from Duncan & Jane Gray, to the 2005 opening with First Lady Mama Lucy Kibaki.",
};

export default function HistoryPage() {
  return (
    <div>
      <Breadcrumb
        items={[
          { label: "About Us", href: "/about" },
          { label: "History & Heritage" },
        ]}
      />

      {/* Hero */}
      <section className="py-16 sm:py-20 bg-starehe-blue-950 text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-starehe-gold-accent/20 text-starehe-gold-300 border border-starehe-gold-accent/30 mb-4">
              Archival Heritage
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              The Story of Starehe Girls&apos; Centre
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-200 leading-relaxed font-light">
              From an enduring vision conceived in the 1990s to an acclaimed national
              centre of excellence nurturing over 800 young women in Nairobi, Kenya.
            </p>
          </div>
        </div>
      </section>

      {/* Main Narrative Article */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-6">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-starehe-blue-950 not-prose mb-6">
              Conception and Foundational Vision
            </h2>

            <p className="text-base sm:text-lg leading-relaxed">
              The journey of starting a girls&apos; school to complement the celebrated
              Starehe Boys&apos; Centre started in the 1990s with several efforts put forth
              by the Co-Founder and Director of Starehe Boys&apos; Centre, the late{" "}
              <strong>Dr. Geoffrey William Griffin</strong>. As Dr. Griffin focused on helping
              boys, he also personally sponsored a few girls—some of whom were sisters of boys
              at Starehe Boys&apos; Centre—in secondary schools across the country.
            </p>

            <p className="text-base leading-relaxed">
              These efforts began to bear substantial fruit in 2003 when Dr. Geoffrey Griffin
              encouraged a group of prominent women educationalists under the leadership of
              renowned educator, <strong>Prof. Eddah Gachukia</strong>, to make the dream of
              Starehe Girls&apos; Centre a reality in his lifetime. The Starehe Girls&apos; Centre
              Trust was officially registered in 2003 with the following registered trustees:
            </p>

            {/* Registered Trustees Grid */}
            <div className="not-prose my-6 p-6 rounded-xl bg-slate-50 border border-slate-200">
              <h3 className="font-serif text-sm font-bold text-starehe-blue-950 uppercase tracking-wider mb-3">
                First Registered Trustees (2003)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-700">
                <div className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-starehe-maroon-700" />
                  <span><strong>Dr. Manu Chandaria</strong> (1st Board Chairman)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-starehe-maroon-700" />
                  <span><strong>Dr. Geoffrey William Griffin</strong></span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-starehe-maroon-700" />
                  <span><strong>Prof. Eddah Gachukia</strong></span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-starehe-maroon-700" />
                  <span><strong>Ms. Raychelle Omamo</strong></span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-starehe-maroon-700" />
                  <span><strong>Prof. Wanjiku Kabira</strong></span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-starehe-maroon-700" />
                  <span><strong>Mrs. Eunice Mathu</strong></span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-starehe-maroon-700" />
                  <span><strong>Mrs. Margery Kabuya</strong></span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-starehe-maroon-700" />
                  <span><strong>Mrs. Lucy Gitonga</strong></span>
                </div>
              </div>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-starehe-blue-950 not-prose mt-10 mb-6">
              The 55-Acre Sanctuary at Njathaini
            </h2>

            <p className="text-base leading-relaxed">
              The Centre&apos;s campus is set on 55 acres of land in Njathaini, a serene setting
              in Roysambu Constituency, 18 kilometres north of Nairobi and five kilometres off
              Kiambu Road. This property had originally been bequeathed to the Limuru Girls&apos;
              Centre by a farming couple, <strong>Mr. Duncan Gray and Mrs. Jane Auld Gray</strong>,
              for the express purpose of furthering girls&apos; education.
            </p>

            <p className="text-base leading-relaxed">
              Limuru Girls&apos; Centre ceased operations in 2002 following 20 years of successful
              training of young women in garment making, beekeeping, farming activities, and other
              life skills. The Trustees of Limuru Girls&apos; Centre included Dr. Manu Chandaria,
              Mr. Eliud Njoroge, Mr. Jeffrey Robin Mein, Dr. Eddah Gachukia, and Mrs. Lucy Gitonga.
              Following extensive deliberations, the Trustees headed by Dr. Manu Chandaria agreed
              to transfer the prime 55-acre parcel to Starehe Girls&apos; Centre since its mission was
              to carry on the sacred mandate of girl-child empowerment.
            </p>

            <div className="not-prose my-8 relative rounded-2xl overflow-hidden shadow-elevation border border-slate-200 aspect-[16/9]">
              <Image
                src="/images/facilities/facilities-admin-block.jpg"
                alt="Starehe Girls' Centre Central Campus and Administration"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 800px"
              />
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-starehe-blue-950 not-prose mt-10 mb-6">
              Dr. Griffin&apos;s Donation &amp; Pioneer Intake (2005)
            </h2>

            <p className="text-base leading-relaxed">
              Over the years, Dr. Geoffrey Griffin had accumulated a total of{" "}
              <strong>Kshs. 20 million from generous donors</strong> specifically earmarked for
              girls&apos; education. He donated this entire sum to Starehe Girls&apos; Centre,
              which funded the construction of the iconic Griffin Dormitory Block. This complemented
              the humble beginning of three small dormitories, four classrooms, staff quarters, and
              a farmhouse inherited from Limuru Girls&apos; Centre.
            </p>

            <p className="text-base leading-relaxed">
              In <strong>January 2005</strong>, 72 young pioneer students from economically
              disadvantaged backgrounds arrived from districts across Kenya to begin their secondary
              education. On <strong>12th February 2005</strong>, a ceremonial welcoming party dubbed{" "}
              <em>itega</em> was held to officially welcome the first 72 girls.
            </p>

            <div className="not-prose my-6 p-6 rounded-xl bg-starehe-maroon-50 border-l-4 border-starehe-maroon-800 text-slate-800">
              <div className="font-serif italic text-base sm:text-lg leading-relaxed">
                &ldquo;This inaugural ceremony was graced by the First Lady Mama Lucy Kibaki,
                who was the Guest of Honour. The historic function was attended by the late
                Dr. Geoffrey William Griffin, who expressed profound joy and fulfillment at seeing
                his lifelong dream of starting the girls&apos; school become a reality. Dr. Griffin
                sadly passed away soon after that momentous event.&rdquo;
              </div>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-starehe-blue-950 not-prose mt-10 mb-6">
              Stewardship &amp; Two Decades of Growth
            </h2>

            <p className="text-base leading-relaxed">
              The founding Trustees worked closely with the second Director of the school,{" "}
              <strong>Mrs. Margaret Wanjohi</strong>, an experienced school administrator whose
              wisdom guided the school&apos;s early consolidation. Today, under the leadership of{" "}
              <strong>Sister Jane Soita (Director)</strong> and <strong>Mrs. Beatrice Shirao (Principal)</strong>,
              alongside the Board of Trustees chaired by <strong>Mrs. Eunice Mathu</strong> and
              the Board of Management chaired by <strong>Prof. Mary Getui</strong>, the school
              stands proud with over 800 enrolled students and a 95% university progression rate.
            </p>
          </div>

          <div className="mt-12 pt-8 border-t border-slate-200 flex flex-wrap gap-4 justify-between items-center">
            <Link
              href="/about/trustees"
              className="px-6 py-3 rounded-full bg-starehe-blue-900 text-white font-semibold text-xs uppercase tracking-wider hover:bg-starehe-blue-800 transition-colors"
            >
              Meet the Board of Trustees
            </Link>
            <Link
              href="/about/administration"
              className="text-xs font-bold text-starehe-maroon-800 hover:underline"
            >
              School Administration &rarr;
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
