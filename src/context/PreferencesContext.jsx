"use client";

import { useEffect, useMemo, useSyncExternalStore } from "react";
import { PreferencesContext } from "./preferencesStore";

const STORAGE_KEYS = {
  language: "myazerbaijan-language",
  theme: "myazerbaijan-theme",
};

const supportedLanguages = ["az", "tr", "en", "ru"];

function createPreferenceStore(key, allowedValues, fallback) {
  const listeners = new Set();

  const getSnapshot = () => {
    if (typeof window === "undefined") return fallback;
    try {
      const storedValue = window.localStorage.getItem(key);
      return allowedValues.includes(storedValue) ? storedValue : fallback;
    } catch {
      return fallback;
    }
  };

  const subscribe = (listener) => {
    const handleStorage = (event) => {
      if (event.key === key) listener();
    };
    listeners.add(listener);
    window.addEventListener("storage", handleStorage);
    return () => {
      listeners.delete(listener);
      window.removeEventListener("storage", handleStorage);
    };
  };

  const set = (value) => {
    if (!allowedValues.includes(value)) return;
    try {
      window.localStorage.setItem(key, value);
    } catch {
      // Preferences still work for the current page when storage is blocked.
    }
    listeners.forEach((listener) => listener());
  };

  return { getSnapshot, getServerSnapshot: () => fallback, subscribe, set };
}

const languageStore = createPreferenceStore(
  STORAGE_KEYS.language,
  supportedLanguages,
  "az"
);
const themeStore = createPreferenceStore(
  STORAGE_KEYS.theme,
  ["light", "dark"],
  "light"
);

export function PreferencesProvider({ children }) {
  const lang = useSyncExternalStore(
    languageStore.subscribe,
    languageStore.getSnapshot,
    languageStore.getServerSnapshot
  );
  const theme = useSyncExternalStore(
    themeStore.subscribe,
    themeStore.getSnapshot,
    themeStore.getServerSnapshot
  );

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  const value = useMemo(
    () => ({ lang, setLang: languageStore.set, theme, setTheme: themeStore.set }),
    [lang, theme]
  );

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>;
}
