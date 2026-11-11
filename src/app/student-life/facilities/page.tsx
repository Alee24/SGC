import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { EditorialPageLayout } from "@/components/layout/EditorialPageLayout";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Campus Facilities & Environment | 55-Acre Sanctuary",
  description:
    "Tour the 55-acre tranquil campus of Starehe Girls' Centre in Njathaini, Nairobi: modern dormitories, science laboratories, computer labs, library, and sports grounds.",
};

const STUDENT_LIFE_SIDEBAR_LINKS = [
  { label: "Student Life Overview", href: "/student-life" },
  { label: "Clubs & Societies", href: "/student-life/clubs" },
  { label: "Sports & Athletics", href: "/student-life/sports" },
  { label: "Campus Facilities", href: "/student-life/facilities", active: true },
  { label: "Photo & Campus Gallery", href: "/student-life/gallery" },
];

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
    <EditorialPageLayout
      breadcrumbs={[
        { label: "Student Life", href: "/student-life" },
        { label: "Campus Facilities" },
      ]}
      kicker="Infrastructure & Sanctuary"
      title="Campus Facilities & Environment"
      description="Nestled across 55 picturesque acres in Njathaini, Kasarani, our campus combines tranquil serenity with modern educational amenities purpose-built to nurture young women leaders."
      heroFacts={[
        { label: "Campus Size", value: "55 Acres in Kasarani" },
        { label: "Distance", value: "18 km from Nairobi CBD" },
        { label: "Residential", value: "Supervised Dormitories" },
        { label: "Security", value: "24/7 Gated Perimeter" },
      ]}
      sidebarTitle="Student Life"
      sidebarLinks={STUDENT_LIFE_SIDEBAR_LINKS}
    >
      <div className="space-y-10">
        <div>
          <SectionHeading
            badge="Living &amp; Learning"
            title="World-Class Educational Amenities"
            description="Every structure on our campus has been constructed through generous donor partnerships and continuous reinvestment."
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {facilityItems.map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-subtle hover:border-starehe-blue-300 transition-all flex flex-col group"
            >
              <div className="relative h-48 sm:h-52 w-full bg-slate-100 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-base font-bold text-starehe-blue-950 mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Capital Project Callout */}
        <section className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1 max-w-xl">
            <span className="text-[10px] font-bold uppercase tracking-wider text-starehe-maroon-800 bg-starehe-maroon-50 px-2.5 py-0.5 rounded-full inline-block mb-1">
              Campus Master Plan
            </span>
            <h3 className="font-serif text-lg font-bold text-starehe-blue-950">
              Expanding Science Labs &amp; Multipurpose Auditorium
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We are actively mobilizing partners for twin science laboratories (Biology &amp; Chemistry),
              a 1,200-seat multipurpose auditorium, and an additional 160-bed dormitory wing.
            </p>
          </div>

          <Link
            href="/giving/projects"
            className="flex-shrink-0 px-5 py-2.5 rounded-full bg-starehe-maroon-800 hover:bg-starehe-maroon-700 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm inline-flex items-center space-x-1.5"
          >
            <span>View Capital Projects</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </section>
      </div>
    </EditorialPageLayout>
  );
}
