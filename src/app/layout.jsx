import "../styles/global.css";
import Providers from "./providers";

const productionHost = process.env.NEXT_PUBLIC_SITE_URL
  || process.env.VERCEL_PROJECT_PRODUCTION_URL
  || process.env.VERCEL_URL;
const siteUrl = productionHost
  ? productionHost.startsWith("http") ? productionHost : `https://${productionHost}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "MyAzerbaijan — Azərbaycanın rəqəmsal səyahət atlası",
    template: "%s | MyAzerbaijan",
  },
  description: "Azərbaycanın tarixi məkanlarını, qədim abidələrini və mədəni irsini interaktiv xəritədə kəşf edin, səyahət marşrutunuzu planlaşdırın.",
  applicationName: "MyAzerbaijan",
  keywords: [
    "Azərbaycan", "Azərbaycan turizmi", "Bakı", "tarixi məkanlar",
    "Azərbaycan abidələri", "İçərişəhər", "səyahət xəritəsi",
    "mədəni irs", "turizm marşrutu", "MyAzerbaijan",
  ],
  authors: [{ name: "MyAzerbaijan" }],
  creator: "MyAzerbaijan",
  publisher: "MyAzerbaijan",
  category: "səyahət və turizm",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "az_AZ",
    url: "/",
    siteName: "MyAzerbaijan",
    title: "MyAzerbaijan — Azərbaycanın rəqəmsal səyahət atlası",
    description: "Azərbaycanın tarixi məkanlarını və mədəni irsini interaktiv xəritədə kəşf edin.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "MyAzerbaijan — Azərbaycanın tarixi irsi" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "MyAzerbaijan — Azərbaycanın rəqəmsal səyahət atlası",
    description: "Azərbaycanın tarixi məkanlarını və mədəni irsini interaktiv xəritədə kəşf edin.",
    images: ["/opengraph-image"],
  },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon-512.png", apple: "/favicon-512.png" },
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({ children }) {
  return <html lang="az" suppressHydrationWarning><body><Providers>{children}</Providers></body></html>;
}
