"use client";

import { useLayoutEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import OpeningLoader from "../components/Loader/OpeningLoader";
import { PreferencesProvider } from "../context/PreferencesContext";

export default function Providers({ children }) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useLayoutEffect(() => {
    const loaderSeen = window.sessionStorage.getItem("myazerbaijan-opening-seen");
    if (pathname !== "/" || loaderSeen) {
      window.sessionStorage.setItem("myazerbaijan-opening-seen", "1");
      return undefined;
    }

    window.sessionStorage.setItem("myazerbaijan-opening-seen", "1");
    // Show only after confirming this is the first visit to the home page.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);
    const timer = window.setTimeout(() => setLoading(false), 2100);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  return <PreferencesProvider><AnimatePresence>{loading && <OpeningLoader />}</AnimatePresence>{children}</PreferencesProvider>;
}
