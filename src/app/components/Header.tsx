import { useEffect, useState } from "react";
import { Download } from "lucide-react";
import { useLang } from "../i18n/context";
import { onAnchor } from "../lib/scroll";
import { cvPath } from "../lib/cv";
import { LanguageToggle } from "./ui/LanguageToggle";
import { Roll } from "./ui/Roll";

export function Header() {
  const { t, pick, lang } = useLang();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { id: "work", label: pick(t.nav.work) },
    { id: "experience", label: pick(t.nav.experience) },
    { id: "contact", label: pick(t.nav.contact) },
  ];

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 bg-paper transition-[border-color] duration-500"
      style={{ height: "var(--header-h)", borderBottom: `1px solid ${scrolled ? "var(--line)" : "transparent"}` }}
    >
      <div className="flex h-full items-center justify-between gap-4 px-[var(--gutter)]">
        <a
          href="#top"
          onClick={onAnchor}
          className="roll-host whitespace-nowrap text-[17px] font-semibold tracking-[-0.03em]"
        >
          <Roll text={pick(t.hero.name)} />
        </a>

        <nav className="hidden items-center gap-10 md:flex" aria-label={lang === "tr" ? "Ana menü" : "Main menu"}>
          {links.map((l) => (
            <a key={l.id} href={`#${l.id}`} onClick={onAnchor} className="roll-host text-[15px] font-medium">
              <Roll text={l.label} />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <LanguageToggle />
          <a href={cvPath(lang)} download className="btn btn-ink btn-sm group hidden sm:inline-flex">
            <Roll text={pick(t.nav.cv)} />
            <Download className="size-3.5" strokeWidth={2.5} />
          </a>
        </div>
      </div>
    </header>
  );
}
