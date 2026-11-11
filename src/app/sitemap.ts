import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://starehegirlscentre.sc.ke";

  const routes = [
    "",
    "/about",
    "/about/history",
    "/about/trustees",
    "/about/management",
    "/about/administration",
    "/academics",
    "/academics/performance",
    "/academics/curriculum",
    "/academics/departments",
    "/academics/kuccps",
    "/admissions",
    "/admissions/form-one",
    "/admissions/senior-school",
    "/admissions/fees-aid",
    "/student-life",
    "/student-life/clubs",
    "/student-life/sports",
    "/student-life/facilities",
    "/student-life/gallery",
    "/giving",
    "/giving/projects",
    "/giving/events",
    "/careers-tenders",
    "/news",
    "/contact",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" || route === "/news" ? "daily" : "monthly",
    priority: route === "" ? 1.0 : route.startsWith("/admissions") ? 0.9 : 0.8,
  }));
}
