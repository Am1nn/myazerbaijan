"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import OpeningLoader from "../components/Loader/OpeningLoader";
import { PreferencesProvider } from "../context/PreferencesContext";

export default function Providers({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 2100);
    return () => window.clearTimeout(timer);
  }, []);

  return <PreferencesProvider><AnimatePresence>{loading && <OpeningLoader />}</AnimatePresence>{children}</PreferencesProvider>;
}

