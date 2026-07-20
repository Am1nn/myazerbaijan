import { places } from "../data/places";

export default function sitemap() {
  const host = process.env.NEXT_PUBLIC_SITE_URL
    || process.env.VERCEL_PROJECT_PRODUCTION_URL
    || process.env.VERCEL_URL
    || "http://localhost:3000";
  const baseUrl = host.startsWith("http") ? host : `https://${host}`;
  const now = new Date();

  const pages = ["", "/places", "/about", "/contact"].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/places" ? 0.9 : 0.6,
  }));

  return [
    ...pages,
    ...places.map((place) => ({
      url: `${baseUrl}/places/${place.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    })),
  ];
}
