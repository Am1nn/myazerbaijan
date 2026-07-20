export default function robots() {
  const host = process.env.NEXT_PUBLIC_SITE_URL
    || process.env.VERCEL_PROJECT_PRODUCTION_URL
    || process.env.VERCEL_URL
    || "http://localhost:3000";
  const baseUrl = host.startsWith("http") ? host : `https://${host}`;

  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
