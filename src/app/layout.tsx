import type { Metadata } from "next";
import "./globals.css";
import { TopBar } from "@/components/layout/TopBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://starehegirlscentre.sc.ke"),
  title: {
    default: "Starehe Girls' Centre | Charitable Educational Institution",
    template: "%s | Starehe Girls' Centre",
  },
  description:
    "Starehe Girls' Centre is a premier charitable national high school nurturing academically bright but economically disadvantaged young women from all 47 counties of Kenya. Located on a serene 55-acre campus in Njathaini, Nairobi.",
  keywords: [
    "Starehe Girls Centre",
    "Starehe Girls High School",
    "National Girls School Kenya",
    "Charitable High School Nairobi",
    "Form 1 Blue Form Admissions",
    "KCSE Top Girls School Kenya",
    "Sister Jane Soita",
    "Dr Geoffrey Griffin",
    "Dr Manu Chandaria",
    "Elimu Yetu Nguvu Yetu",
    "Senior School CBC Kenya",
  ],
  authors: [{ name: "Starehe Girls' Centre" }],
  creator: "Starehe Girls' Centre Trust",
  publisher: "Starehe Girls' Centre",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: "https://starehegirlscentre.sc.ke",
    siteName: "Starehe Girls' Centre",
    title: "Starehe Girls' Centre | Premier National High School & Charitable Trust",
    description:
      "Nurturing academically gifted girls from disadvantaged backgrounds across Kenya. 95% university transition rate, 2025 KCSE 8.90 (B) mean score.",
    images: [
      {
        url: "/images/hero/hero-students-assembly.jpg",
        width: 1200,
        height: 630,
        alt: "Starehe Girls' Centre Student Assembly",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Starehe Girls' Centre",
    description: "Premier Charitable Educational Institution — Nairobi, Kenya",
    images: ["/images/hero/hero-students-assembly.jpg"],
  },
  icons: {
    icon: "/images/brand/logo-crest.png",
    shortcut: "/images/brand/logo-crest.png",
    apple: "/images/brand/logo-crest.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "Starehe Girls' Centre",
    alternateName: "Starehe Girls' High School",
    url: "https://starehegirlscentre.sc.ke",
    logo: "https://starehegirlscentre.sc.ke/images/brand/logo.png",
    slogan: "Elimu Yetu, Nguvu Yetu (Our Education, Our Strength)",
    foundingDate: "2005",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Bustani Estate, Njathaini, Off Kiambu Road",
      addressLocality: "Nairobi",
      addressRegion: "Nairobi County",
      postalCode: "00200",
      postOfficeBoxNumber: "P.O. Box 6847",
      addressCountry: "KE",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+254707900852",
      contactType: "admissions",
      email: "info@starehegirlscentre.co.ke",
      areaServed: "KE",
      availableLanguage: ["English", "Swahili"],
    },
    sameAs: [
      "https://facebook.com/starehegirlscentre",
      "https://twitter.com/starehegirls",
    ],
  };

  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                function isChunkError(err) {
                  if (!err) return false;
                  var str = (typeof err === 'string' ? err : (err.message || err.name || '')) + '';
                  str = str.toLowerCase();
                  return str.indexOf('chunk') !== -1 ||
                         str.indexOf('loading chunk') !== -1 ||
                         str.indexOf('chunkloaderror') !== -1 ||
                         str.indexOf('failed to fetch dynamically imported module') !== -1 ||
                         str.indexOf('minified react error #423') !== -1 ||
                         str.indexOf('minified react error #418') !== -1;
                }
                window.addEventListener('error', function(e) {
                  if (isChunkError(e.error) || isChunkError(e.message)) {
                    var k = 'starehe_chunk_reload_ts';
                    var last = sessionStorage.getItem(k);
                    var now = Date.now();
                    if (!last || now - parseInt(last, 10) > 8000) {
                      sessionStorage.setItem(k, now.toString());
                      window.location.reload();
                    }
                  }
                });
                window.addEventListener('unhandledrejection', function(e) {
                  if (isChunkError(e.reason)) {
                    var k = 'starehe_chunk_reload_ts';
                    var last = sessionStorage.getItem(k);
                    var now = Date.now();
                    if (!last || now - parseInt(last, 10) > 8000) {
                      sessionStorage.setItem(k, now.toString());
                      window.location.reload();
                    }
                  }
                });
              })();
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased selection:bg-starehe-maroon-800 selection:text-white">
        <TopBar />
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
