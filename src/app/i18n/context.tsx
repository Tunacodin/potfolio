import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { dictionary, DEFAULT_LANG } from "./dictionary";
import type { Lang, Localized } from "./dictionary";

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
  /** Read from dictionary tree by passing a Localized node. */
  t: typeof dictionary;
  /** Pick the value for the active language from any Localized. */
  pick: <T,>(loc: Localized<T> | T) => T;
};

const LanguageContext = createContext<Ctx | null>(null);

const STORAGE_KEY = "lang";

function detectLang(): Lang {
  if (typeof window === "undefined") return DEFAULT_LANG;
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "en" || stored === "tr") return stored;
  const nav = window.navigator?.language?.toLowerCase() ?? "";
  return nav.startsWith("tr") ? "tr" : "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(DEFAULT_LANG);

  useEffect(() => {
    setLangState(detectLang());
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, lang);
      document.documentElement.setAttribute("lang", lang);
    }
  }, [lang]);

  const value = useMemo<Ctx>(() => {
    const isLocalized = (v: unknown): v is Localized<unknown> => {
      return (
        typeof v === "object" &&
        v !== null &&
        "en" in (v as Record<string, unknown>) &&
        "tr" in (v as Record<string, unknown>)
      );
    };
    return {
      lang,
      setLang: setLangState,
      toggle: () => setLangState((l) => (l === "tr" ? "en" : "tr")),
      t: dictionary,
      pick: ((loc: any) => (isLocalized(loc) ? (loc as any)[lang] : loc)) as Ctx["pick"],
    };
  }, [lang]);

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used inside <LanguageProvider>");
  return ctx;
}
