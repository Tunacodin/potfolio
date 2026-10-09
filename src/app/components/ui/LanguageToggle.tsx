import { motion } from "motion/react";
import { useLang } from "../../i18n/context";
import type { Lang } from "../../i18n/dictionary";

export function LanguageToggle() {
  const { lang, setLang } = useLang();
  const langs: Lang[] = ["tr", "en"];

  return (
    <div
      className="relative inline-flex items-center rounded-full border border-line-strong p-[3px]"
      role="group"
      aria-label="Dil / Language"
    >
      {langs.map((l) => {
        const active = l === lang;
        return (
          <button
            key={l}
            type="button"
            onClick={() => setLang(l)}
            aria-pressed={active}
            className="relative z-[1] h-8 min-w-10 rounded-full px-2.5 text-[13px] font-semibold transition-colors duration-300"
            style={{ color: active ? "var(--paper)" : "var(--ink)" }}
          >
            {active && (
              <motion.span
                layoutId="lang-pill"
                className="absolute inset-0 -z-[1] rounded-full bg-ink"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            {l.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}
