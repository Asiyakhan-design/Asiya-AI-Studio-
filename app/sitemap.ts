import { MetadataRoute } from "next";
import { services, legalPages } from "@/lib/data";

const BASE_URL = "https://asiya-ai-studio.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/services",
    "/pricing",
    "/how-it-works",
    "/portfolio",
    "/about",
    "/faq",
    "/contact",
    "/order",
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const serviceRoutes = services.map((s) => ({
    url: `${BASE_URL}/services/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const legalRoutes = legalPages.map((p) => ({
    url: `${BASE_URL}/legal/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "yearly" as const,
    priority: 0.3,
  }));

  return [...staticRoutes, ...serviceRoutes, ...legalRoutes];
}
