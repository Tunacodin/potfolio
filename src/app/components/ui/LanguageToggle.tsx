import { motion } from "motion/react";
import { useLang } from "../../i18n/context";
import type { Lang } from "../../i18n/dictionary";

type Variant = "light" | "dark";

export function LanguageToggle({ variant = "light" }: { variant?: Variant }) {
  const { lang, setLang } = useLang();
  const langs: Lang[] = ["en", "tr"];

  const isDark = variant === "dark";
  const bg = isDark ? "rgba(255,255,255,0.06)" : "var(--card-soft)";
  const border = isDark ? "rgba(255,255,255,0.12)" : "var(--line-strong)";
  const activeBg = isDark ? "var(--paper)" : "var(--ink)";
  const activeText = isDark ? "var(--ink)" : "var(--paper)";
  const inactiveText = isDark ? "rgba(250,250,247,0.55)" : "var(--ink-3)";

  return (
    <div
      className="relative inline-flex items-center p-0.5 rounded-full"
      style={{ background: bg, border: `1px solid ${border}` }}
      role="group"
      aria-label="Language"
    >
      {langs.map((l) => {
        const active = l === lang;
        return (
          <button
            key={l}
            type="button"
            onClick={() => setLang(l)}
            aria-pressed={active}
            className="relative px-2.5 py-1 font-mono text-[10px] tracking-widest uppercase font-semibold rounded-full"
            style={{
              color: active ? activeText : inactiveText,
              minWidth: 28,
              zIndex: 1,
            }}
          >
            {active && (
              <motion.span
                layoutId="lang-pill"
                className="absolute inset-0 rounded-full"
                style={{ background: activeBg, zIndex: -1 }}
                transition={{ type: "spring", stiffness: 320, damping: 26 }}
              />
            )}
            {l.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}
