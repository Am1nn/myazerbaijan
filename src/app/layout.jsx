import "../styles/global.css";
import Providers from "./providers";

export const metadata = {
  title: "MyAzerbaijan",
  description: "Azərbaycanın rəqəmsal səyahət atlası",
  icons: { icon: "/favicon-512.png", apple: "/favicon-512.png" },
};

export default function RootLayout({ children }) {
  return <html lang="az" suppressHydrationWarning><body><Providers>{children}</Providers></body></html>;
}

