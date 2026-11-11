import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Building, BookOpen, FlaskConical, HeartPulse, Laptop, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Campus Facilities & Environment | 55-Acre Sanctuary",
  description:
    "Tour the 55-acre tranquil campus of Starehe Girls' Centre in Njathaini, Nairobi: modern dormitories, science laboratories, computer labs, library, and sports grounds.",
};

export default function FacilitiesPage() {
  const facilityItems = [
    {
      title: "55-Acre Sanctuary & Botanical Grounds",
      image: "/images/facilities/facilities-aerial-campus.jpg",
      description:
        "Located 18 km north of Nairobi CBD off Kiambu Road in Bustani Estate, Njathaini. A peaceful sanctuary featuring indigenous trees, clean air, quiet reading gardens, and space for contemplation.",
    },
    {
      title: "Main Administration Block",
      image: "/images/facilities/facilities-admin-block.jpg",
      description:
        "The institutional command center housing the Director's Office, Principal's Suite, staff boardrooms, admissions registry, and the bursary.",
    },
    {
      title: "Academic Wings & Classrooms",
      image: "/images/facilities/campus-building-front.jpg",
      description:
        "Bright, airy, well-ventilated classrooms equipped with modern whiteboards, high-density desks, and specialized subject rooms for elective studies.",
    },
    {
      title: "The Griffin Dormitory & Boarding Halls",
      image: "/images/hero/hero-students-assembly.jpg",
      description:
        "Built through Dr. Geoffrey Griffin's Kshs 20 million donation from donors. Provides safe, hygienic, and supervised boarding quarters with warm showers and dedicated house mistresses.",
    },
  ];

  return (
    <div>
      <Breadcrumb
        items={[
          { label: "Student Life", href: "/student-life" },
          { label: "Campus Facilities" },
        ]}
      />

      {/* Hero */}
      <section className="py-16 sm:py-20 bg-starehe-blue-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-starehe-gold-accent/20 text-starehe-gold-300 border border-starehe-gold-accent/30 mb-4">
              Infrastructure &amp; Setting
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              Campus Facilities &amp; Environment
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-200 leading-relaxed font-light">
              Nestled across 55 acres of picturesque grounds in Njathaini, Kasarani,
              our campus combines historic colonial heritage with modern educational
              amenities built to nurture young women.
            </p>
          </div>
        </div>
      </section>

      {/* Facilities Showcase */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Living &amp; Learning"
            title="World-Class Educational Amenities"
            description="Every structure on our campus has been constructed through generous donor partnerships and continuous reinvestment."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {facilityItems.map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-subtle hover:shadow-elevation transition-all flex flex-col group"
              >
                <div className="relative h-64 w-full bg-slate-100 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="p-7">
                  <h3 className="font-serif text-xl font-bold text-starehe-blue-950 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Capital Project Callout */}
          <div className="mt-16 bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-subtle flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl">
              <span className="text-xs uppercase font-bold tracking-wider text-starehe-maroon-800">
                Future Expansion
              </span>
              <h3 className="font-serif text-2xl font-bold text-starehe-blue-950 mt-1">
                Help Us Build New Science Labs &amp; Multipurpose Auditorium
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                As our student population continues to expand towards 1,000 scholars,
                we are raising funds for twin science laboratories (Biology &amp; Chemistry),
                a 1,200-seat multipurpose auditorium, and a 160-bed dormitory block.
              </p>
            </div>

            <Link
              href="/giving/projects"
              className="flex-shrink-0 px-8 py-3.5 rounded-full bg-starehe-maroon-800 hover:bg-starehe-maroon-700 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
            >
              View Capital Projects Campaign
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
