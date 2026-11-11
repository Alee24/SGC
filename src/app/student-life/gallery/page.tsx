"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

interface GalleryImage {
  src: string;
  title: string;
  category: "Campus" | "Leadership" | "Assembly" | "Heritage";
  caption: string;
}

const GALLERY_IMAGES: GalleryImage[] = [
  {
    src: "/images/hero/hero-students-assembly.jpg",
    title: "School Student Assembly",
    category: "Assembly",
    caption: "The student body gathered in full uniform for morning flag ceremony on the central campus quadrangle.",
  },
  {
    src: "/images/facilities/facilities-admin-block.jpg",
    title: "Main Administration Block & Quadrangle",
    category: "Campus",
    caption: "The iconic central administration building with manicured colonial lawns in Njathaini.",
  },
  {
    src: "/images/facilities/facilities-aerial-campus.jpg",
    title: "55-Acre Sanctuary Aerial View",
    category: "Campus",
    caption: "Panoramic aerial landscape of the expansive 55-acre Starehe campus showing dormitories, pitches, and gardens.",
  },
  {
    src: "/images/facilities/campus-building-front.jpg",
    title: "Academic Courtyard & Classrooms",
    category: "Campus",
    caption: "Well-ventilated academic classrooms and tuition block where daily instructional learning takes place.",
  },
  {
    src: "/images/leadership/director-sister-jane-soita-office.jpg",
    title: "Director Sister Jane Soita in Office",
    category: "Leadership",
    caption: "Sister Jane Soita, Director of Starehe Girls' Centre, coordinating institutional affairs and student welfare.",
  },
  {
    src: "/images/leadership/director-sister-jane-soita.jpg",
    title: "Sister Jane Soita Official Portrait",
    category: "Leadership",
    caption: "Executive Director portrait reflecting servant leadership and dedication to the girl-child.",
  },
  {
    src: "/images/leadership/trustee-eunice-mathu.jpg",
    title: "Mrs. Eunice Mathu — Board Chairperson",
    category: "Leadership",
    caption: "Founding trustee and Chairperson of the Board of Trustees, championing governance since 2003.",
  },
  {
    src: "/images/leadership/trustee-manu-chandaria.jpg",
    title: "Dr. Manu Chandaria — Founding Chairman",
    category: "Heritage",
    caption: "Eminent philanthropist and industrialist who facilitated the land transfer of Limuru Girls' Centre to Starehe.",
  },
  {
    src: "/images/leadership/bom-mary-getui.png",
    title: "Prof. Mary Getui — BOM Chairperson",
    category: "Leadership",
    caption: "Chairperson of the Board of Management stewarding faculty excellence and student development.",
  },
  {
    src: "/images/brand/logo.png",
    title: "Official Starehe Girls' Centre Crest",
    category: "Heritage",
    caption: "Official institutional crest featuring the motto 'Elimu Yetu, Nguvu Yetu' (Our Education, Our Strength).",
  },
];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = ["All", "Campus", "Assembly", "Leadership", "Heritage"];

  const filteredImages =
    selectedCategory === "All"
      ? GALLERY_IMAGES
      : GALLERY_IMAGES.filter((img) => img.category === selectedCategory);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredImages.length);
    }
  };

  const prevImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex(
        (lightboxIndex - 1 + filteredImages.length) % filteredImages.length
      );
    }
  };

  return (
    <div>
      <Breadcrumb
        items={[
          { label: "Student Life", href: "/student-life" },
          { label: "Photo Gallery" },
        ]}
      />

      {/* Hero */}
      <section className="relative py-14 sm:py-18 bg-starehe-blue-950 text-white overflow-hidden border-b-4 border-starehe-maroon-800">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 pointer-events-none hidden lg:block">
          <Image
            src="/images/brand/logo.png"
            alt="Starehe Crest Watermark"
            fill
            className="object-contain object-right"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-starehe-blue-950 via-starehe-blue-950/95 to-starehe-blue-900/70" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-starehe-gold-accent/20 text-starehe-gold-300 border border-starehe-gold-accent/30 mb-4">
              Visual Archives
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              Campus Photo Gallery
            </h1>
            <p className="mt-3 text-sm sm:text-base text-slate-200 leading-relaxed font-light">
              Explore authentic glimpses into life at Starehe Girls&apos; Centre:
              from daily morning assemblies to academic wings, serene botanical grounds,
              and our distinguished leadership team.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                  selectedCategory === cat
                    ? "bg-starehe-blue-900 text-white shadow-sm"
                    : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Images Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredImages.map((img, idx) => (
              <div
                key={img.src}
                onClick={() => openLightbox(idx)}
                className="group relative bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-subtle hover:shadow-elevation transition-all cursor-pointer flex flex-col"
              >
                <div className="relative h-64 w-full bg-slate-100 overflow-hidden">
                  <Image
                    src={img.src}
                    alt={img.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-starehe-blue-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="p-3 rounded-full bg-white/90 text-starehe-blue-950 shadow-md">
                      <Maximize2 className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-starehe-maroon-800 bg-starehe-maroon-50 px-2 py-0.5 rounded">
                      {img.category}
                    </span>
                    <h3 className="font-serif text-lg font-bold text-starehe-blue-950 mt-2">
                      {img.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                      {img.caption}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Accessible Modal Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Close image lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Prev button */}
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next button */}
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Main Image in Lightbox */}
          <div className="max-w-4xl max-h-[85vh] flex flex-col items-center">
            <div className="relative w-[85vw] max-w-4xl h-[60vh] max-h-[600px]">
              <Image
                src={filteredImages[lightboxIndex].src}
                alt={filteredImages[lightboxIndex].title}
                fill
                className="object-contain"
                sizes="(max-width: 1200px) 90vw, 1000px"
              />
            </div>
            <div className="mt-4 text-center text-white max-w-xl">
              <h3 className="font-serif text-lg sm:text-xl font-bold">
                {filteredImages[lightboxIndex].title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                {filteredImages[lightboxIndex].caption}
              </p>
              <div className="text-[11px] text-starehe-gold-300 mt-2 font-mono">
                {lightboxIndex + 1} of {filteredImages.length}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
